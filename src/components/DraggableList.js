import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Text, VStack } from '@chakra-ui/react';

const initialItems = [
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
];

const DraggableList = () => {

    const [items, setItems] = useState(initialItems);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);

        setItems(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <VStack
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        spacing={4}
                        align="stretch"
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        bg="teal.500"
                                        color="white"
                                        p={4}
                                        borderRadius="md"
                                        boxShadow="md"
                                        _hover={{ bg: 'teal.600' }}
                                    >
                                        <Text fontSize="lg">{item.content}</Text>
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </VStack>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
