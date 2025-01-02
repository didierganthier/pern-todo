import React, { useState } from 'react'

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { description };
            const response = await fetch("http://localhost:3004/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if(response.ok) {
                window.location = "/"
            } else {
                alert("An error occured");
            }
        } catch (error) {
            
        }
    }

    return (
        <div className='flex flex-col justify-center items-center gap-8'>
            <h1 className='text-center mt-10 text-3xl font-bold'>Pern Todo List</h1>
            <form className='w-1/2 flex justify-center gap-1' onSubmit={onSubmitForm}>
                <input type='text' className='border-2 focus:border-4 w-1/2 rounded-md' value={description} onChange={(e) => setDescription(e.target.value)} />
                <button className='bg-green-600 text-white px-4 py-1 rounded-md'>Add</button>
            </form>
        </div>
    )
}

export default InputTodo