// import { useEffect } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Select, Input } from 'antd';
import { showNewTaskModal } from '../store/newTaskModalSlice'
// import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from 'react-redux'

import Board from "../components/Board/Board";

export default function Tasks() {

    const { Search } = Input;

    const dispatch = useDispatch();

    return (
        <div className="tasks">
            <div className="tasks__control tasks-control">
                <Button className="tasks__btn tasks-btn" type="primary" size="large" icon={<PlusOutlined />} onClick={() => dispatch(showNewTaskModal())}/>
                <Select
                  type="primary"
                  size="large"
                  placeholder="Выбрать автора"
                  // defaultValue="Выбрать автора"
                  // onChange={handleChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                  ]}
                />
                <Search className="tasks__search tasks-search" size="large" placeholder="Поиск" enterButton />
            </div>
            <Board />
        </div>
    )
}
