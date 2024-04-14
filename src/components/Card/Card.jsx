import { useState, useEffect } from "react";
import { Avatar, Tooltip } from 'antd';
import { Draggable } from "react-beautiful-dnd";
import { showCardModal } from '../../store/cardModalSlice';
import { useDispatch } from 'react-redux'
import { getDatabase, ref, onValue } from "firebase/database";

import "./Card.sass";

export default function Card({ task, index }) {
    const dispatch = useDispatch();
    const db = getDatabase();

    const [author, setAuthor] = useState('');
    const [executor, setExecutor] = useState('');
    const [client, setClient] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientCarModel, setClientCarModel] = useState('');
    const [clientCarNumber, setClientCarNumber] = useState('');

    const slicedAuthor = author.replace(/(.)+ (.).+ (.).+/, '$2$3')
    const slicedExecutor = executor.replace(/(.)+ (.).+ (.).+/, '$2$3')

    useEffect(() => {
        const fetchExecutor = ref(db, `employees/employee_${task.executor_id}`);
        onValue(fetchExecutor, (snapshot) => {
            const data = snapshot.val();
            if (data) setExecutor(data.full_name)
        });

        const fetchAuthor = ref(db, `employees/employee_${task.author_id}`);
        onValue(fetchAuthor, (snapshot) => {
            const data = snapshot.val();
            if (data) setAuthor(data.full_name)
        });

        const fetchClient = ref(db, `clients/client_${task.client_id}`);
        onValue(fetchClient, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setClient(data.name);
                setClientPhone(data.phone);
                setClientCarModel(data.model);
                setClientCarNumber(data.number);
            }
        });
    }, [db, task.executor_id, task.author_id, task.client_id]);

    const modalData = [task.id, client, task.date, task.title, author, executor, clientPhone, task.description, clientCarModel, clientCarNumber.toLowerCase(), task.status]

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided) => (
                <div
                    className="card"
                    onClick={() => dispatch(showCardModal(modalData))}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="card__top card-top top">
                        <span className="card-top__id card-top-id">
                            #{task.id}
                        </span>
                        <div className="top__wrap top-wrap">
                            <span className="top-wrap__title top-wrap-title">
                                {task.title}
                            </span>
                            <span>от</span>
                            <span className="top-wrap__date top-wrap-date">
                                {task.date}
                            </span>
                        </div>
                    </div>
                    <div className="card__client card-client client">
                        <span className="client__name client-name">
                            {client}
                        </span>
                        <div className="client__car client-car">
                            <span className="client-car__model client-car-model">
                                {clientCarModel}
                            </span>
                            <span className="client-car__number client-car-number">
                                {clientCarNumber.toLowerCase()}
                            </span>
                        </div>
                    </div>
                    <div className="card__bottom card-bottom bottom">
                        <Tooltip title={author} placement="right"  mouseEnterDelay="0.5">
                            <Avatar className="bottom__avatar bottom-avatar" shape="square">
                                {slicedAuthor}
                            </Avatar>
                        </Tooltip>
                        <Tooltip title={executor} placement="left"  mouseEnterDelay="0.5">
                            <Avatar className="bottom__avatar bottom-avatar" shape="square">
                                {slicedExecutor}
                            </Avatar>
                        </Tooltip>
                    </div>
                </div>
            )}
        </Draggable>
    );
}