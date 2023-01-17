import React, { useContext, useEffect } from 'react';
import TodosContext from '../todoContext';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoItem = () => {
    const { todos, setTodos, CATEGORY_FILTER, category, todoItemInputRef } = useContext(TodosContext);
    
    const handleCheckboxClick = (id, item) => {
        const updateCheckedStatus = todos.map((el) => {
            return {...el, checked: el.id === id ? !el.checked : el.checked}
        })
        setTodos(updateCheckedStatus);
    }

    const handleRemoveTodoItem = (id) => {
        const removeItem = todos.filter((el) => el.id !== id)

        setTodos(removeItem)

        toast.success("Todo removed", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 800,
            transition: Slide
        });
    }

    const handleOnMouseOver = (id) => {
        const hoverOnItem = todos.map((el) => {
            return {...el, isHovered: el.id === id}
        })

        setTodos(hoverOnItem)
    }

    const handleOnMouseOut = () => {
        const hoverOffItem = todos.map((el) => {
            return {...el, isHovered: false}
        })

        setTodos(hoverOffItem)
    }

    const handleUpdateTodoItemText = (e, id) => {
        e.preventDefault();

        const removeItem = todos.filter((el) => el.id !== id)

        const updateItemText = todos.map((el) => {
            return { ...el, isDoubleClicked: false, text: el.id === id ? todoItemInputRef.current.value : el.text }
        })

        setTodos(todoItemInputRef.current.value.trim() === "" ? removeItem : updateItemText)

        if(todoItemInputRef.current.value.trim() === ""){
            return toast.success("Todo removed", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 800,
                transition: Slide
            });
        }

        return toast.success("Todo updated", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 800,
            transition: Slide
        });
    }

    const handleOnDoubleClick = (id) => {
        const doubleClickItem = todos.map((el) => {
            return {...el, isDoubleClicked: el.id === id}
        })

        setTodos(doubleClickItem)
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (todoItemInputRef.current && !todoItemInputRef.current.contains(e.target)) {
                setTodos(prevState => 
                    prevState.map((el) => {
                        return {...el, isDoubleClicked: false}
                    })
                )
            }
        }

        document.addEventListener('click', handleOutsideClick)
    }, [setTodos, todoItemInputRef])

    return (
        <>
            {todos.filter(CATEGORY_FILTER[category]).map((el) => {
                return (
                    <div key={el.id} onMouseOver={() => handleOnMouseOver(el.id)} onMouseOut={() => handleOnMouseOut()} onDoubleClick={() => handleOnDoubleClick(el.id)} className={`todo__item ${(el.checked && `item__overline`) || (el.isDoubleClicked && `is__double__clicked`)}`}>
                        {el.isDoubleClicked ?
                            <form onSubmit={(e) => handleUpdateTodoItemText(e, el.id)}>
                                <input defaultValue={el.text} autoFocus className="todo__item__input" ref={todoItemInputRef} type="text" />
                            </form>
                            :
                            <>
                                <label className="container">
                                    <input type="checkbox" checked={el.checked} readOnly />
                                    <span className="checkmark" onClick={() => handleCheckboxClick(el.id, el)}></span>
                                </label>
                                <p className="item__text">{el.text}</p>
                            </>
                        }
                        <div className={`item__remove ${el.isHovered && !el.isDoubleClicked && `is__hover`}`} onClick={() => handleRemoveTodoItem(el.id)}>
                            <span className="item__remove__left"></span>
                            <span className="item__remove__right"></span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default TodoItem;