/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePortfolioAssetInput = {
  id?: string | null,
  assetPair?: string | null,
  costPerCoin?: number | null,
  totalCoins?: number | null,
};

export type ModelPortfolioAssetConditionInput = {
  assetPair?: ModelStringInput | null,
  costPerCoin?: ModelIntInput | null,
  totalCoins?: ModelIntInput | null,
  and?: Array< ModelPortfolioAssetConditionInput | null > | null,
  or?: Array< ModelPortfolioAssetConditionInput | null > | null,
  not?: ModelPortfolioAssetConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type PortfolioAsset = {
  __typename: "PortfolioAsset",
  id: string,
  assetPair?: string | null,
  costPerCoin?: number | null,
  totalCoins?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePortfolioAssetInput = {
  assetPair?: string | null,
  costPerCoin?: number | null,
  totalCoins?: number | null,
};

export type DeletePortfolioAssetInput = {
  id: string,
};

export type ModelPortfolioAssetFilterInput = {
  assetPair?: ModelStringInput | null,
  costPerCoin?: ModelIntInput | null,
  totalCoins?: ModelIntInput | null,
  and?: Array< ModelPortfolioAssetFilterInput | null > | null,
  or?: Array< ModelPortfolioAssetFilterInput | null > | null,
  not?: ModelPortfolioAssetFilterInput | null,
};

export type ModelPortfolioAssetConnection = {
  __typename: "ModelPortfolioAssetConnection",
  items?:  Array<PortfolioAsset | null > | null,
  nextToken?: string | null,
};

export type CreatePortfolioAssetMutationVariables = {
  input: CreatePortfolioAssetInput,
  condition?: ModelPortfolioAssetConditionInput | null,
};

export type CreatePortfolioAssetMutation = {
  createPortfolioAsset?:  {
    __typename: "PortfolioAsset",
    id: string,
    assetPair?: string | null,
    costPerCoin?: number | null,
    totalCoins?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePortfolioAssetMutationVariables = {
  input: UpdatePortfolioAssetInput,
  condition?: ModelPortfolioAssetConditionInput | null,
};

export type UpdatePortfolioAssetMutation = {
  updatePortfolioAsset?:  {
    __typename: "PortfolioAsset",
    id: string,
    assetPair?: string | null,
    costPerCoin?: number | null,
    totalCoins?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePortfolioAssetMutationVariables = {
  input: DeletePortfolioAssetInput,
  condition?: ModelPortfolioAssetConditionInput | null,
};

export type DeletePortfolioAssetMutation = {
  deletePortfolioAsset?:  {
    __typename: "PortfolioAsset",
    id: string,
    assetPair?: string | null,
    costPerCoin?: number | null,
    totalCoins?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPortfolioAssetQueryVariables = {
  id: string,
};

export type GetPortfolioAssetQuery = {
  getPortfolioAsset?:  {
    __typename: "PortfolioAsset",
    id: string,
    assetPair?: string | null,
    costPerCoin?: number | null,
    totalCoins?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPortfolioAssetsQueryVariables = {
  filter?: ModelPortfolioAssetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPortfolioAssetsQuery = {
  listPortfolioAssets?:  {
    __typename: "ModelPortfolioAssetConnection",
    items?:  Array< {
      __typename: "PortfolioAsset",
      id: string,
      assetPair?: string | null,
      costPerCoin?: number | null,
      totalCoins?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePortfolioAssetSubscription = {
  onCreatePortfolioAsset?:  {
    __typename: "PortfolioAsset",
    id: string,
    assetPair?: string | null,
    costPerCoin?: number | null,
    totalCoins?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePortfolioAssetSubscription = {
  onUpdatePortfolioAsset?:  {
    __typename: "PortfolioAsset",
    id: string,
    assetPair?: string | null,
    costPerCoin?: number | null,
    totalCoins?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePortfolioAssetSubscription = {
  onDeletePortfolioAsset?:  {
    __typename: "PortfolioAsset",
    id: string,
    assetPair?: string | null,
    costPerCoin?: number | null,
    totalCoins?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
