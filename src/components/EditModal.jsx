import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';

const EditModal = ({ isOpen, closeModal, refetch, task }) => {

    const [loading, setLoading] = useState(false);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // const feedback = data.feedback;
        const title = data.title
        const description = data.description
        // console.log(title, description)
        const updatedTask = {
            title: title,
            description: description,
        }
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${task?._id}`, updatedTask);
            toast.success("Task edited successfully!");
            refetch();
        } catch (error) {
            toast.error(error.message);
        } finally {
            closeModal();
        }


    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative " onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-bold leading-6 text-gray-900 text-center"
                                >
                                    Edit <span className='text-green-500'>Task</span>
                                </Dialog.Title>

                                {/* Scholar Ship Info  */}
                                <div className="mt-8 flex items-center justify-center px-0">
                                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                            {/* University Information */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">Title</label>
                                                    <input
                                                        type="text"
                                                        defaultValue={task?.title}
                                                        // placeholder="Enter feedback here"
                                                        className="input input-bordered w-full"
                                                        {...register("title", { required: true })}
                                                    />
                                                    {errors.title && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Description</label>
                                                    <input
                                                        type="text"
                                                        defaultValue={task?.description}
                                                        // placeholder="Enter description here"
                                                        className="input input-bordered w-full"
                                                        {...register("description", { required: true })}
                                                    />
                                                    {errors.description && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="form-control mt-4">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="disabled:cursor-not-allowed block w-full py-2 rounded-lg text-center bg-green-500 text-white font-bold text-xl border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all hover:border-green-500 uppercase cursor-pointer"
                                                >
                                                    {loading ? (
                                                        <TbFidgetSpinner className="animate-spin m-auto" />
                                                    ) : (
                                                        "Update"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* End of Feedback Info  */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditModal;