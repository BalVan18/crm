import { useSelector, useDispatch } from 'react-redux'
import { closeNewWorkModal } from '../../store/newWorkModalSlice'
import { getDatabase, ref, update } from "firebase/database";
import { Modal, Button, Form, Input } from 'antd';

import "./NewWorkModal.sass";

export default function NewWorkModal() {

    const dispatch = useDispatch()
    const newWorkModalState = useSelector((state) => state.newWorkModal.visible)
    const db = getDatabase();
    const dataFromDb = useSelector((state) => state.bd);

    const pushWorkData = (workData) => {
        const updates = {};
        updates[`works/work_${dataFromDb.works.length + 1}`] = workData;
        update(ref(db), updates);
    }

    const onFinish = (values) => {

        const workData = {
            id: dataFromDb.works.length + 1,
            name: values.name,
            cost: values.cost,
        };

        pushWorkData(workData);
        dispatch(closeNewWorkModal());
    };

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: 'Заполните поле ${label}!',
    };

    return (
        <Modal className='new-task-modal' open={newWorkModalState} onCancel={() => dispatch(closeNewWorkModal())} centered footer={null}>
            <h4 className="new-task-modal__title">Добавить новую работу</h4>
            <Form
                validateMessages={validateMessages}
                className="new-task-modal__form new-task-modal-form form"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item className="form__item" name="name" label="Наименование" rules={[{ required: true }]}>
                    <Input placeholder="Введите наименование" />
                </Form.Item>
                <Form.Item className="form__item" name="cost" label="Стоимость" rules={[{ required: true }]}>
                    <Input placeholder="Введите стоимость" />
                </Form.Item>
                <Button className='form__btn btn' type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form>
        </Modal >
    )
}