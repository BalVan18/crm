import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setRouterData } from '../store/routerSlice'
import { getDatabase, ref, update } from "firebase/database";
import { toggleNewWorkModal } from '../store/modalSlice'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import RowCell from "../components/RowCell/RowCell.jsx"

export default function Works() {
    const dispatch = useDispatch();
    const works = useSelector((state) => state.bd.works)
    const [content, setContent] = useState(works);
    const db = getDatabase();

    const searchHandler = useCallback((e) => {
        const filterString = e.target.value
        const filterContent = (e) => works.filter(el => el.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(works)
        }
    }, [works])

    const updateDB = (workId, input) => {
        update(ref(db, `works/work_${workId}`), {
            cost: input
        });
    } 

    useEffect(() => {
        setContent(works)
        dispatch(setRouterData("3"))
    }, [works, dispatch]);

    return (
        <div className='works'>
            <div className="works__top">
                <Button className="tasks__btn tasks-btn" type="primary" size="large" icon={<PlusOutlined />} onClick={() => dispatch(toggleNewWorkModal())}/>
                <Input className="works__search works-search" size="large" placeholder="Поиск" allowClear onChange={searchHandler} />
            </div>
            <div className="works-table works__table">
                <div className="works-table-row works-table-row--header">
                    <p className="works-table-row-cell__headding">Наименование</p>
                    <p className="works-table-row-cell__headding">Стоимость</p>
                </div>
                {content.map((work, index) => (
                    <div className="works-table-row" key={index}>
                        <RowCell data={work} page="works" updateDB={updateDB}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
