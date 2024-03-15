import React from 'react'
import { Todo } from '../model';
import "../Styles/TodoList.css"
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
        todos: Todo[];
        setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
        doneTodos: Todo[];
        setIsDoneTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({ todos, setTodos, doneTodos, setIsDoneTodos } : Props) => {
    return(
         <div className="container">
            <Droppable droppableId="TodoList">
            {(provided) => (
            <div className="todos" ref={provided.innerRef}{...provided.droppableProps}>
            <span className="todosHeading">Current Tasks</span>
            {
                todos.map((todo, index) => (
                    <SingleTodo
                    index={index}
                    todo={todo}
                    todos={todos}
                    key={todo.id} 
                    setTodos={setTodos}
                    />
                ))}
            </div>
                )}
            </Droppable>
            
            <Droppable droppableId="DoneTodos">
                {(provided)=>(
            <div className="todos delete" ref={provided.innerRef}{...provided.droppableProps}>
            <span className="todosHeading">Completed</span>
            {
                doneTodos.map((todo, index) => (
                    <SingleTodo
                    index={index}
                    todo={todo}
                    todos={doneTodos}
                    key={todo.id}
                    setTodos={setIsDoneTodos}/>
                ))}
            </div>     
                    )}  
            </Droppable>
         </div>
    );
};

export default TodoList;
