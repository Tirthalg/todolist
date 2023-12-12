import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Foreground = ({ dtheme, changeTheme }) => {
    var text="black"
    if (dtheme) {
        text = 'white'
    }
    else {
        text = 'black'
    }
    const [todos, setTodos] = useState(() => {
        const localval = localStorage.getItem("ITEMS")
        if (localval == null) return [];
        return JSON.parse(localval)
    })
    const [newItem,setNewItem]  = useState("")

    useEffect(() => {
        localStorage.setItem("ITEMS",JSON.stringify(todos))
        localStorage.setItem("THEME",JSON.stringify(dtheme))
    },[todos,dtheme])

    function handleSubmit(e) {
        e.preventDefault()
        setTodos(currenttodos => {
            return[
                ...currenttodos,
                {
                    id: crypto.randomUUID(), title: newItem, completed: false
                }
            ]
        })
        setNewItem("")
    }
    function toggleCheck(id,completed){
        setTodos(currenttodos => {
            return currenttodos.map(todo => {
                if (todo.id === id) {
                    return  {...todo,completed}
                }
                return todo
            })
        })
    }
    function deleteTodo(id) {
        setTodos(currenttodos => {
            return currenttodos.filter(todo => todo.id !== id)
        })
    }
    console.log(todos)
    return (
        <div className="bg-transparent w-screen flex flex-wrap justify-center py-20	">
            <div className={`flex flex-wrap w-screen md:w-[700px] transition duration-300 justify-between px-10 text-${text}`}>
                <p className="text-3xl font-black w-10/12 grow">T O D O</p>
                <button className="  text-right" onClick={()=>changeTheme()}>
                    <FontAwesomeIcon icon={dtheme ? faMoon : faSun} size="xl"/>
                </button>
                <form onSubmit={handleSubmit} className='w-full flex flex-wrap justify-between text-white'>
                    <input
                        required
                        type="text"
                        className={`w-10/12 rounded-md p-4 text-lg my-8 bg-slate-800`}
                        placeholder='Create a new todo...'
                        value={newItem}
                        onChange={e=>setNewItem(e.target.value)}
                    />
                    <button
                        className={`w-[10%] h-14 rounded-md self-center bg-slate-800`}
                    >
                        <FontAwesomeIcon icon={faCircleRight} size='xl'/>
                    </button>
                </form>
                <div className='w-full py-6 '>
                    {todos.length === 0 && 
                        <div className='pt-10 text-3xl w-full text-center text-blue-600 font-black'>No Todos</div>
                    }
                    <div className={`rounded-md flex flex-wrap justify-between text-white bg-slate-800 shadow-xl`}>
                        {todos.map((todo,i) => (
                            <li className='w-full flex flex-wrap' key={todo.id}>
                                <input type='checkbox' className='w-1/12 h-5 self-center'
                                    checked={todo.completed}
                                    onChange={e=>toggleCheck(todo.id,e.target.checked)}
                                    />
                                <div className={`w-10/12 p-3 rounded-md grow text-justify ${todo.completed?'line-through text-slate-400':''}`}>{todo.title}</div>
                                <button className='w-[8%] h-8 self-center rounded-md' onClick={()=>deleteTodo(todo.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                                {!(i+1 === todos.length) && <hr className={`border-slate-500 h-[1] w-full`} />}
                            </li>
                        ))}        
                    </div>
                </div>
            </div>
        </div>
    )
}
