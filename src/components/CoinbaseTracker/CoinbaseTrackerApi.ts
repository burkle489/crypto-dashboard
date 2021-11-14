import API from '@aws-amplify/api'
import { createPortfolioAsset as createPortfolioAssetMutation } from '../../graphql/mutations'
import { listPortfolioAssets } from '../../graphql/queries'
import { IAddPortfolioItem } from './models'

export const getPortfolio = async () => {
    const apiData = await API.graphql({ query: listPortfolioAssets })
    return (apiData as any).data.listPortfolioAssets.items
}

export const addPortfolioAsset = async (formData: IAddPortfolioItem) => {
    const result = await API.graphql({
        query: createPortfolioAssetMutation,
        variables: { input: formData },
    })
}

// async function createNote() {
//         if (!formData.name || !formData.description) return;
//         await API.graphql({ query: createPortfolioAssetMutation, variables: { input: formData } });
//         // setNotes([...notes, formData]);
//         // setFormData(initialFormState);
//     }
