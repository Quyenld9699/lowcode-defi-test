import { TItemDrag } from '../constants';

export type TypeRecipe = 'F1' | 'F2' | 'F3' | 'F4';

export interface IRecipeSortedItem {
    id: string;
    // stateDrag: 'pending' | 'done'; // ? trạng thái kéo thả từ khi start tới khi end, bắt đầu kéo thì sẽ là "pending", khi chấp nhận thả vào vùng recipe thì sẽ thành "done"
    type: TypeRecipe;
    data: any;
}

export interface IDataListRecipeSorted {
    [key: string]: IRecipeSortedItem;
}

export interface IDragingItemData {
    id: string;
    typeItemDrag: TItemDrag;
    data?: any;
}
