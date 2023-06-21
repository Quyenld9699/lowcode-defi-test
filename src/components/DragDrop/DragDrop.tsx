import { PointerSensor, useSensor, useSensors, DragEndEvent, DndContext, closestCorners, DragStartEvent, DragOverlay, DragOverEvent } from '@dnd-kit/core';
import { Box, Button, ButtonGroup, Container } from '@mui/material';
import React from 'react';
import SortableZone from './SortableZone/SortableZone';
import DraggableNormalZone from './DraggableNormalZone/DraggableNormalZone';
import { ROOT_FUNCTION, TGroupOfRecipe, VARIANT_FUNCTION, groupRecipeBaseData, recipeBaseData } from './constants';
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

        setDragingItem({
            id: active.id.toString(),
            typeItemDrag: active.data.current?.type,
            idBaseRecipe: active.data.current?.idBaseRecipe,
        });
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
                    <ButtonGroup>
                        {Object.keys(groupRecipeBaseData).map((item, index) => {
                            if (activeGroupOfRecipe == item) {
                                return (
                                    <Button key={'gruop' + index} variant="contained">
                                        {item}
                                    </Button>
                                );
                            }
                            return (
                                <Button key={'gruop' + index} onClick={() => selectTabGroupRecipe(item as TGroupOfRecipe)} color="secondary" variant="text">
                                    {item}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </Box>
                <DraggableNormalZone zoneId="draggable-normal-zone" items={sourceIdsRecipe} activeGroupOfRecipe={activeGroupOfRecipe}></DraggableNormalZone>

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
                                        px: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {dragingItem.id}
                                </Box>
                            ) : (
                                <Box sx={{ width: '250px', height: '50px', borderRadius: '10px', border: '1px dashed gray', px: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {recipeBaseData[dragingItem.idBaseRecipe].nameRecipe}
                                </Box>
                            )}
                        </>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </Container>
    );
}
