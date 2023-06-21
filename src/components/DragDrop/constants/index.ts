export const ROOT_FUNCTION = 'root-function';
export const VARIANT_FUNCTION = 'variant-function';

export type TItemDrag = typeof ROOT_FUNCTION | typeof VARIANT_FUNCTION;
export type TGroupOfRecipe = 'oraidex' | 'orchaiLiquidStake' | 'orchaiMoneyMarket';

export const recipeBaseData = {
    OD001: { nameRecipe: 'Bond', group: 'oraidex' },
    OD002: { nameRecipe: 'Provide Liquidity', group: 'oraidex' },
    OD003: { nameRecipe: 'Swap', group: 'oraidex' },
    OD004: { nameRecipe: 'Unbond', group: 'oraidex' },
    OD005: { nameRecipe: 'Withdraw', group: 'oraidex' },
    OD006: { nameRecipe: 'Withdraw Liquidity', group: 'oraidex' },

    OLS001: { nameRecipe: 'Claim Orai Rewards', group: 'orchaiLiquidStake' },
    OLS002: { nameRecipe: 'Convert Orai', group: 'orchaiLiquidStake' },
    OLS003: { nameRecipe: 'Stake Orai', group: 'orchaiLiquidStake' },
    OLS004: { nameRecipe: 'Unstake Orai', group: 'orchaiLiquidStake' },
    OLS005: { nameRecipe: 'Withdraw Orai Unbonded', group: 'orchaiLiquidStake' },

    OMK001: { nameRecipe: 'Custody: Claim Rewards', group: 'orchaiMoneyMarket' },
    OMK002: { nameRecipe: 'Liquidation: Claim Lending Rewards', group: 'orchaiMoneyMarket' },
    OMK003: { nameRecipe: 'Liquidation: Claim Liquidations', group: 'orchaiMoneyMarket' },
    OMK004: { nameRecipe: 'Liquidation: Retract Bid', group: 'orchaiMoneyMarket' },
    OMK005: { nameRecipe: 'Liquidation: Submit Bid', group: 'orchaiMoneyMarket' },
    OMK006: { nameRecipe: 'Market: Borrow Stable', group: 'orchaiMoneyMarket' },
    OMK007: { nameRecipe: 'Market: Claim Borrower Rewards', group: 'orchaiMoneyMarket' },
    OMK008: { nameRecipe: 'Market: Claim Lender Rewards', group: 'orchaiMoneyMarket' },
    OMK009: { nameRecipe: 'Market: Deposit Stable', group: 'orchaiMoneyMarket' },
    OMK010: { nameRecipe: 'Market: Redeem Stable', group: 'orchaiMoneyMarket' },
    OMK011: { nameRecipe: 'Market: Repay Stable', group: 'orchaiMoneyMarket' },
    OMK012: { nameRecipe: 'Market:Repay Stable For', group: 'orchaiMoneyMarket' },
    OMK013: { nameRecipe: 'Overseer: Provide And Lock Collateral', group: 'orchaiMoneyMarket' },
    OMK014: { nameRecipe: 'Overseer: Unlock And Withdraw Collateral', group: 'orchaiMoneyMarket' },
};

export type TRecipeIdentity = keyof typeof recipeBaseData;

export const groupRecipeBaseData: { [key in TGroupOfRecipe]: TRecipeIdentity[] } = {
    oraidex: Object.keys(recipeBaseData).filter((key) => recipeBaseData[key as TRecipeIdentity].group == 'oraidex') as TRecipeIdentity[],
    orchaiLiquidStake: Object.keys(recipeBaseData).filter((key) => recipeBaseData[key as TRecipeIdentity].group == 'orchaiLiquidStake') as TRecipeIdentity[],
    orchaiMoneyMarket: Object.keys(recipeBaseData).filter((key) => recipeBaseData[key as TRecipeIdentity].group == 'orchaiMoneyMarket') as TRecipeIdentity[],
};
