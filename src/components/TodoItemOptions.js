import React, { useContext } from 'react'
import TodosContext from '../todoContext';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoItemOptions = () => {
    const { todos, setTodos, category, setCategory, CATEGORY_FILTER } = useContext(TodosContext);

    const handleClearCompletedTodos = () => {
        const clearCompletedItems = todos.filter((el) => {
            if( el.checked ) {
                return !el
            }

            return el
        })

        setTodos(clearCompletedItems)

        toast.success("Completed todos cleared", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 800,
            transition: Slide
        });
    }

    return (
        <>
            {Boolean(todos.length) && <div className="todo__item__options">
                <span>{todos.filter(el => !el.checked).length} item{todos.filter(el => !el.checked).length === 1 ? "" : "s"} left</span>
                <div className="todo__item__options__categories">

                    {Object.keys(CATEGORY_FILTER).map((el, index) => {
                        return <button onClick={() => setCategory(el)} className={`${category === el && "active__category"}`} key={index}>{el}</button>
                    })}
                    
                </div>
                <div className="clear__completed__todo__items__container">
                    <button className={`${todos.every(el => !el.checked) && `no__clickable`}`} onClick={handleClearCompletedTodos}>{todos.some(el => el.checked) ? "Clear completed" : ""}</button>
                </div>
            </div>}
        </>
    )
}

export default TodoItemOptions;