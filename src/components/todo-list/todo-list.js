import React from "react";
import TodoListItem from "../todo-list-item/todo-list-item";
import "./todo-list.css";

const Todolist = ({todos, onDeleted, onToggleImportant ,onToggleDone}) => {
  const elements = todos.map((item, idx) => {
      const { id, ...itemProps } = item
      return (
          <li key={id} className="list-group-item">
              <TodoListItem { ...itemProps }
                   onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
              />
          </li>
      )
  })
    return (
        <div>
            <ul className="list-group todo-list mt-3">
                { elements }
            </ul>

        </div>


    )
}

export default Todolist;