'use client';
import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import DraggableItem from '../DragableItem/DragableItem';

export default function DraggableNormalZone({ zoneId, items }: { zoneId: string; items: string[] }) {
    const { setNodeRef } = useDroppable({ id: zoneId });

    return (
        <Box id={zoneId} ref={setNodeRef} sx={{ display: 'flex', flexFlow: 'wrap' }}>
            {items.map((id, index) => (
                <DraggableItem
                    key={id + 'draggitemzone'}
                    id={id}
                    nameFunction={'Function ' + index}
                    sx={{ width: 'fit-content', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', border: '2px dashed', mr: 2 }}
                >
                    Function {index}
                </DraggableItem>
            ))}
        </Box>
    );
}
