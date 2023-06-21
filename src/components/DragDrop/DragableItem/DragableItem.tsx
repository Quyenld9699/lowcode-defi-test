'use client';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box, SxProps } from '@mui/material';
import { ReactNode, useId } from 'react';
import { ROOT_FUNCTION, TGroupOfRecipe, TRecipeIdentity } from '../constants';

interface IDragItemProps {
    id: string;
    children: ReactNode;
    idBaseRecipe: TRecipeIdentity;
    sx?: SxProps;
}
export default function DraggableItem(props: IDragItemProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: props.id, data: { type: ROOT_FUNCTION, idBaseRecipe: props.idBaseRecipe } });

    return (
        <Box ref={setNodeRef} sx={{ cursor: 'all-scroll', opacity: isDragging ? 0.3 : 1, ...props.sx }} {...listeners} {...attributes}>
            {props.children}
        </Box>
    );
}
