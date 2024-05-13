import { useState } from "react";
import { Modal, Button, Form, Select, Input, Table, InputNumber } from 'antd';
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
    const [tableData, setTableData] = useState([]);

    const pushTaskData = (taskData) => {
        const updates = {};
        updates[`tasks/task_${dataFromDb.tasks.length + 1}`] = taskData;
        update(ref(db), updates);
    }

    const pushJobTicketData = (jobTicketData) => {
        const updates = {};
        updates[`job_tickets/job_ticket_${dataFromDb.jobTickets.length + 1}`] = jobTicketData;
        update(ref(db), updates);
    }

    const pushClientData = (clientData) => {
        const updates = {};
        updates[`clients/client_${dataFromDb.clients.length + 1}`] = clientData;
        update(ref(db), updates);
    }

    const onFinish = (values) => {
        console.log(values)
        let date = new Date().toLocaleString();

        let storageItems = values.storageItem
        let mappedStorageItems;

        for (const property in storageItems) {
            mappedStorageItems = {
                ...mappedStorageItems,
                [`item_${Number(property) + 1}`]: {
                    item_id: storageItems[property],
                    item_count: values[`countInput-${storageItems[property]}`]
                }
            }
        }

        const valuesWorks = values.works

        let worksData;

        for (const property in valuesWorks) {
            worksData = {
                ...worksData,
                [`work_${Number(property) + 1}`]: valuesWorks[property],
            }
        }

        const jobTicketsData = {
            id: dataFromDb.jobTickets.length + 1,
            title: `T-${dataFromDb.tasks.length + 1}-ЗН-${dataFromDb.jobTickets.length + 1}`,
            date: date.split(',')[0],
            storage: mappedStorageItems,
            task_id: dataFromDb.tasks.length + 1,
            works: worksData
        }

        const filteredClients = dataFromDb.clients.filter(client => client.number === values.clientCarNumber);

        let clientId;

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
            title: `T-${dataFromDb.tasks.length + 1}`,
            job_ticket_id: dataFromDb.jobTickets.length + 1,
        };

        pushTaskData(taskData);
        pushJobTicketData(jobTicketsData);

        if (filteredClients.length < 1) {
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

    const columns = [
        {
            title: 'Наименование',
            dataIndex: 'name',
        },
        {
            title: 'Количество',
            dataIndex: 'count',
        },
    ];

    const onChangeStorageHandler = (values) => {
        const storageItems = values.map(id => dataFromDb.storage.filter(item => item.id === id)[0]);

        const tableItems = storageItems.map((item, index) => ({ key: `${index + 1}`, name: item.name, count: <Form.Item className="form__item" name={`countInput-${item.id}`}><InputNumber min={1} max={item.count} changeOnWheel /></Form.Item> }));
        setTableData(tableItems);
    }

    return (
        <Modal className='new-task-modal' open={newTaskModalState} onCancel={() => dispatch(toggleNewTaskModal())} centered footer={null}>
            <h4 className="new-task-modal__title">Создать новую задачу</h4>
            <Form
                validateMessages={validateMessages}
                className="new-task-modal__form new-task-modal-form form"
                layout="vertical"
                onFinish={onFinish}
            >
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
                        options={dataFromDb.employees.map(executor => ({ value: executor.id, label: executor.full_name }))}
                    />
                </Form.Item>
                <Form.Item className="form__item" name="description" label="Причина обращения" rules={[{ required: true }]}>
                    <TextArea autoSize placeholder="Введите причину обращения" />
                </Form.Item>
                <Form.Item className="form__item" name="works" label="Выберите работы" rules={[{ required: true }]}>
                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Выберите работы"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                        options={dataFromDb.works.map(work => ({ value: work.id, label: work.name }))}
                    />
                </Form.Item>
                <Form.Item className="form__item" name="storageItem" label="Выберите запчасти" rules={[{ required: true }]}>
                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Выберите запчасти"
                        optionFilterProp="children"
                        onChange={onChangeStorageHandler}
                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                        options={dataFromDb.storage.map(item => ({ value: item.id, label: item.name }))}
                    />
                </Form.Item>
                <Table columns={columns} dataSource={tableData} size="small" pagination={{ defaultPageSize: 3 }} />
                <Button className='form__btn btn' type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form>
        </Modal >
    )
}