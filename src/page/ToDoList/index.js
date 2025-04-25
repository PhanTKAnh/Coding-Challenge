import { useState, useReducer, useEffect } from "react";
import { dataTasks } from "../../model/data";
import { todoReducer } from "../../reducers/ToDoReducer";
import FilterTask from "../../components/FilterTask";
import InputToDo from "../../components/InputToDo.js/index.js";
import TableToDo from "../../components/TableTodo.js";
import ModalEdit from "../../components/ModalEdit/index.js";

function ToDoList() {
    const initTasks = () => {
        const saved = localStorage.getItem("todoList");
        return saved ? JSON.parse(saved) : dataTasks;
    };

    const [todos, dispatch] = useReducer(todoReducer, [], initTasks);
    const [filteredData, setFilteredData] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const headers = [
        { key: "index", label: "No." },
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
    ];

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todos));
    }, [todos]);

    const onStatusToggle = (id, currentStatus) => {
        const updatedTasks = todos.map(task =>
            task.id === id
                ? { ...task, status: currentStatus === "complete" ? "incomplete" : "complete" }
                : task
        );
        dispatch({ type: "SET_ALL", payload: updatedTasks });

        if (filteredData !== null) {
            const updatedFiltered = updatedTasks.filter(t => t.status === filteredData[0]?.status);
            setFilteredData(updatedFiltered);
        }
    };

    const handleStatusChange = (status) => {
        setFilteredData(status ? todos.filter(task => task.status === status) : null);
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE", id });
        if (editingId === id) setEditingId(null);
    };

    const handleEditTask = (id, newTitle) => {
        dispatch({ type: "EDIT", id, newTitle });
        setEditingId(null);
    };

    const toggleInput = () => setShowInput(prev => !prev);
    const handleSuccess = () => setShowInput(false);

    const actions = [
        {
            label: "Edit",
            className: "edit",
            onClick: (item) => {
                setEditingId(item.id);
                setEditTitle(item.title);
            },
        },
        {
            label: "Delete",
            className: "delete",
            onClick: (item) => handleDelete(item.id),
        },
       
    ];

    return (
        <div className="container">
            <div className="container-task">
                <FilterTask onStatusChange={handleStatusChange} />

                <div className="task-create">
                    {!showInput && (
                        <button className="task-create-btn" onClick={toggleInput}>
                            Add Task
                        </button>
                    )}
                    {showInput && (
                        <InputToDo dispatch={dispatch} onSuccess={handleSuccess} />
                    )}
                </div>

                <TableToDo
                    currentData={filteredData || todos}
                    headers={headers}
                    startIndex={0}
                    onStatusToggle={onStatusToggle}
                    onEditTask={handleEditTask}
                    editingId={editingId}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    setEditingId={setEditingId}
                    actions={actions}
                />
            </div>

            <ModalEdit
                isOpen={editingId !== null}
                onClose={() => setEditingId(null)}
                onSave={() => handleEditTask(editingId, editTitle)}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
            />
        </div>
    );
}

export default ToDoList;
