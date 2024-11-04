import React from 'react'
import Todo from './components/Todo'

const App = () => {
  return (
    // styles are being handled using tailwind classses
    <div className='bg-stone-900 grid py-4 min-h-screen'>
      {/* Todo component is called which is where everything involving the todo list is coded */}
      <Todo/>
    </div>
  )
}

export default App
