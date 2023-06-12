export const ROOT_FUNCTION = 'root-function';
export const VARIANT_FUNCTION = 'variant-function';

export type TItemDrag = typeof ROOT_FUNCTION | typeof VARIANT_FUNCTION;

export const recipeBaseData = {
    oraichain: [{ id: 'R001' }, { id: 'R002' }, { id: 'R003' }],
    stride: [{ id: 'ST001' }, { id: 'ST002' }, { id: 'ST003' }, { id: 'ST004' }, { id: 'ST005' }],
};

export type TGroupOfRecipe = keyof typeof recipeBaseData;
