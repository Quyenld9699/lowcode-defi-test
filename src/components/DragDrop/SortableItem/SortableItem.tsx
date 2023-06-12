'use client';
import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, ClickAwayListener, IconButton } from '@mui/material';
import { VARIANT_FUNCTION } from '../constants';
import { RemoveCircleOutline, SettingsOutlined } from '@mui/icons-material';
import { useManageDragDropStatesContext } from '../context/manage-dragdrop-states';

export default function SortableItem(props: { id: string; index: number; nameFunction: string }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id, data: { type: VARIANT_FUNCTION, name: props.nameFunction } });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };
    return (
        <Box ref={setNodeRef} style={style} {...attributes}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                        {...listeners}
                        sx={{
                            cursor: 'pointer',
                            width: '45%',
                            minWidth: '300px',
                            height: '90px',
                            border: '2px solid gray',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            opacity: isDragging ? 0.3 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        // onClick={handleClick}
                    >
                        id={props.id}
                        <ButtonRemoveItem id={props.id} />
                        <IconButton onClick={handleClick} color="primary">
                            <SettingsOutlined />
                        </IconButton>
                    </Box>
                    {open ? (
                        <Box sx={{ position: 'relative', flexGrow: 1 }}>
                            <Box sx={{ position: 'absolute', height: '300px', bgcolor: '#ffffff56', top: 0, left: 0, width: '100%', borderRadius: '12px' }}></Box>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            </ClickAwayListener>
        </Box>
    );
}

function ButtonRemoveItem({ id }: { id: string }) {
    const { deleteItemAtSortableZone } = useManageDragDropStatesContext();
    function handleClick() {
        deleteItemAtSortableZone(id);
    }
    return (
        <IconButton onClick={handleClick} color="error" sx={{ mx: 1 }}>
            <RemoveCircleOutline />
        </IconButton>
    );
}
