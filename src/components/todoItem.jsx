import React, { useEffect, useState } from 'react';

const TodoItem = (props) => {

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

    return (
    <div align = "center">
      <>
        <input type="checkbox" checked={todoItem.isDone}
        onChange={updateIsDone} /> 
        <input type="text" value={todoItem.task} onChange={updateTask} />
        <br></br>
      </>
    </div>
    );
};

export default TodoItem;
