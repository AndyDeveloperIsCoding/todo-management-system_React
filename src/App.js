import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import TodoItem from './components/todoItem';

function App() {

  const [todoItems, setTodoItems] = useState(null);

  useEffect(() => {
    console.log("Hey, I have loaded up");

    if (!todoItems) {
      fetch('http://localhost:8080/api/todoItems').then((response) => response.json()
      ).then(data => {
        console.log("Todo items list: ", data);
        setTodoItems(data);
      });
    }

  }, [todoItems]);

  function addNewToDoItem(){
    fetch('http://localhost:8080/api/todoItems', {
      headers: {
        'content-type':'application/json',
      },
      method: 'POST',
    }).then(response => response.json())
    .then((aToDoItem) => {
      console.log(aToDoItem);
      setTodoItems([...todoItems, aToDoItem])
      
    });
  }

  function handleDeleteToDoItem(item) {
    const updatedTodoItems = todoItems.filter(aToDoItem => aToDoItem.id !== item.id);
    console.log('updated todo items', updatedTodoItems);
    setTodoItems([...updatedTodoItems]);
  }

  return (
    <>
      <p></p>
      <div align = "center"><button onClick={addNewToDoItem} >Add item</button></div>
      <p></p>
      <div align = "center">
        {todoItems ? todoItems.map((todoItem) => {
          return <TodoItem key={todoItem.id} data={todoItem} emitDeleteTodoItem={handleDeleteToDoItem}/>
        }) : 'Waiting for data to be loaded from the server...'}
      </div>

    </>
  );
}

export default App;
