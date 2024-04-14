import { useState, useEffect } from "react";
import { Modal, Button, Form, Select, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { closeNewTaskModal } from '../../store/newTaskModalSlice'
import { getDatabase, ref, update, onValue } from "firebase/database";

export default function CardModal() {

    const { TextArea } = Input;

    const dispatch = useDispatch()
    const newTaskModalState = useSelector((state) => state.newTaskModal.visible)
    const db = getDatabase();

    const [newTaskId, setNewTaskId] = useState(null);
    const [newClientId, setNewClientId] = useState(null);
    const [executors, setExecutors] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchTasks = ref(db, `tasks/`);
        onValue(fetchTasks, (snapshot) => {
            const data = snapshot.val();
            let keys = [];
            for (let key in data) {
                keys.push(key)
            }
            setNewTaskId(keys.length + 1)
        });

        const fetchExecutors = ref(db, 'employees/');
        onValue(fetchExecutors, (snapshot) => {
            const data = snapshot.val();
            let executorsArr = [];
            for (let executor in data) {
                executorsArr.push(data[executor])
            }
            setExecutors(executorsArr)
        });

        const fetchClients = ref(db, 'clients/');
        onValue(fetchClients, (snapshot) => {
            const data = snapshot.val();
            let clientsArr = [];
            for (let executor in data) {
                clientsArr.push(data[executor])
            }
            setClients(clientsArr)
            setNewClientId(clientsArr.length)
        });
    }, [db]);

    const pushTaskData = (taskData) => {
        const updates = {};
        updates[`tasks/task_${newTaskId}`] = taskData;
        update(ref(db), updates);
    }

    // const writeUserData = (userId, name, email, imageUrl) => {
    //     set(ref(db, 'tasks/' + userId), {
    //         username: name,
    //         email: email,
    //         profile_picture: imageUrl
    //     });
    // }

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: 'Заполните поле ${label}*',
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        const filteredClients = clients.filter(client => client.number === values.clientCarNumber)
        let clientId;
        if (filteredClients.length > 0) {
            clientId = filteredClients[0].id
        } else {
            clientId = newClientId
        }

        let date = new Date().toLocaleString();
        const taskData = {
            author_id: 1, // TODO Захуярить подтягивания автора
            client_id: clientId,
            date: date.split(',')[0],
            description: values.description,
            executor_id: values.executor,
            id: newTaskId,
            status: 1,
            title: values.title,
        };
        // const clientData = {
        //     id: clientId,
        //     model: values.clientCarModel,
        //     name: values.clientName,
        //     number: values.clientCarNumber,
        //     phone: values.clientPhone,
        // }
        pushTaskData(taskData);
        // pushClientData(clientData);
    };

    return (
        <Modal title='Создать новую задачу' className='new-task-modal' open={newTaskModalState} onCancel={() => dispatch(closeNewTaskModal())} centered footer={null}>
            <Form
                validateMessages={validateMessages}
                className="new-task-modal__form new-task-modal-form form"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item className="form__item form-item" name="title" label="Номер задачи" rules={[{ required: true }]}>
                    <Input placeholder="Введите номер задачи" />
                </Form.Item>
                <Form.Item className="form__item form-item" name="clientName" label="Клиент" rules={[{ required: true }]}>
                    <Input placeholder="Введите ФИО клиента" />
                </Form.Item>
                <Form.Item className="form__item form-item" name="clientPhone" label="Телефон" rules={[{ required: true }]}>
                    <Input placeholder="Введите телефон клиента" />
                </Form.Item>
                <Form.Item className="form__item form-item" name="clientCarModel" label="Автомобиль" rules={[{ required: true }]}>
                    <Input placeholder="Введите автомобиль" />
                </Form.Item>
                <Form.Item className="form__item form-item" name="clientCarNumber" label="Гос. номер" rules={[{ required: true }]}>
                    <Input placeholder="Введите номер автомобиля" />
                </Form.Item>
                <Form.Item className="form__item form-item" name="executor" label="Исполнитель" rules={[{ required: true }]}>
                    <Select
                        className="status__select status-select"
                        placeholder="Введите исполнителя"
                        options={executors.map(executor => ({value: executor.id, label: executor.full_name}))}
                    />
                </Form.Item>
                <Form.Item className="form__item form-item" name="description" label="Причина обращения" rules={[{ required: true }]}>
                    <TextArea autoSize placeholder="Введите причину обращенияы" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </Modal >
    )
}