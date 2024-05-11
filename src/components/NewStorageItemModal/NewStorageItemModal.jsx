import { useSelector, useDispatch } from 'react-redux'
import { toggleNewStorageItemModal } from '../../store/modalSlice'
import { getDatabase, ref, update } from "firebase/database";
import { Modal, Button, Form, Input } from 'antd';

import "./NewStorageItemModal.sass";

export default function NewStorageItemModal() {

    const dispatch = useDispatch()
    const newStorageItemModalState = useSelector((state) => state.modal.storageItem.visible)
    const db = getDatabase();
    const dataFromDb = useSelector((state) => state.bd);

    const pushStorageItemData = (storageItemData) => {
        const updates = {};
        updates[`storage/item_${dataFromDb.storage.length + 1}`] = storageItemData;
        update(ref(db), updates);
    }

    const onFinish = (values) => {

        const storageItemData = {
            id: dataFromDb.storage.length + 1,
            name: values.name,
            count: values.count,
            cost: values.cost,
        };

        pushStorageItemData(storageItemData);
        dispatch(toggleNewStorageItemModal());
    };

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: 'Заполните поле ${label}!',
    };

    return (
        <Modal className='new-task-modal' open={newStorageItemModalState} onCancel={() => dispatch(toggleNewStorageItemModal())} centered footer={null}>
            <h4 className="new-task-modal__title">Добавить новую позицию</h4>
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
                <Form.Item className="form__item" name="count" label="Количество" rules={[{ required: true }]}>
                    <Input placeholder="Введите количество" />
                </Form.Item>
                <Button className='form__btn btn' type="primary" htmlType="submit">
                    Создать
                </Button>
            </Form>
        </Modal >
    )
}