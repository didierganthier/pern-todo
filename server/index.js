const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

// middleware
app.use(cors());
app.use(express.json()); //req.body

// ROUTES //

// create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]); 
    } catch (error) {
        console.error(error.message)
    }
})

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        )
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        )
        res.json(todo.rows[0])
    } catch (error) {
        
    }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo was updated");
    } catch (error) {
        
    }
})

// delete a todo 
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo was deleted")
    } catch (error) {
        
    }
})

app.listen(3004, () => {
    console.log("server has started on port 3004");
})