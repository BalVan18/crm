import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { getDatabase, ref, onValue } from "firebase/database";

import "./Board.sass"

export default function Board() {
    const [zapis, setZapis] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [atWork, setAtWork] = useState([]);

    // useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/todos")
    //     .then((response) => response.json())
    //     .then((json) => {
    //         setAppointment(json.filter((task) => task.appointment));
    //         setIncomplete(json.filter((task) => !task.appointment));
    //     });

    // }, []);

    const db = getDatabase();
    const fetchTasks = ref(db, 'tasks/');
    onValue(fetchTasks, (snapshot) => {
        const data = snapshot.val();
        // setAppointment(data.map((task) => task.appointment));
        for (let task in data) {
            if (task.status === 1) {
                setIncomplete(task)
                console.log(task)
            } 
        }
        // setIncomplete(data.map((task) => task));
        console.log(data)
    });

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...zapis, ...atWork, ...completed]);

        setNewState(destination.droppableId, task);

    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setZapis(removeItemById(taskId, zapis));
                break;
            case "3":
                setAtWork(removeItemById(taskId, atWork));
                break;
            case "4":
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
            case "2":  // ЗАПИСЬ
                updatedTask = { ...task, appointment: false };
                setZapis([updatedTask, ...zapis]);
                break;
            case "3":  // В РАБОТЕ
                updatedTask = { ...task, appointment: false };
                setAtWork([updatedTask, ...atWork]);
                break;
            case "4":  // ВЫПОЛНЕН
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
            {/* <h2 className="board__title board-title">Задачи</h2> */}

            <div className="board__container board-container">
                <Column title={"Неразобранные"} tasks={incomplete} id={"1"} />
                <Column title={"Запись"} tasks={zapis} id={"2"} />
                <Column title={"В работе"} tasks={atWork} id={"3"} />
                <Column title={"Выполнен"} tasks={completed} id={"4"} />
            </div>
        </DragDropContext>
    );
}