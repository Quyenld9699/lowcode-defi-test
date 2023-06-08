import { PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors, DragEndEvent, DndContext, closestCorners, DragStartEvent, DragOverlay, DragOverEvent } from '@dnd-kit/core';
import { Box, Button, Container } from '@mui/material';
import React, { useState } from 'react';
import SortableZone from './SortableZone/SortableZone';
import DraggableNormalZone from './DraggableNormalZone/DraggableNormalZone';
import { ROOT_FUNCTION, TItemDrag, VARIANT_FUNCTION } from './constants';
import useManageDragDrop from './hooks/useManageDragDrop';

export default function DragDrop() {
    const [activeItem, setActiveItem] = useState<{ id: string; from: TItemDrag; name: string } | null>(null);
    const { dragDropState, acceptMoveSourceToTarget, pendingMoveSourceToTarget, rejectMoveSourceToTarget, renewIdRootFunction, logData, deleteRecipe } = useManageDragDrop();

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 150, tolerance: 30 } }));

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;

        setActiveItem({ id: active.id.toString(), from: active.data.current?.type, name: active.data.current?.name });
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        const idActive = active.id.toString();
        console.log(event);
        if (active.data.current?.type == ROOT_FUNCTION) {
            // console.log(ROOT_FUNCTION);
            // console.log({ active, over, activatorEvent, collisions, delta });
            if (over) {
                const idOver = over.id.toString();

                const activeItem = idActive;

                if (idOver === 'draggable-normal-zone') {
                    return;
                } else {
                    pendingMoveSourceToTarget(activeItem);
                }
            }
        } else {
            // console.log(VARIANT_FUNCTION);
            if (over) {
                const idOver = over.id.toString();
                const activeItem = idActive;
                if (idOver === 'draggable-normal-zone') {
                    if (dragDropState.recipeData[activeItem]?.stateDrag === 'pending') {
                        rejectMoveSourceToTarget(activeItem);
                    }
                } else {
                    if (!dragDropState.recipeData[activeItem]) {
                        pendingMoveSourceToTarget(activeItem);
                    }
                }
            }
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over, activatorEvent } = event;
        console.log({ active, over, activatorEvent });
        if (active.data.current?.type == VARIANT_FUNCTION) {
            if (over) {
                if (active.id !== over.id.toString()) {
                    acceptMoveSourceToTarget(active.id.toString(), over.id.toString());
                } else {
                    if (dragDropState.recipeData[active.id.toString()]?.stateDrag === 'pending') {
                        acceptMoveSourceToTarget(active.id.toString(), over.id.toString());
                    }
                }
            }
        } else if (active.data.current?.type == undefined) {
            renewIdRootFunction(active.id.toString());
        }

        setActiveItem(null);
    }
    return (
        <Container>
            <Button onClick={logData} variant="outlined">
                Logs
            </Button>
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>
                <Box sx={{ mt: 20, mb: 20, borderBottom: '2px solid', borderColor: 'primary.main' }}>
                    <SortableZone zoneId="sortable-zone" items={dragDropState.targetIds} />
                </Box>

                <DraggableNormalZone zoneId="draggable-normal-zone" items={dragDropState.sourceIds}></DraggableNormalZone>

                <DragOverlay>
                    {activeItem ? (
                        <>
                            {activeItem.from === 'variant-function' ? (
                                <Box
                                    sx={{
                                        cursor: 'pointer',
                                        width: '45%',
                                        minWidth: '300px',
                                        height: '90px',
                                        border: '2px solid gray',
                                        borderRadius: '10px',
                                        marginBottom: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {activeItem.id}
                                </Box>
                            ) : (
                                <Box sx={{ width: '250px', height: '50px', borderRadius: '10px', border: '1px dashed gray', mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {activeItem.id}
                                </Box>
                            )}
                        </>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </Container>
    );
}
