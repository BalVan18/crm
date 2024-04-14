import { useState, useEffect } from "react";
import { Modal, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { closeCardModal } from '../../store/cardModalSlice'
import { getDatabase, ref, onValue, update } from "firebase/database";

import "./CardModal.sass";


export default function CardModal() {
    const cardModalState = useSelector((state) => state.cardModal[0].visible)
    const modalData = useSelector((state) => state.cardModal[0].info)
    const dispatch = useDispatch()
    const db = getDatabase();

    const convertStatusToString = (initialStatus) => {
        switch (initialStatus) {
            case 1:
                return 'НЕРАЗОБРАННЫЕ'
            case 2:
                return 'ЗАПИСЬ'
            case 3:
                return 'В РАБОТЕ'
            case 4:
                return 'ВЫПОЛНЕН'    
            default:
                break;
        };
    }

    const [task, setTask] = useState({});
    const [executorNames, setExecutorNames] = useState([]);
    const [executorId, setExecutorId] = useState(null);
    const [status, setStatus] = useState(modalData.status);
    const [currentStatus, setCurrentStatus] = useState(convertStatusToString(modalData.status));

    useEffect(() => {
        const fetchExecutors = ref(db, 'employees/');
        onValue(fetchExecutors, (snapshot) => {
            const data = snapshot.val();
            let executorsArr = [];
            for (let executor in data) {
                executorsArr.push(data[executor])
            }
            let executorsNames = executorsArr.map(executor => executor.full_name)
            setExecutorNames(executorsNames)
        });

        const fetchTask = ref(db, `tasks/task_${modalData.id}`);
        onValue(fetchTask, (snapshot) => {
            const data = snapshot.val();
            setTask(data);
            if (data) {
                setStatus(data.status);

            } else {
                setStatus(modalData.status);
            }
        });
    }, [db, modalData.id, modalData.status]);

    useEffect(() => {
        setCurrentStatus(convertStatusToString(modalData.status))
    }, [modalData.status])
    
    const handleChangeExecutor = (e) => {
        const fetchExecutors = ref(db, 'employees/');
        onValue(fetchExecutors, (snapshot) => {
            const data = snapshot.val();
            let executorsArr = [];
            for (let executor in data) {
                executorsArr.push(data[executor])
            }
            const currentExecutor = executorsArr.filter(executor => executor.full_name === e);
            setExecutorId(currentExecutor[0].id);
        });
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
        updates[`tasks/task_${modalData.id}`] = updatedTask;
        update(ref(db), updates);
        dispatch(closeCardModal());         
    }

    const handleChangeStatus = (e) => {
        setStatus(e)
    }

    return (
        <Modal title={modalData.title} className='card-modal' open={cardModalState} onCancel={() => dispatch(closeCardModal())} centered footer={null}>
            <div className="card-modal__status card-modal-status status">
                    <h4 className="status__title status-title">Статус</h4>
                    <Select
                        className="status__select status-select"
                        onChange={handleChangeStatus}
                        defaultValue={currentStatus}
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
                        <span className='client-name__text client-name-text'>{modalData.client}</span>
                    </div>
                    <div className='client__phone client-phone'>
                        <h4 className='client-phone__title client-phone-title'>Телефон</h4>
                        <span className='client-phone__text client-phone-text'>{modalData.clientPhone}</span>
                    </div>
                </div>
                <div className="card-modal__car card-modal-car car">
                    <div className="car__model car-model">
                        <h4 className='car-model__title car-model-title'>Автомобиль</h4>
                        <span className='car-model__text car-model-text'>{modalData.model}</span>
                    </div>
                    <div className="car__number car-number">
                        <h4 className='car-number__title car-number-title'>Гос. номер</h4>
                        <span className='car-number__text car-number-text'>{modalData.number}</span>
                    </div>
                </div>
            </div>
            <div className="card-modal__responsible card-modal-responsible responsible">
                <div className="responsible__author responsible-author">
                    <h4 className="responsible-author__title responsible-author-title">Автор</h4>
                    <span className="responsible-author__text responsible-author-text">{modalData.author}</span>
                </div>
                <div className="responsible__executor responsible-executor">
                    <h4 className="responsible-executor__title responsible-executor-title">Исполнитель</h4>
                    <Select
                        className="responsible-executor__select responsible-executor-select"
                        onChange={handleChangeExecutor}
                        defaultValue={modalData.executor}
                        options={executorNames.map(name => ({value: name, label: name}))}
                    />
                </div>
            </div>
            <div className="card-modal__description card-modal-description description">
                <h4 className="description__title description-title">Причина обращения</h4>
                <span className='description__text description-text'>{modalData.description}</span>
            </div>
            <Button className="card-modal__btn" onClick={() => okHandler()} type="primary" size="large">Сохранить</Button>
        </Modal >
    )
}