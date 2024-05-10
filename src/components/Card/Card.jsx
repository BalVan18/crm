import { useState, useEffect } from "react";
import { Avatar, Tooltip } from 'antd';
import { Draggable } from "react-beautiful-dnd";
import { showCardModal } from '../../store/cardModalSlice';
import {useDispatch, useSelector} from 'react-redux';

import "./Card.sass";

export default function Card({ task, index }) {
    const dispatch = useDispatch();

    const dataFromDb = useSelector((state) => state.bd);

    const [authorName, setAuthorName] = useState('');
    const [executorName, setExecutorName] = useState('');
    const [clientData, setClientData] = useState({name: '',phone: '', model: '',number: ''});

    const slicedAuthorName = authorName.replace(/(.)+ (.).+ (.).+/, '$2$3')
    const slicedExecutorName = executorName.replace(/(.)+ (.).+ (.).+/, '$2$3')

    useEffect(() => {
        const executor = dataFromDb.employees.filter(employee => employee.id === task.executor_id)[0];
        const author = dataFromDb.employees.filter(employee => employee.id === task.author_id)[0];
        const client = dataFromDb.clients.filter(client => client.id === task.client_id)[0];

        if (executor) setExecutorName(executor.full_name)
        if (author) setAuthorName(author.full_name)
        if (client) setClientData(client)
    }, [task.executor_id, task.author_id, task.client_id, dataFromDb.employees, dataFromDb.clients]);

    const modalData = [task.id, clientData.name, task.date, task.title, authorName, executorName, clientData.phone, task.description, clientData.model, clientData.number.toLowerCase(), task.status, task.priority]

    const classes = () => {
        if (task.priority === 'высокий') {
            return 'card--critical'
        } else if (task.priority === 'низкий') {
             return 'card--normal'
        } else {
             return 'card--serious'
        }
    }

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided) => (
                <div
                    className={`card ${classes()}`}
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
                            {clientData.name}
                        </span>
                        <div className="client__car client-car">
                            <span className="client-car__model client-car-model">
                                {clientData.model}
                            </span>
                            <span className="client-car__number client-car-number">
                                {clientData.number}
                            </span>
                        </div>
                    </div>
                    <div className="card__bottom card-bottom bottom">
                        <Tooltip title={authorName} placement="right"  mouseEnterDelay="0.5">
                            <Avatar className="bottom__avatar bottom-avatar" shape="square">
                                {slicedAuthorName}
                            </Avatar>
                        </Tooltip>
                        <Tooltip title={executorName} placement="left"  mouseEnterDelay="0.5">
                            <Avatar className="bottom__avatar bottom-avatar" shape="square">
                                {slicedExecutorName}
                            </Avatar>
                        </Tooltip>
                    </div>
                </div>
            )}
        </Draggable>
    );
}