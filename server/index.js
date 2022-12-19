const express = require ("express");
const app = express();
const cors =require("cors");
const client = require("./db");
const { restart } = require("nodemon");

// middleware
app.use(cors());
app.use(express.json()); //req body
// Routes
app.get("/",(req,res)=>{
    res.send("okkkkkkkkkkkkkkkkkkk");
})

// create a Todo
app.post("/todos",async(req,res)=>{
    // await
    try {
        const{decription} = req.body;
        const newTodo = await client.query("Insert INTO todo (decription) VALUES($1) RETURNING * ",[decription]);
        console.log(decription);
        console.log(newTodo);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.send(err);
        
    }
});
//get all todos

app.get("/todos", async (req, res) => {
    try {
      const allTodos = await client.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get a todo
  
  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await client.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a todo
  
  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { decription } = req.body;
      const updateTodo = await client.query(
        "UPDATE todo SET decription = $1 WHERE todo_id = $2",
        [decription, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await client.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message); 
    }
  });

app.listen(5000,()=>{
    console.log("started the app");

});