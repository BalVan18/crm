import { Modal, Button, Form, Select, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { toggleNewTaskModal } from '../../store/modalSlice'
import { getDatabase, ref, update } from "firebase/database";

import "./NewTaskModal.sass";

export default function CardModal() {
    const { TextArea } = Input;

    const dispatch = useDispatch()
    const newTaskModalState = useSelector((state) => state.modal.newTask.visible)
    const user = useSelector((state) => state.user)
    const db = getDatabase();
    const dataFromDb = useSelector((state) => state.bd);

    const pushTaskData = (taskData) => {
        const updates = {};
        updates[`tasks/task_${dataFromDb.tasks.length + 1}`] = taskData;
        update(ref(db), updates);
    }

    const pushClientData = (clientData) => {
        const updates = {};
        updates[`clients/client_${dataFromDb.clients.length + 1}`] = clientData;
        update(ref(db), updates);
    }

    const onFinish = (values) => {
        const filteredClients = dataFromDb.clients.filter(client => client.number === values.clientCarNumber);

        let clientId,
            date = new Date().toLocaleString();

        if (filteredClients.length > 0) {
            clientId = filteredClients[0].id
        } else {
            clientId = dataFromDb.clients.length + 1
        }

        const taskData = {
            author_id: user.id,
            client_id: clientId,
            date: date.split(',')[0],
            description: values.description,
            executor_id: values.executor,
            id: dataFromDb.tasks.length + 1,
            priority: values.priority,
            status: 1,
            title: values.title,
        };

        pushTaskData(taskData);

        if (filteredClients.length < 1){
            const clientData = {
                id: clientId,
                model: values.clientCarModel,
                name: values.clientName,
                number: values.clientCarNumber.toUpperCase(),
                phone: values.clientPhone,
            }

            pushClientData(clientData);
        }

        dispatch(toggleNewTaskModal());
    };

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: 'Заполните поле ${label}!',
    };

    return (
        <Modal className='new-task-modal' open={newTaskModalState} onCancel={() => dispatch(toggleNewTaskModal())} centered footer={null}>
            <h4 className="new-task-modal__title">Создать новую задачу</h4>
            <Form
                validateMessages={validateMessages}
                className="new-task-modal__form new-task-modal-form form"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item className="form__item" name="title" label="Номер задачи" rules={[{ required: true }]}>
                    <Input placeholder="Введите номер задачи" />
                </Form.Item>
                <Form.Item className="form__item" name="priority" label="Приоритет" rules={[{ required: true }]}>
                    <Select
                        className="priority__select"
                        placeholder="Выберите приоритет задачи"
                        options={[
                            { value: 'низкий', label: 'НИЗКИЙ' },
                            { value: 'средний', label: 'СРЕДНИЙ' },
                            { value: 'высокий', label: 'ВЫСОКИЙ' },
                        ]}
                    />
                </Form.Item>
                <Form.Item className="form__item" name="clientName" label="Клиент" rules={[{ required: true }]}>
                    <Input placeholder="Введите ФИО клиента" />
                </Form.Item>
                <Form.Item className="form__item" name="clientPhone" label="Телефон" rules={[{ required: true }]}>
                    <Input placeholder="Введите телефон клиента" />
                </Form.Item>
                <Form.Item className="form__item" name="clientCarModel" label="Автомобиль" rules={[{ required: true }]}>
                    <Input placeholder="Введите автомобиль" />
                </Form.Item>
                <Form.Item className="form__item" name="clientCarNumber" label="Гос. номер" rules={[{ required: true }]}>
                    <Input placeholder="Введите номер автомобиля" />
                </Form.Item>
                <Form.Item className="form__item" name="executor" label="Исполнитель" rules={[{ required: true }]}>
                    <Select
                        className="executor__select"
                        placeholder="Выберите исполнителя"
                        options={dataFromDb.employees.map(executor => ({value: executor.id, label: executor.full_name}))}
                    />
                </Form.Item>
                <Form.Item className="form__item" name="description" label="Причина обращения" rules={[{ required: true }]}>
                    <TextArea autoSize placeholder="Введите причину обращения" />
                </Form.Item>
                <Button className='form__btn btn' type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form>
        </Modal >
    )
}