import { template } from '@babel/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FormFieldDropdown } from '../FormFieldComponents/FormFieldDropdown/FormFieldDropdown';
import { FormFieldInput } from '../FormFieldComponents/FormFieldInput/FormFieldInput';
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

export const CoinbaseTracker: React.FC<CoinbaseTrackerProps> = () => {
    const [availablePairs, setAvailablePairs] = useState<{ label: string, value: string }[] | null>(null);
    const [portfolioPairs, setPortfolioPairs] = useState<string[]>([]);
    const [portfolio, setPortfolio] = useState<IPortfolioItem[] | null>(null);
    const [initialValues, setInitialValues] = useState<ChangeMe>(INITIAL_VALUES);

    const ws: ChangeMe = useRef(null);
    let first = useRef(false);
    const tradingPairs = useFetch<TradingPair[]>(URL + '/products');

    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
        first.current = true;
    }, [])

    useEffect(() => {
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
            ws.current.send(jsonMsg);

            ws.current.onmessage = (e: any) => {
                let data = JSON.parse(e.data);
                if (data.type !== "ticker") {
                    return;
                }
                if (portfolio) {
                    const updatePortfolio = portfolio.map(item => {
                        if (item.assetPair === data.product_id) {
                            return { ...item, currentPrice: data.price, profitLoss: (data.price * item.totalCoins) - (item.costPerCoin * item.totalCoins), percentageProfitLoss: ((data.price * item.totalCoins) / (item.costPerCoin * item.totalCoins)) * 100 };
                        }
                        return item;
                    })
                    setPortfolio(updatePortfolio)
                }
                // if (data.product_id === pair) {
                //   setprice(data.price);
                // }
            };
        }
    }, [portfolioPairs])

    const handleAddToPortfolio = (e: IAddPortfolioItem) => {
        //check if portfolio isnt empty
        if (portfolio) {
            //check if already owns some of this
            const alreadyExists = portfolio.find(item => item.assetPair === e.assetPair);
            if (alreadyExists) {
                const updatePortfolio: any[] = portfolio.map(item => {
                    console.log(item.assetPair, e.assetPair)
                    if (item.assetPair === e.assetPair) {
                        return { ...item, costPerCoin: newCostPerCoin(item, e), totalCoins: item.totalCoins + e.totalCoins, currentPrice: 0, profitLoss: 0, percentageProfitLoss: 0 }
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

    useEffect(() => {
        console.log({ portfolio })
    }, [portfolio])

    if (tradingPairs.response) {
        return (
            <div className='Coinbase'>
                <div className='AddToPortfolio'>
                    <Formik onSubmit={handleAddToPortfolio} initialValues={initialValues}>
                        <Form>
                            <FormFieldDropdown options={tradingPairs.response.map((pair: TradingPair) => ({ value: pair.id, label: pair.id }))} name='assetPair' label='Asset pair' />
                            <FormFieldInput type='number' name='costPerCoin' label='Amount paid per coin' />
                            <FormFieldInput type='number' name='totalCoins' label='Total no. of coins' />
                            <button type='submit'>Add Purchase</button>
                        </Form>
                    </Formik>
                </div>
                <div className='Portfolio'>
                    <table>
                        <tr>
                            <th>assetPair</th>
                            <th>costPerCoin</th>
                            <th>totalCoins</th>
                            <th>currentPrice</th>
                            <th>profitLoss</th>
                            <th>percentageProfitLoss</th>
                        </tr>
                        {portfolio ?
                            portfolio.map(item => (
                                <tr className='PortfolioRow'>
                                    <td>{item.assetPair}</td>
                                    <td>{item.costPerCoin}</td>
                                    <td>{item.totalCoins}</td>
                                    <td>{item.currentPrice}</td>
                                    <td>{item.profitLoss}</td>
                                    <td>{item.percentageProfitLoss}</td>
                                </tr>
                            ))
                            : <div>Your portfolio is empty</div>
                        }
                    </table>
                </div>
            </div>
        )
    }

    return null;
}