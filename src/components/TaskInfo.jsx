import React, { useState } from 'react';
import EditModal from './EditModal';

const TaskInfo = ({ task, handleEdit, handleDelete, refetch }) => {

    const [editTask, setEditTask] = useState(task);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const handleEditOpenModal = () => {
        setEditModalIsOpen(true);
    }

    const handleEditCloseModal = () => {
        setEditModalIsOpen(false);
    }

    return (
        <>
            <h3 className="font-medium">{task.title}</h3>
            {task.description && (
                <p className="text-sm text-gray-600 mt-2">
                    {task.description}
                </p>
            )}
            <div className="flex flex-row gap-5">
                <button
                    // onClick={() => deleteTask(task._id)}
                    onClick={handleEditOpenModal}
                    // onClick={() => handleEdit(task)}
                    className="btn btn-sm bg-green-500 border-green-500 text-white font-bold mt-2"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(task?._id)}
                    className="btn btn-sm bg-red-500 border-red-500 text-white font-bold mt-2"
                >
                    Delete
                </button>
            </div>


            <EditModal
                isOpen={editModalIsOpen}
                closeModal={handleEditCloseModal}
                task={editTask}
                refetch={refetch}
            />
        </>
    );
};

export default TaskInfo;