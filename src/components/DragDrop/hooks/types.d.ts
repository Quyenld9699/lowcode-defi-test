export type TypeRecipe = 'F1' | 'F2' | 'F3' | 'F4';

export interface IRecipeItem {
    id: string;
    stateDrag: 'pending' | 'done'; // ? trạng thái kéo thả từ khi start tới khi end, bắt đầu kéo thì sẽ là "pending", khi chấp nhận thả vào vùng recipe thì sẽ thành "done"
    type: TypeRecipe;
    data: any;
}

export interface IDragDropState {
    sourceIds: string[];
    targetIds: string[];
    recipeData: { [key: string]: IRecipeItem };
}
