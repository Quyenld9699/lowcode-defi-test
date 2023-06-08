'use client';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { IDragDropState } from './types';
import { arrayMove } from '@dnd-kit/sortable';

export default function useManageDragDrop() {
    const [dragDropState, setDragDropState] = useState<IDragDropState>({
        sourceIds: [uuid(), uuid(), uuid()],
        targetIds: [],
        recipeData: {},
    });

    function logData() {
        console.log(dragDropState);
    }

    function pendingMoveSourceToTarget(sourceId: string) {
        setDragDropState((prev) => {
            return {
                ...prev,
                targetIds: [...prev.targetIds, sourceId],
                recipeData: { ...prev.recipeData, [sourceId]: { data: {}, id: sourceId, stateDrag: 'pending', type: 'F1' } },
            };
        });
    }

    function deleteRecipe(id: string) {
        setDragDropState((prev) => {
            const _recipeData = { ...prev.recipeData };
            delete _recipeData[id]; // TODO: xoa element co key la sourceId
            return {
                ...prev,
                targetIds: prev.targetIds.filter((_id) => _id != id),
                recipeData: _recipeData,
            };
        });
    }

    function rejectMoveSourceToTarget(sourceId: string) {
        setDragDropState((prev) => {
            const _recipeData = { ...prev.recipeData };
            delete _recipeData[sourceId]; // TODO: xoa element co key la sourceId
            return {
                ...prev,
                targetIds: prev.targetIds.filter((id) => id != sourceId),
                recipeData: _recipeData,
            };
        });
    }

    function acceptMoveSourceToTarget(sourceId: string, targetId: string) {
        setDragDropState((prev) => {
            // TODO: delete id đã được add, tạo id mới thay thế (giữ mảng độ dài không đổi)
            const _sourceIds = [...prev.sourceIds];
            const index = _sourceIds.indexOf(sourceId);
            _sourceIds[index] = uuid();

            // TODO: change value index of two value in target
            const oldIndex = prev.targetIds.indexOf(sourceId);
            const newIndex = prev.targetIds.indexOf(targetId);

            return {
                targetIds: arrayMove(prev.targetIds, oldIndex, newIndex),
                sourceIds: _sourceIds,
                recipeData: { ...prev.recipeData, [sourceId]: { ...prev.recipeData[sourceId], stateDrag: 'done' } },
            };
        });
    }

    function renewIdRootFunction(sourceId: string) {
        setDragDropState((prev) => {
            // TODO: delete id đã được add, tạo id mới thay thế (giữ mảng độ dài không đổi)
            const _sourceIds = [...prev.sourceIds];
            const index = _sourceIds.indexOf(sourceId);
            _sourceIds[index] = uuid();

            return {
                ...prev,
                sourceIds: _sourceIds,
            };
        });
    }

    return {
        dragDropState,
        deleteRecipe,
        logData,
        pendingMoveSourceToTarget,
        rejectMoveSourceToTarget,
        acceptMoveSourceToTarget,
        renewIdRootFunction,
    };
}
