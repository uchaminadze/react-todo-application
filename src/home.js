import React, { useContext } from 'react'
import TodoItem from './components/TodoItem';
import TodoItemOptions from './components/TodoItemOptions';
import TodosContext from './todoContext';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const { todos, setTodos, todoInputRef } = useContext(TodosContext);

    const handleAddNewTodo = (e) => {
        e.preventDefault();

        if (todoInputRef.current.value.trim() !== "") {
            setTodos(prevState => [
                ...prevState,
                {
                    id: Date.now(),
                    text: todoInputRef.current.value,
                    checked: false,
                    isHovered: false,
                    isDoubleClicked: false
                }
            ])

            setTimeout(() => {
                todoInputRef.current.value = "";
            }, 50)

            return toast.success("Todo created", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 800,
                transition: Slide
            });
        }

        return toast.warning("Input can't be empty !", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 800,
            transition: Slide
        });
    }

    const handleToggleTodoItems = () => {
        const checkAllItems = todos.map((el) => {
            return {...el, checked: !todos.every(el => el.checked)}
        })

        setTodos(checkAllItems)
    }

    return (
        <div className='main__container'>
            <h2>todos</h2>
            <form onSubmit={handleAddNewTodo} className="add__new__todo">
                {todos.length > 0 && 
                <div onClick={handleToggleTodoItems} className="angle__down__arrow">
                    <span className={`angle__down__arrow__left ${todos.every(el => el.checked) && `no__active__items`}`}></span>
                    <span className={`angle__down__arrow__right ${todos.every(el => el.checked) && `no__active__items`}`}></span>
                </div>
                }
                <input type="text" name="todo-input" id="todo-input" ref={todoInputRef} placeholder="What needs to be done?" className="todo__input" />
            </form>
            <div className="todo__items">
                <TodoItem />
                <TodoItemOptions />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home;