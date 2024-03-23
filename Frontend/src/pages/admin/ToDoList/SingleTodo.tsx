import React, { useEffect, useRef, useState } from 'react'
import { Todo } from './model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import "../../../styles/SingleTodo.css"
import { JSX } from 'react/jsx-runtime'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    todo:Todo;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

  const SingleTodo = ({index ,todo, todos, setTodos}: Props) => {
  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);  
  
  const handleDone = (id:number) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
  };

  const handleDelete = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  };
  const handleEdit = (e:React.FormEvent, id:number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => todo.id === id ? {...todo, todo: editTodo} : todo))
    setEdit(false);
  };
  
  const focusOnClick = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusOnClick.current?.focus();
  }, [edit]);
  
  return (
    <Draggable draggableId ={todo.id.toString()} index={index}>
      {
        (provided)=> (
          <form className="todosSingle" onSubmit={(e)=>handleEdit(e,todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
      {
        edit? (
          <input 
          ref = {focusOnClick}
          value={editTodo}
           onChange={(e) => setEditTodo(e.target.value)} 
          className="todosSingleText" />
        ) : todo.isDone? (
          <s className="todosSingleText">{todo.todo}</s>
        ) : (
          <span className="todosSingleText">{todo.todo}</span>
        )
      }
      
      <div id = "allIcons">
        <span className="icons" onClick={() => {
          if(!edit && !todo.isDone){
            setEdit(!edit)
        }
      }}><AiFillEdit/></span>
        <span className="icons" onClick={()=>handleDelete(todo.id)}><AiFillDelete/></span>
        <span className="icons" onClick={()=>handleDone(todo.id)}><MdDone/></span>
      </div>
    </form>
      )
        }
    </Draggable>
  );
};

export default SingleTodo;
