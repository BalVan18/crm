import { Droppable } from "react-beautiful-dnd";
import ColumnList from "../ColumnList/ColumnList";

import "./Column.sass";


export default function Column({ title, tasks, id }) {
    return (
        <div className="column">
            <h3 className="column__title column-title">
                {title}
            </h3>
            <Droppable droppableId={id}>
                {(provided) => (
                    <ColumnList tasks={tasks} provided={provided} />
                )}
            </Droppable>
        </div>
    );
}