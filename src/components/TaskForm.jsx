import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const TaskForm = ({ tasks, setTasks, refetch }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Clicked")

        // const title = e.target.title.value;
        // const description = e.target.description.value;
        if (!title || !description) {
            toast.success("Please fill in all fields.");
            return;
        }

        const newTask = {
            title,
            description,
            timestamp: new Date().toLocaleString(),
            category: "To-Do",
        }

        try {

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, newTask);
            toast.success("Task added successfully.");
            setTasks([...tasks, newTask]);

            setTitle("");
            setDescription("");
            refetch();
        } catch (err) {
            toast.error("Failed to add task. Please try again.");
            // console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form mb-8">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                // name="title"
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                required
                className="w-full p-2 mb-2 border rounded"
            />
            <textarea
                placeholder="Task Description"
                value={description}
                // name="description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                className="w-full p-2 mb-2 border rounded"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;