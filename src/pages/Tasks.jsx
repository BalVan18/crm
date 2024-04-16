import { PlusOutlined } from '@ant-design/icons';
import { Button, Select, Input } from 'antd';
import { showNewTaskModal } from '../store/newTaskModalSlice'
import {useDispatch, useSelector} from 'react-redux'

import Board from "../components/Board/Board";
import {useState, useCallback, useEffect} from "react";

export default function Tasks() {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.bd.employees)
    const tasks = useSelector((state) => state.bd.tasks)

    const [authorId, setAuthorId] = useState(null);
    const [executorId, setExecutorId] = useState(null);
    const [content, setContent] = useState(tasks);

    const handleChangeAuthor = (e) => {
        setAuthorId(e)
    }

    const handleChangeExecutor = (e) => {
        setExecutorId(e)
    }

    const searchHandler = useCallback((e) => {
        const filterString = e.target.value
        const filterContent = (e) => tasks.filter(el => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(tasks)
        }
    }, [tasks])

    useEffect(() => {
        setContent(tasks)
    }, [tasks]);

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
                <Input className="tasks__search tasks-search" size="large" placeholder="Поиск" allowClear onChange={searchHandler}/>
            </div>
            <Board authorId={authorId} executorId={executorId} searchedContent={content}/>
        </div>
    )
}
