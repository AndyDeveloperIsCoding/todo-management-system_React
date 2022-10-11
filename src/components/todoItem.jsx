import React, { useEffect, useState } from 'react';

const TodoItem = (props) => {
    const {emitDeleteTodoItem} = props;

    const [todoItem, setTodoItem] = useState(props.data);
    function updateIsDone() {
        setModified(true);
        setTodoItem({...todoItem, isDone: !todoItem.isDone});
    }

    const [isModified, setModified] = useState(false);

    useEffect(() => {
        if(isModified){
        fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(todoItem),
        }).then(response => response.json()).then(data => {
            setModified(false);
            setTodoItem(data);
        });
        console.log("Hey, the todo item has just changed", todoItem)
    }
    }, [todoItem, isModified]);

    function updateTask(event){
        setModified(true);
        setTodoItem({...todoItem, task: event.target.value});
    }

    function deleteToDoItem(){
        fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then((response) => {
            emitDeleteTodoItem(todoItem);
        });
    }

    return (
        // align = "center"
    <div >
      <>
        <input type="checkbox" checked={todoItem.isDone}
        onChange={updateIsDone} /> 
        {
            todoItem.isDone ? <span style={{textDecoration:'line-through'}}>{todoItem.task}</span> : <input type="text" value={todoItem.task} onChange={updateTask} />
        }
        <span style={{marginLeft: "1rem", cursor: "pointer"}} 
        onClick={deleteToDoItem}>🗑️</span>
      </>
    </div>
    );
};

export default TodoItem;
