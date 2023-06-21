'use client';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, Typography } from '@mui/material';
import SortableItem from '../SortableItem/SortableItem';
import { ReactNode, useEffect } from 'react';
import { VARIANT_FUNCTION } from '../constants';
import { useManageDragDropStatesContext } from '../context/manage-dragdrop-states';

export default function SortableZone({ zoneId, items }: { zoneId: string; items: string[] }) {
    const { setNodeRef, isOver, over, active } = useDroppable({ id: zoneId });
    const { recipeDataSorted } = useManageDragDropStatesContext();
    const _isOver = isOver || over?.data?.current?.type == VARIANT_FUNCTION;

    return (
        <SortableContext id={zoneId} items={items} strategy={verticalListSortingStrategy}>
            <Box ref={setNodeRef} sx={{ pb: 5, minHeight: '300px' }}>
                {items.map((item) => (
                    <SortableItem key={item} id={item} recipeDataSortedItem={recipeDataSorted[item]} />
                ))}

                <Box mt={5}>
                    <Typography variant="h5" sx={{ width: 'fit-content', margin: 'auto', opacity: _isOver ? 1 : 0.1, border: '2px dashed', borderColor: 'primary.main', padding: '5px 35px' }}>
                        Drop recipe here!
                    </Typography>
                </Box>
            </Box>
        </SortableContext>
    );
}
