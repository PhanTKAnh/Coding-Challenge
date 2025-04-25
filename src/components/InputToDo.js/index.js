import { useRef } from "react";

function InputToDo({ dispatch, onSuccess }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.inputTodo.value;
    if (value) {
      dispatch({
        type: "CREATE",
        value: value,
      });
      inputRef.current.value = ""; 
      onSuccess();  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
    <label htmlFor="inputTodo" className="todo-form__label">Enter Task:</label>
    <input 
      ref={inputRef} 
      name="inputTodo" 
      id="inputTodo" 
      className="todo-form__input"
    />
    <button type="submit" className="todo-form__button">Add Task</button>
  </form>
  );
}

export default InputToDo;
  