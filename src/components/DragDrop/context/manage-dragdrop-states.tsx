'use client';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { BaseContextProps } from 'src/global.config';
import { IDataListRecipeSorted, IDragingItemData } from './types';
import { TGroupOfRecipe, recipeBaseData } from '../constants';
import { v4 as uuid } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';

interface IDataContextResponse {
    recipeDataSorted: IDataListRecipeSorted;
    sortingRecipeIds: string[];
    dragingItem: IDragingItemData | null;
    setDragingItem: Dispatch<SetStateAction<IDragingItemData | null>>;
    activeGroupOfRecipe: TGroupOfRecipe;
    sourceIdsRecipe: string[]; // list id for user select to drop in sortable zone
    deleteItemAtSortableZone: (_id: string) => void;
    addItemToSortableZone: (_id: string) => void;
    selectTabGroupRecipe: (group: TGroupOfRecipe) => void;
    renewIdInListSource: (_id: string) => void;
    swapItemInSortableZone: (_id1: string, _id2: string) => void;
    logData: () => void;
}

const TheContext = createContext({} as IDataContextResponse);

export default function ManageDragDropStatesProvider(props: BaseContextProps) {
    const [recipeDataSorted, setRecipeDataSorted] = useState<IDataListRecipeSorted>({});
    const [sortingRecipeIds, setSortingRecipeIds] = useState<string[]>([]);

    const [dragingItem, setDragingItem] = useState<IDragingItemData | null>(null);
    const [activeGroupOfRecipe, setActiveGroupOfRecipe] = useState<TGroupOfRecipe>('oraichain');

    const [sourceIdsRecipe, setSourceIdsRecipe] = useState<string[]>(recipeBaseData[activeGroupOfRecipe].map(() => uuid()));

    function logData() {
        console.log({ recipeDataSorted, sortingRecipeIds, dragingItem, activeGroupOfRecipe, sourceIdsRecipe });
    }

    // TODO: function for sortable-zone
    function addItemToSortableZone(_id: string) {
        setSortingRecipeIds((prev) => [...prev, _id]);
        setRecipeDataSorted((prev) => {
            return {
                ...prev,
                [_id]: { id: _id, type: 'F1', data: {} },
            };
        });
    }

    function deleteItemAtSortableZone(_id: string) {
        setSortingRecipeIds((prev) => prev.filter((idItem) => idItem != _id));
        setRecipeDataSorted((prev) => {
            const _recipeData = { ...prev };
            delete _recipeData[_id]; // TODO: xoa element co key la _id
            return _recipeData;
        });
    }

    function swapItemInSortableZone(_id1: string, _id2: string) {
        // ?: change value index of two value in target

        setSortingRecipeIds((prev) => {
            const oldIndex = prev.indexOf(_id1);
            const newIndex = prev.indexOf(_id2);
            return arrayMove(prev, oldIndex, newIndex);
        });
    }

    // TODO: function for dragable normal zone
    function selectTabGroupRecipe(group: TGroupOfRecipe) {
        setActiveGroupOfRecipe(group);
        setSourceIdsRecipe(recipeBaseData[group].map(() => uuid()));
    }

    function renewIdInListSource(_id: string) {
        // ?: delete id đã được add, tạo id mới thay thế (giữ mảng độ dài không đổi)
        setSourceIdsRecipe((prev) => {
            const _sourceIds = [...prev];
            const index = _sourceIds.indexOf(_id);
            _sourceIds[index] = uuid();

            return _sourceIds;
        });
    }

    // TODO: combind function

    return (
        <TheContext.Provider
            value={{
                recipeDataSorted,
                sortingRecipeIds,
                dragingItem,
                setDragingItem,
                activeGroupOfRecipe,
                sourceIdsRecipe,
                deleteItemAtSortableZone,
                addItemToSortableZone,
                selectTabGroupRecipe,
                renewIdInListSource,
                swapItemInSortableZone,
                logData,
            }}
        >
            {props.children}
        </TheContext.Provider>
    );
}

export const useManageDragDropStatesContext = () => useContext(TheContext);
