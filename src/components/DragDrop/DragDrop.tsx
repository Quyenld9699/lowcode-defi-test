import { PointerSensor, useSensor, useSensors, DragEndEvent, DndContext, closestCorners, DragStartEvent, DragOverlay, DragOverEvent } from '@dnd-kit/core';
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import SortableZone from './SortableZone/SortableZone';
import DraggableNormalZone from './DraggableNormalZone/DraggableNormalZone';
import { ROOT_FUNCTION, VARIANT_FUNCTION } from './constants';
import { useManageDragDropStatesContext } from './context/manage-dragdrop-states';

export default function DragDrop() {
    const {
        dragingItem,
        setDragingItem,
        sortingRecipeIds,
        selectTabGroupRecipe,
        sourceIdsRecipe,
        addItemToSortableZone,
        recipeDataSorted,
        activeGroupOfRecipe,
        deleteItemAtSortableZone,
        swapItemInSortableZone,
        renewIdInListSource,
        logData,
    } = useManageDragDropStatesContext();

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 150, tolerance: 30 } }));

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;

        setDragingItem({ id: active.id.toString(), typeItemDrag: active.data.current?.type, data: { name: active.data.current?.name } });
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        const idActive = active.id.toString();
        // console.log(event);
        if (dragingItem?.typeItemDrag == ROOT_FUNCTION) {
            // console.log(ROOT_FUNCTION);

            if (over) {
                const idOver = over.id.toString();

                if (idOver === 'draggable-normal-zone') {
                    if (recipeDataSorted[idActive]) {
                        deleteItemAtSortableZone(idActive);
                    }
                    return;
                } else {
                    if (!recipeDataSorted[idActive]) {
                        addItemToSortableZone(idActive);
                    }
                }
            }
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over, activatorEvent } = event;
        // console.log({ active, over, activatorEvent });
        if (dragingItem?.typeItemDrag == VARIANT_FUNCTION) {
            if (over) {
                const idOver = over.id.toString();
                if (idOver !== 'draggable-normal-zone') {
                    swapItemInSortableZone(active.id.toString(), over.id.toString());
                }
            }
        } else {
            if (over) {
                const idOver = over.id.toString();
                if (idOver !== 'draggable-normal-zone') {
                    swapItemInSortableZone(active.id.toString(), over.id.toString());
                }
            }
            renewIdInListSource(active.id.toString());
        }

        setDragingItem(null);
    }
    return (
        <Container>
            <Button onClick={logData} variant="outlined">
                Logs
            </Button>

            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>
                <Box sx={{ mt: 20, mb: 20, borderBottom: '2px solid', borderColor: 'primary.main' }}>
                    <SortableZone zoneId="sortable-zone" items={sortingRecipeIds} />
                </Box>

                <Box mb={3}>
                    <Button onClick={() => selectTabGroupRecipe('oraichain')} variant="contained" disabled={activeGroupOfRecipe === 'oraichain'}>
                        Oraichain
                    </Button>
                    <Button onClick={() => selectTabGroupRecipe('stride')} variant="contained" disabled={activeGroupOfRecipe === 'stride'}>
                        Stride
                    </Button>
                </Box>
                <DraggableNormalZone zoneId="draggable-normal-zone" items={sourceIdsRecipe}></DraggableNormalZone>

                <DragOverlay>
                    {dragingItem ? (
                        <>
                            {dragingItem.typeItemDrag === VARIANT_FUNCTION ? (
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
                                    {dragingItem.id}
                                </Box>
                            ) : (
                                <Box sx={{ width: '250px', height: '50px', borderRadius: '10px', border: '1px dashed gray', mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {dragingItem.id}
                                </Box>
                            )}
                        </>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </Container>
    );
}
