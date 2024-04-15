import { PlusOutlined } from '@ant-design/icons';
import { Button, Select, Input } from 'antd';
import { showNewTaskModal } from '../store/newTaskModalSlice'
import {useDispatch, useSelector} from 'react-redux'

import Board from "../components/Board/Board";
import {useState} from "react";

export default function Tasks() {
    const { Search } = Input;

    const dispatch = useDispatch();
    const employees = useSelector((state) => state.bd.employees)

    const [authorId, setAuthorId] = useState(null);
    const [executorId, setExecutorId] = useState(null);

    const handleChangeAuthor = (e) => {
        setAuthorId(e)
    }

    const handleChangeExecutor = (e) => {
        setExecutorId(e)
    }

    return (
        <div className="tasks">
            <div className="tasks__control tasks-control">
                <Button className="tasks__btn tasks-btn" type="primary" size="large" icon={<PlusOutlined />} onClick={() => dispatch(showNewTaskModal())}/>
                <Select
                  type="primary"
                  size="large"
                  placeholder="Выбрать автора"
                  allowClear
                  onChange={handleChangeAuthor}
                  options={employees.map(employee => ({value: employee.id, label: employee.full_name}))}
                />
                <Select
                    type="primary"
                    size="large"
                    placeholder="Выбрать исполнителя"
                    allowClear
                    onChange={handleChangeExecutor}
                    options={employees.map(employee => ({value: employee.id, label: employee.full_name}))}
                />
                <Search className="tasks__search tasks-search" size="large" placeholder="Поиск" enterButton />
            </div>
            <Board authorId={authorId} executorId={executorId}/>
        </div>
    )
}
