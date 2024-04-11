import { Draggable } from "react-beautiful-dnd";
import { showCardModal } from '../../store/cardModalSlice';
import { useDispatch } from 'react-redux'

import "./Card.sass";

export default function Card({ task, index }) {
    const dispatch = useDispatch()

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided) => (
                <div
                    className="card"
                    onClick={() => dispatch(showCardModal())}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <span className="card__id card-id">
                        {task.id}
                    </span>
                    <div className="card__content card-content">
                        {task.title}
                    </div>
                </div>
            )}
        </Draggable>
    );
}