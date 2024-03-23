import React, { useEffect } from 'react'
import { Todo } from './model';
import "../../../styles/TodoList.css"
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
        todos: Todo[];
        setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
        doneTodos: Todo[];
        setIsDoneTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({ todos, setTodos } : Props) => {
        
    return(
         <div className="container">
            <Droppable droppableId="TodossListtt">
            {(provided) => (
            <div className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}>
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
                {provided.placeholder}
            </div>
                )}
            </Droppable>
            
           
            
         </div>
    );
};

export default TodoList;
