'use client';
import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import DraggableItem from '../DragableItem/DragableItem';
import { TGroupOfRecipe, groupRecipeBaseData, recipeBaseData } from '../constants';

export default function DraggableNormalZone({ zoneId, items, activeGroupOfRecipe }: { zoneId: string; items: string[]; activeGroupOfRecipe: TGroupOfRecipe }) {
    const { setNodeRef } = useDroppable({ id: zoneId });

    return (
        <Box id={zoneId} ref={setNodeRef} sx={{ display: 'flex', flexFlow: 'wrap', gap: 2 }}>
            {items.map((id, index) => {
                const idBaseRecipe = groupRecipeBaseData[activeGroupOfRecipe][index];
                const _nameFunction = recipeBaseData[idBaseRecipe].nameRecipe;
                return (
                    <DraggableItem
                        key={id + 'draggitemzone'}
                        id={id}
                        idBaseRecipe={idBaseRecipe}
                        sx={{ width: 'fit-content', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', border: '1.5px solid', px: 1.5 }}
                    >
                        {_nameFunction}
                    </DraggableItem>
                );
            })}
        </Box>
    );
}
