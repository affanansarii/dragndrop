import React, { useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = [
  { id: '1', title: 'Task 1', description: 'This is the first task.', priority: 'high' },
  { id: '2', title: 'Task 2', description: 'This is the second task.', priority: 'medium' },
  { id: '3', title: 'Task 3', description: 'This is the third task.', priority: 'low' },
  { id: '4', title: 'Task 4', description: 'This is the fourth task.', priority: 'medium' },
  { id: '5', title: 'Task 5', description: 'This is the fifth task.', priority: 'high' },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <Box p={5} bgGradient="linear(to-r, teal.500, green.500)" minHeight="100vh">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" color="white">Task Manager</Text>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                width="100%"
                maxW="600px"
                borderWidth={1}
                borderRadius="md"
                bg="white"
                boxShadow="lg"
                p={4}
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        p={4}
                        mb={2}
                        borderWidth={1}
                        borderRadius="md"
                        bg={task.priority === 'high' ? 'red.100' : task.priority === 'medium' ? 'yellow.100' : 'green.100'}
                        transition="background 0.3s"
                        _hover={{ background: 'gray.100' }}
                      >
                        <Text fontWeight="bold">{task.title}</Text>
                        <Text>{task.description}</Text>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
    </Box>
  );
};

export default App;