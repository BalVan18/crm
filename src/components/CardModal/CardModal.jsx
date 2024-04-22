import { useState, useEffect } from "react";
import { Modal, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { closeCardModal } from '../../store/modalSlice'
import {ref, update, getDatabase} from "firebase/database";

import "./CardModal.sass";

export default function CardModal() {
    const modalData = useSelector((state) => state.modal.card)
    const db = getDatabase();
    const dispatch = useDispatch()
    const dataFromDb = useSelector((state) => state.bd);

    const [task, setTask] = useState({});
    const [executorId, setExecutorId] = useState(null);
    const [status, setStatus] = useState(modalData.info.status);

    useEffect(() => {
        const task = dataFromDb.tasks.filter(task => task.id === modalData.info.id)[0];
        setTask(task);
    }, [modalData.info.id, dataFromDb.tasks]);
    
    const handleChangeExecutor = (e) => {
        const currentExecutor = dataFromDb.employees.filter(executor => executor.full_name === e)[0];
        setExecutorId(currentExecutor.id);
    }

    const handleChangeStatus = (e) => {
        setStatus(e)
    }

    const okHandler = () => {
        let updatedTask = {...task}

        if (status && executorId) {
            updatedTask = {
                ...task,
                executor_id: executorId,
                status: status
            }
        } else if (executorId) {
           updatedTask = {
                ...task,
                executor_id: executorId
            }
        } else if (status) {
            updatedTask = {
                ...task,
                status: status
            }
        }

        const updates = {};
        updates[`tasks/task_${modalData.info.id}`] = updatedTask;
        update(ref(db), updates);
        dispatch(closeCardModal());

        // TODO для Ванька вывести в этой мадолке дату и приоритет
    }

    return (
        <Modal title={modalData.info.title} className='card-modal' open={modalData.visible} onCancel={() => dispatch(closeCardModal())} centered footer={null}>
            <div className="card-modal__status card-modal-status status">
                <h4 className="status__title status-title">Статус</h4>
                <Select
                    className="status__select status-select"
                    onChange={handleChangeStatus}
                    defaultValue={modalData.info.convertedStatus}
                    key={modalData.info.convertedStatus}
                    options={[
                        { value: 1, label: 'НЕРАЗОБРАННЫЕ' },
                        { value: 2, label: 'ЗАПИСЬ' },
                        { value: 3, label: 'В РАБОТЕ' },
                        { value: 4, label: 'ВЫПОЛНЕН' },
                    ]}
                />
            </div>
            <div className="card-modal__wrap">
                <div className="card-modal__client card-modal-client client">
                    <div className='client__name client-name'>
                        <h4 className='client-name__title client-name-title'>Клиент</h4>
                        <span className='client-name__text client-name-text'>{modalData.info.client}</span>
                    </div>
                    <div className='client__phone client-phone'>
                        <h4 className='client-phone__title client-phone-title'>Телефон</h4>
                        <span className='client-phone__text client-phone-text'>{modalData.info.clientPhone}</span>
                    </div>
                </div>
                <div className="card-modal__car card-modal-car car">
                    <div className="car__model car-model">
                        <h4 className='car-model__title car-model-title'>Автомобиль</h4>
                        <span className='car-model__text car-model-text'>{modalData.info.model}</span>
                    </div>
                    <div className="car__number car-number">
                        <h4 className='car-number__title car-number-title'>Гос. номер</h4>
                        <span className='car-number__text car-number-text'>{modalData.info.number}</span>
                    </div>
                </div>
            </div>
            <div className="card-modal__responsible card-modal-responsible responsible">
                <div className="responsible__author responsible-author">
                    <h4 className="responsible-author__title responsible-author-title">Автор</h4>
                    <span className="responsible-author__text responsible-author-text">{modalData.info.author}</span>
                </div>
                <div className="responsible__executor responsible-executor">
                    <h4 className="responsible-executor__title responsible-executor-title">Исполнитель</h4>
                    <Select
                        className="responsible-executor__select responsible-executor-select"
                        onChange={handleChangeExecutor}
                        defaultValue={modalData.info.executor}
                        options={dataFromDb.employees.map(executor => ({value: executor.full_name, label: executor.full_name}))}
                    />
                </div>
            </div>
            <div className="card-modal__description card-modal-description description">
                <h4 className="description__title description-title">Причина обращения</h4>
                <span className='description__text description-text'>{modalData.info.description}</span>
            </div>
            <Button className="card-modal__btn" onClick={() => okHandler()} type="primary" size="large">Сохранить</Button>
        </Modal >
    )
}