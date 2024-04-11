import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { closeUserModal} from '../../store/userModalSlice'

export default function UserModal({children}) {
    const userModalState = useSelector((state) => state.userModal.visible)
    const dispatch = useDispatch()

    return (
        <Modal title="Modal" open={userModalState} onOk={() => dispatch(closeUserModal())} onCancel={() => dispatch(closeUserModal())} footer={null} centered>
            {children}
        </Modal >
    )
}