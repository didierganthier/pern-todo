import './App.css';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import './index.css'

export default function App() {
  return (
    <>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </>
  )
}
