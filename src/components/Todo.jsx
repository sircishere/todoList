import React, { useEffect, useRef, useState } from 'react'
// icon import
import todo_icon from '../assets/todo_icon.png'
// import todoitems component 
import TodoItems from './TodoItems'

const Todo = () => {

    //this line of code creates the variables to be used to store the todoitems in the local storage.
    //If there are no todo items created the variable todoList is set to an empty array
    const [todoList,setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []  )

    
    ///useRef is a react hook used to reference a value that isnt needed when rendering///
    //so use it when you want to declare a variable that has no value at first render of the web app/// 

        // Gets me the text from the todoItem input element

    const inputRef = useRef();


    const add = () => {
        // trims the etra spaces from the text on the todoItem input
        const inputText = inputRef.current.value.trim();


        //makes sure you cant create a todo item without text
        if (inputText === "") {
            return null;
        }


        // A new item is created with the text that was just inputed, todays date and marked as not completed
        const newTodo = {
            id: Date.now(), 
            text: inputText,
            isComplete: false,
        }

        ///Triple dot operator helps you copy previous array/object///
        ///It is used to copy the content of the array into a new variable without affecting the original array/object///

            //This is an arrow function with a parameter called prev, it returns whatever is inside prev 
            //and adds the newTodo. This is used to avoid altering previous states which is best practice in react
        setTodoList((prev) => [...prev, newTodo])

        //Makes the first input value when the web app is rendered to a blank space
        inputRef.current.value = "";
    }

    //Deleting a todoItem with the specified id

    const deleteTodo = (id) => {

        ///this time we have to do an arrow function inside another arrow function in order to delete the item///

        setTodoList((prvTodos)=>{

            //This returns an array that brings every todoItem on the list except for the one that
            //has the id equal to the one we're deleting

            return prvTodos.filter((todo) => todo.id !== id)

        })
    }
    
    //Toggles a  crossed out style to the specified todoItem
    const toggle = (id) => {

        //This code uses a map function to iterate through each item of the todoList
        //and it checks to see wheter its the item on the list the user chose to toggle
        //if so, it returns the todoItem object with its isComplete state inverted
        //and its other states are left intact

        setTodoList((prevTodo) => {
            return prevTodo.map((todo) => {
                if(todo.id === id) {
                    return {...todo,isComplete: !todo.isComplete}
                }

                return todo;
            })
        })

    }

    ///useEffect is used to synchronize an external system, in this case its synchronizing with the localstorage///
    ///it is called whenever the component rerenders by default///
        // in this case its called and saves a stringified copy of the todoList to a variable in the localStorage called todos
    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todoList))
    },[todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        {/* title */}

        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt=""/>
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

              {/* input box */}

              <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
                <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
              </div>

                            {/* ---------------- todo list -------------------- */}

        <div>
                {/* displays each item on the todoList */}
                {todoList.map((item, index) => {
                    
                    //gives all the parameters the todoItems need to be rendered, like the id and the functions required to delete and toggle
                    return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>

                })}
        </div>
    </div>
  )
}

export default Todo
