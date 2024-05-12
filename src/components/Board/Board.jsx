import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { getDatabase, ref, update } from "firebase/database";

import "./Board.sass"

export default function Board({authorId, executorId, searchedContent}) {
    const db = getDatabase();

    const [incomplete, setIncomplete] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [atWork, setAtWork] = useState([]);

    useEffect(() => {
        if (authorId && executorId) {
            setIncomplete(searchedContent.filter(task => task.status === 1 && task.author_id === authorId  && task.executor_id === executorId))
            setAtWork(searchedContent.filter(task => task.status === 2 && task.author_id === authorId  && task.executor_id === executorId))
            setCompleted(searchedContent.filter(task => task.status === 3 && task.author_id === authorId  && task.executor_id === executorId))
        } else if (authorId) {
            setIncomplete(searchedContent.filter(task => task.status === 1 && task.author_id === authorId))
            setAtWork(searchedContent.filter(task => task.status === 2 && task.author_id === authorId))
            setCompleted(searchedContent.filter(task => task.status === 3 && task.author_id === authorId))
        } else if (executorId){
            setIncomplete(searchedContent.filter(task => task.status === 1 && task.executor_id === executorId))
            setAtWork(searchedContent.filter(task => task.status === 2 && task.executor_id === executorId))
            setCompleted(searchedContent.filter(task => task.status === 3 && task.executor_id === executorId))
        } else {
            setIncomplete(searchedContent.filter(task => task.status === 1))
            setAtWork(searchedContent.filter(task => task.status === 2))
            setCompleted(searchedContent.filter(task => task.status === 3))
        }
    }, [authorId, executorId, searchedContent]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...atWork, ...completed]);

        setNewState(destination.droppableId, task);

        const updatedTask = {
            ...task,
            status: Number(destination.droppableId)
        };

        const updates = {};
        updates[`tasks/task_${task.id}`] = updatedTask;
        update(ref(db), updates);
    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setAtWork(removeItemById(taskId, atWork));
                break;
            case "3":
                setCompleted(removeItemById(taskId, completed));
                break;
            default:
                break;
        }

    }
    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // НЕРАЗОБРАННЫЕ
                updatedTask = { ...task, appointment: false };
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2":  // В РАБОТЕ
                updatedTask = { ...task, appointment: false };
                setAtWork([updatedTask, ...atWork]);
                break;
            case "3":  // ВЫПОЛНЕН
                updatedTask = { ...task, appointment: false };
                setCompleted([updatedTask, ...completed]);
                break;
            default:
                break;
        }
    }
    function findItemById(id, array) {
        return array.find((item) => item.id === Number(id));
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id !== Number(id));
    }

    return (
        <DragDropContext className="board" onDragEnd={handleDragEnd}>
            <div className="board__container board-container">
                <Column title={"Неразобранные"} tasks={incomplete} id={"1"} />
                <Column title={"В работе"} tasks={atWork} id={"2"} />
                <Column title={"Выполнен"} tasks={completed} id={"3"} />
            </div>
        </DragDropContext>
    );
}