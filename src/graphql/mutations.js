/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPortfolioAsset = /* GraphQL */ `
  mutation CreatePortfolioAsset(
    $input: CreatePortfolioAssetInput!
    $condition: ModelPortfolioAssetConditionInput
  ) {
    createPortfolioAsset(input: $input, condition: $condition) {
      id
      assetPair
      costPerCoin
      totalCoins
      createdAt
      updatedAt
    }
  }
`;
export const updatePortfolioAsset = /* GraphQL */ `
  mutation UpdatePortfolioAsset(
    $input: UpdatePortfolioAssetInput!
    $condition: ModelPortfolioAssetConditionInput
  ) {
    updatePortfolioAsset(input: $input, condition: $condition) {
      id
      assetPair
      costPerCoin
      totalCoins
      createdAt
      updatedAt
    }
  }
`;
export const deletePortfolioAsset = /* GraphQL */ `
  mutation DeletePortfolioAsset(
    $input: DeletePortfolioAssetInput!
    $condition: ModelPortfolioAssetConditionInput
  ) {
    deletePortfolioAsset(input: $input, condition: $condition) {
      id
      assetPair
      costPerCoin
      totalCoins
      createdAt
      updatedAt
    }
  }
`;
