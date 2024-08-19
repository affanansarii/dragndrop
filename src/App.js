// src/App.js
import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, List, ListItem } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uniqueTheme from './theme';

const initialItems = [
  'Task 1: Design the homepage',
  'Task 2: Implement the API',
  'Task 3: Test the application',
  'Task 4: Deploy to production',
];

const App = () => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <ChakraProvider theme={uniqueTheme}>
      <Box p={5} maxWidth="500px" mx="auto" mt={10} bg="gray.100" borderRadius="md" boxShadow="lg">
        <Heading mb={4} textAlign="center" color="purple.600">
          Task Manager
        </Heading>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={3}
                bg="white"
                borderRadius="md"
                p={4}
              >
                {items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bg="purple.50"
                        p={4}
                        borderRadius="md"
                        boxShadow="md"
                        _hover={{ bg: 'purple.100' }}
                        color="gray.800"
                        fontWeight="medium"
                      >
                        {item}
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </ChakraProvider>
  );
};

export default App;
