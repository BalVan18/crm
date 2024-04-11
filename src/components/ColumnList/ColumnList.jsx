import Card from "../Card/Card";

import "./ColumnList.sass"

export default function ColumnList({tasks, provided }) {
    return (
        <div
            className="column__list column-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            {tasks.map((task, index) => (
                <Card key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
        </div>
    )
}
