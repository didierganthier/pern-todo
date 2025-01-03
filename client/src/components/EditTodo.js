import React, { useState } from 'react';

const EditTodo = ({ todo }) => {
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState(todo.description);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = async () => {
        try {
            const body = { description };
            await fetch(`http://localhost:3004/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            handleClose();
            window.location = '/'

        } catch (error) {
            console.error(error);
            handleClose();
        }

    };

    return (
        <>
            <button variant="primary" onClick={handleShow}>
                Edit Todo
            </button>

            <div id="crud-modal" tabindex="-1" aria-hidden="true" class={`${!show? "hidden" : ""} fixed inset-0 z-50 flex justify-center items-center`}>
                <div class="relative p-4 w-full max-w-md max-h-full">

                    <div class="relative bg-white rounded-lg shadow">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 class="text-lg font-semibold text-gray-900">
                                Edit Todo
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal" onClick={handleClose}>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form class="p-4 md:p-5" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <div class="grid gap-4 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Edit todo description here"
                                    />
                                </div>
                            </div>
                            <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTodo;