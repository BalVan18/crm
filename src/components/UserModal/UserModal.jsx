import {Modal, Button} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { closeUserModal} from '../../store/userModalSlice'

import './UserModal.sass'

export default function UserModal({setAuthorized, authorized}) {
    const userModalState = useSelector((state) => state.userModal.visible)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const clickHandler = () => {
        setAuthorized(!authorized);
        dispatch(closeUserModal());
        document.cookie = 'authorized=false;max-age=604800'
        document.cookie = 'userEmail="";max-age=604800'
    }

    return (
        <Modal className="user-modal" open={userModalState} onOk={() => dispatch(closeUserModal())} onCancel={() => dispatch(closeUserModal())} footer={null} centered>
            <h4 className="user-modal__title">Личные данные</h4>
            <div className='user-modal__row'>
                <h4 className="user-modal__label">Пользователь:</h4>
                <span className='user-modal__text'>{user.full_name}</span>
            </div>
            <div className="user-modal__row">
                <h4 className="user-modal__label">Должность:</h4>
                <p className='user-modal__text'>{user.position}</p>
            </div>
            <div className="user-modal__row">
                <h4 className="user-modal__label">Email:</h4>
                <p className='user-modal__text'>{user.email}</p>
            </div>
            <Button className='user-modal__btn btn' type="primary" icon={<LogoutOutlined />} onClick={clickHandler}>
                Выйти
            </Button>
        </Modal >
    )
}