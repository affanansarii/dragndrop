import React, { useEffect, useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/tasks');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(reorderedTasks);
        // Here you can also send the reordered tasks to the backend to save the new order
        // await axios.post('http://localhost:5000/update-tasks-order', reorderedTasks);
    };

    return (
        <VStack spacing={4}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            width="100%"
                        >
                            {tasks.map((task, index) => (
                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            p={4}
                                            borderWidth={1}
                                            borderRadius="lg"
                                            className={task.priority}
                                            mb={2}
                                            transition="background 0.3s"
                                            _hover={{ background: 'gray.100' }}
                                        >
                                            <Text fontWeight="bold">{task.title}</Text>
                                            <Text>{task.description}</Text>
                                            <Text color="gray.500">{new Date(task.dueDate).toLocaleDateString()}</Text>
                                            <Text color={task.status === 'completed' ? 'green.500' : 'red.500'}>{task.status}</Text>
                                            <Button colorScheme="teal" onClick={() => {/* Navigate to edit task */ }}>Edit</Button>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
            <Button colorScheme="blue" onClick={() => {/* Navigate to create task */ }}>Add Task</Button>
        </VStack>
    );
};

export default TaskList;