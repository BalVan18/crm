import {Modal, Button, Avatar} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { closeUserModal} from '../../store/userModalSlice'

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
        <Modal title="Личные данные" open={userModalState} onOk={() => dispatch(closeUserModal())} onCancel={() => dispatch(closeUserModal())} footer={null} centered>
            <div>
                <Avatar className='' shape="square" icon={<UserOutlined />} />
                <span>{user.full_name}</span>
            </div>
            <div>{user.position}</div>
            <div>{user.email}</div>
            <Button type="primary" icon={<LogoutOutlined />} onClick={clickHandler}>
                Выйти
            </Button>
        </Modal >
    )
}