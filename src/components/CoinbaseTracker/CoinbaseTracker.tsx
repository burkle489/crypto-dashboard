import { API } from 'aws-amplify';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { getPortfolioAsset, listPortfolioAssets } from '../../graphql/queries';
import { isPositiveNumber } from '../../helpers/isPositiveNumber';
import { useFetch } from '../../hooks/useFetch';
import { AddToPortfolio } from '../AddToPortfolio/AddToPortfolio';
import { FormFieldDropdown } from '../FormFieldComponents/FormFieldDropdown/FormFieldDropdown';
import { FormFieldInput } from '../FormFieldComponents/FormFieldInput/FormFieldInput';
import { addPortfolioAsset, getPortfolio } from './CoinbaseTrackerApi';
import { ChangeMe, CoinbaseTrackerProps, IAddPortfolioItem, IPortfolioItem, TradingPair } from './models';

const URL = 'https://api.pro.coinbase.com';

const INITIAL_VALUES: IAddPortfolioItem = {
    assetPair: '',
    costPerCoin: 0,
    totalCoins: 0,
};

// const addPortfolioItem = (initialItem: IAddPortfolioItem): IPortfolioItem => {
//     return { ...initialItem, averagePrice: 0, }
// }

const newCostPerCoin = (prev: IPortfolioItem, addition: IAddPortfolioItem) => {
    const newTotalCoins = prev.totalCoins + addition.totalCoins;
    return ((prev.costPerCoin * prev.totalCoins) + (addition.costPerCoin * addition.totalCoins)) / newTotalCoins;
}

const profitLoss = (actualPrice: number, portfolioPrice: number, noOfCoins: number) => {
    return (actualPrice * noOfCoins) - (portfolioPrice * noOfCoins);
}
const percentageProfitLoss = (actualPrice: number, portfolioPrice: number, noOfCoins: number) => {
    return (((actualPrice * noOfCoins) - (portfolioPrice * noOfCoins)) / (portfolioPrice * noOfCoins)) * 100;
}

export const CoinbaseTracker: React.FC<CoinbaseTrackerProps> = () => {
    // const [availablePairs, setAvailablePairs] = useState<{ label: string, value: string }[] | null>(null);
    const [portfolioPairs, setPortfolioPairs] = useState<string[]>([]);
    const [portfolio, setPortfolio] = useState<IPortfolioItem[] | null>(null);
    const [initialValues, setInitialValues] = useState<ChangeMe>(INITIAL_VALUES);
    const ws: ChangeMe = useRef(null);
    let first = useRef(false);
    const tradingPairs = useFetch<TradingPair[]>(URL + '/products');

    useEffect(() => {
        //connect websocket
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
        first.current = true;
    }, []);

    useEffect(() => {
        //fetch portfolio on mount and update state accordingly
        (async () => {
            const getP = await getPortfolio();
            setPortfolio(getP);
            setPortfolioPairs(getP.map((item: ChangeMe) => item.assetPair));
        })()
    }, []);

    useEffect(() => {
        //when portfolioPairs updates subscribe relevant tickers
        if (!first.current) {
            return;
        }
        if (portfolioPairs.length > 0) {
            let msg = {
                type: "subscribe",
                product_ids: [...portfolioPairs],
                channels: ["ticker"]
            };
            let jsonMsg = JSON.stringify(msg);
            ws.current.onopen = () => ws.current.send(jsonMsg);
            ws.current.onmessage = (e: ChangeMe) => {
                let data = JSON.parse(e.data);
                if (data.type !== "ticker") {
                    return;
                }
                if (portfolio) {
                    const updatePortfolio = portfolio.map(item => {
                        if (item.assetPair === data.product_id) {
                            return {
                                ...item,
                                currentPrice: data.price,
                                profitLoss: profitLoss(data.price, item.costPerCoin, item.totalCoins),
                                percentageProfitLoss: percentageProfitLoss(data.price, item.costPerCoin, item.totalCoins),
                            };
                        }
                        return item;
                    })

                    setPortfolio((prev) => ([...updatePortfolio]));
                }
            };
        }
    }, [portfolioPairs, portfolio]);

    const handleAddToPortfolio = (e: IAddPortfolioItem) => {
        (async () => {
            addPortfolioAsset(e)
        })()
        //check if portfolio isnt empty
        if (portfolio && portfolio.length > 0) {
            //check if already owns some of this
            const alreadyExists = portfolio.find(item => item.assetPair === e.assetPair);
            if (alreadyExists) {
                //crypto pair already exists in portfolio so update existing portfolio
                const updatePortfolio: ChangeMe[] = portfolio.map(item => {
                    console.log(item.assetPair, e.assetPair)
                    if (item.assetPair === e.assetPair) {
                        return { ...item, costPerCoin: newCostPerCoin(item, e), totalCoins: item.totalCoins + e.totalCoins }
                    }
                    return item;
                })
                setPortfolio(updatePortfolio)
            } else {
                //doesnt already exist so add to end of portfolio
                setPortfolio([...portfolio, { ...e, currentPrice: 0, profitLoss: 0, percentageProfitLoss: 0 }])
                setPortfolioPairs([...portfolioPairs, e.assetPair])
            }
        } else {
            //add first crypto to portfolio
            setPortfolio([{ ...e, currentPrice: 0, profitLoss: 0, percentageProfitLoss: 0 }])
            setPortfolioPairs([...portfolioPairs, e.assetPair])
        }
    }

    if (tradingPairs.response) {
        return (
            <div className='CoinbaseTracker'>
                <AddToPortfolio
                    handleSubmit={handleAddToPortfolio}
                    initialValues={initialValues}
                    options={tradingPairs.response.map((pair: TradingPair) => ({ value: pair.id, label: pair.id }))}
                />
                <div className='Portfolio'>
                    <table className='PortfolioTable'>
                        <thead>

                            <tr className='PortfolioRow'>
                                <th className='PortfolioHeader'>Asset</th>
                                <th className='PortfolioHeader'>Cost per coin</th>
                                <th className='PortfolioHeader'>Total</th>
                                <th className='PortfolioHeader'>Current price</th>
                                <th className='PortfolioHeader'>P/L</th>
                                <th className='PortfolioHeader'>% P/L</th>
                            </tr>
                        </thead>
                        <tbody>

                            {portfolio ?
                                portfolio.map((item, index) => (
                                    <tr className='PortfolioRow' key={`${item.assetPair} + ${index}`}>
                                        <td className='PortfolioCell'>{item.assetPair}</td>
                                        <td className='PortfolioCell'>${item.costPerCoin}</td>
                                        <td className='PortfolioCell'>{item.totalCoins}</td>
                                        <td className='PortfolioCell'>${item.currentPrice}</td>
                                        <td className={`PortfolioCell${isPositiveNumber(item.profitLoss) ? ' Positive' : ' Negative'}`}>${item?.profitLoss?.toFixed(2)}</td>
                                        <td className={`PortfolioCell${isPositiveNumber(item.profitLoss) ? ' Positive' : ' Negative'}`}>{item?.percentageProfitLoss?.toFixed(2)}%</td>
                                    </tr>
                                ))
                                : <div>Your portfolio is empty</div>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return null;
}