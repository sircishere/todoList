import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

///necessary imports and assets imported///

//parameters required to display the todoItem
const TodoItems = ({text, id, isComplete, deleteTodo,toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        {/* if the todoItem is clicked, call the toggle function to enable the crossed out style */}
        <div onClick={() => {toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img src={isComplete ? tick : not_tick} alt="" className='w-7'/>
            <p className={`text-slate-700 ml-4 text-[17px] flex-1 ${isComplete ? "line-through" : ""}`}> {text}</p>

            {/* if the delete icon is clicked, call the delete function */}
            <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt="" className='w-3.5 cursor-pointer'/>
        </div>
      
    </div>
  )
}

export default TodoItems
