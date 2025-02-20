import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from "react";
import toast from 'react-hot-toast';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import TaskForm from './components/TaskForm';
import TaskInfo from './components/TaskInfo';

// Helper function to reorder an array
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function App() {

  const [tasks, setTasks] = useState([]);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editTask, setEditTask] = useState([""]);

  const { data: tasksData = [], isLoading, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
      // console.log("data Loaded");
      setTasks(data);
      return data;
    }
  })

  // Main Code
  // const onDragEnd = async (result) => {
  //   const { source, destination, draggableId } = result;

  //   if (!destination) return;

  //   // 1st Way
  //   const updatedTasks = Array.from(tasks);
  //   const task = updatedTasks.find((t) => t._id === draggableId);
  //   task.category = destination.droppableId;

  //   const [removed] = updatedTasks.splice(source.index, 1);
  //   updatedTasks.splice(destination.index, 0, removed);

  //   if (source.droppableId == destination.droppableId) {
  //     return;
  //   }

  //   try {
  //     await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${draggableId}`, {
  //       category: destination.droppableId,
  //     });
  //     toast.success("Task updated successfully!");
  //   }
  //   catch (error) {
  //     console.error(error);
  //     toast.error("Failed to update task!");
  //   }
  // };

  // Delet Task

  // Deepseck
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const task = updatedTasks.find((t) => t._id === draggableId);

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const columnTasks = updatedTasks.filter(
        (t) => t.category === source.droppableId
      );
      columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, task);

      const remainingTasks = updatedTasks.filter(
        (t) => t.category !== source.droppableId
      );
      setTasks([...remainingTasks, ...columnTasks]);
    } else {
      // Move task to a different column
      // task.category = destination.droppableId;
      // updatedTasks.splice(source.index, 1);
      // updatedTasks.splice(destination.index, 0, task);
      // setTasks(updatedTasks);

      // const updatedTasks = Array.from(tasks);
      // const task = updatedTasks.find((t) => t._id === draggableId);
      task.category = destination.droppableId;

      const [removed] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, removed);

      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${draggableId}`, {
          category: destination.droppableId,
        });
        toast.success("Task updated successfully!");
      } catch (error) {
        // console.error(error);
        toast.error("Failed to update task!");
      }
    }
  };

  // Delete Task Funcationality
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
      toast.success("Task deleted successfully!");
      setTasks(tasks.filter((task) => task._id !== id));
      refetch();
    } catch (err) {
      // console.error(err);
      toast.error("Failed to delete task!");
    }
  };

  // Handle Edit Open Modal
  const handleEditOpenModal = () => {
    setEditModalIsOpen(true);
  }

  // Hanlde Edit CLose Modal
  const handleEditCloseModal = () => {
    setEditModalIsOpen(false);
  }

  // Handle Edit Modal Close
  const handleEdit = (task) => {
    // console.log(task)
    setEditTask(task);
    handleEditOpenModal();
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="app p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 uppercase">Task <span className="text-green-500">Management</span></h1>

      <TaskForm
        setTasks={setTasks}
        tasks={tasks}
        refetch={refetch}
      />

      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="task-container grid grid-cols-1 md:grid-cols-3 gap-6">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="category-column bg-white rounded-lg shadow-md p-4"
                >
                  <h2 className="text-xl font-semibold mb-4">{category}</h2>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-card bg-gray-50 p-4 mb-4 rounded-lg shadow-sm"
                          >
                            <TaskInfo
                              task={task}
                              refetch={refetch}
                              handleEdit={handleEdit}
                              handleDelete={deleteTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

    </div>
  )
}

export default App
