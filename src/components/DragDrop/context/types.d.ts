import { TGroupOfRecipe, TItemDrag, TRecipeIdentity } from '../constants';

export interface IRecipeSortedItem<TData = any> {
    id: string;
    idBaseRecipe: TRecipeIdentity;
    data: TData;
}

export interface IDataListRecipeSorted {
    [key: string]: IRecipeSortedItem;
}

export interface IDragingItemData {
    id: string;
    typeItemDrag: TItemDrag;
    idBaseRecipe: TRecipeIdentity;
}
