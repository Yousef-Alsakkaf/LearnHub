import { useState } from "react";
import "../../../styles/App22.css"
import InputField from "./InputField";
import {Todo} from "./model"
import TodoList from "./ToDoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTodos, setIsDoneTodos] = useState<Todo[]>([]); 
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id:Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  };

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;

    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
       <div className="App">
      <span className="heading">MY TASKS</span>
      <InputField todo={todo} setTodo = {setTodo} handleAdd = {handleAdd}/>
      <TodoList 
      todos = {todos}
      setTodos = {setTodos}
      doneTodos = {doneTodos} 
      setIsDoneTodos = {setIsDoneTodos}
      />
      </div>
    </DragDropContext>
   
  );
};
export default App;