import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { closeUserModal} from '../../store/userModalSlice'

export default function UserModal({children}) {
    const userModalState = useSelector((state) => state.userModal.visible)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return (
        <Modal title={user.full_name} open={userModalState} onOk={() => dispatch(closeUserModal())} onCancel={() => dispatch(closeUserModal())} footer={null} centered>
            <div>{user.id}</div>
            <div>{user.full_name}</div>
            <div>{user.position}</div>
            <div>{user.email}</div>
        </Modal >
    )
}