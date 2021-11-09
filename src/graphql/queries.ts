/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPortfolioAsset = /* GraphQL */ `
  query GetPortfolioAsset($id: ID!) {
    getPortfolioAsset(id: $id) {
      id
      assetPair
      costPerCoin
      totalCoins
      createdAt
      updatedAt
    }
  }
`;
export const listPortfolioAssets = /* GraphQL */ `
  query ListPortfolioAssets(
    $filter: ModelPortfolioAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPortfolioAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        assetPair
        costPerCoin
        totalCoins
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
