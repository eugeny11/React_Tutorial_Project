import React, {useEffect} from 'react'
import './index.css'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddToDo = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./Todo/AddToDo'))
      }, 3000)
    })
)

function App() {

  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((response) => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        },2000)
      })
  }, [])

  function toggleTodo(id){
    setTodos(todos.map(todo => {
      if (todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  function removeToDo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addToDo(title){
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])
    )
  }

  return (
    <Context.Provider value={{removeToDo}}>
      <div className='wrapper'>
        <h1>React tutorial</h1>
        <Modal />
        <React.Suspense fallback={<Loader />}>
          <AddToDo onCreate={addToDo}/>
        </React.Suspense>
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}/> : loading ? null : <p>No todos</p>}
        
      </div>
    </Context.Provider>
  );
}

export default App;
