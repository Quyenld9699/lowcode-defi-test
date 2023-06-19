import { TItemDrag } from '../constants';

export type TypeRecipe = 'F1' | 'F2' | 'F3' | 'F4';

export interface IRecipeSortedItem<TData = any> {
    id: string;
    type: TypeRecipe;
    data: TData;
}

export interface IDataListRecipeSorted {
    [key: string]: IRecipeSortedItem;
}

export interface IDragingItemData {
    id: string;
    typeItemDrag: TItemDrag;
    data?: any;
}
