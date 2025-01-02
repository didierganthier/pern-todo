import React, { useEffect, useState } from 'react'

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        const response = await fetch("http://localhost:3004/todos");
        const jsonData = await response.json();

        if (response.ok) {
            console.log(jsonData)
            setTodos(jsonData);
        } else {
            console.error(response);
        }
    }

    const deleteTodo = async (todoId) => {
        try {
            const deleteTodo = await fetch(`http://localhost:3004/todos/${todoId}`, {
                method: 'DELETE'
            })

            if(deleteTodo.ok) {
                setTodos(todos.filter((todo) => todo.todo_id !== todoId))
            } else {
                console.error(deleteTodo);
            }
        } catch (error) {
            console.error(deleteTodo);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])
    
    useEffect(() => {
        const sortedTodos = [...todos].sort((a, b) => a.todo_id - b.todo_id);
        setTodos(sortedTodos);
    }, [todos]);

    return (
        <div className='flex justify-center mt-10 rounded-md'>
            <div class="relative overflow-x-auto rounded-md border">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-md">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 rounded-md">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => (
                            <tr class="bg-white border-b" key={todo.todo_id}>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {todo.todo_id}
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {todo.description}
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <button>
                                        <img src='https://cdn-icons-png.flaticon.com/512/2985/2985043.png' alt='edit-icon' className='w-4 h-4'/>
                                    </button>
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <button onClick={() => deleteTodo(todo.todo_id)}>
                                        <img src='https://cdn-icons-png.flaticon.com/512/1214/1214428.png' alt='trash-icon' className='w-4 h-4'/>
                                    </button>
                                </td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodos