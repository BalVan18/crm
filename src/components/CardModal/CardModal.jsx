import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { closeCardModal} from '../../store/cardModalSlice'

export default function CardModal({children}) {
    const cardModalState = useSelector((state) => state.cardModal.visible)
    const dispatch = useDispatch()

    return (
        <Modal title="Modal" open={cardModalState} onOk={() => dispatch(closeCardModal())} onCancel={() => dispatch(closeCardModal())} footer={null} centered>
            {children}
        </Modal >
    )
}