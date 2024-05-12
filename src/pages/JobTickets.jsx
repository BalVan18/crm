import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setRouterData } from '../store/routerSlice'
// import { getDatabase } from "firebase/database";
import { toggleNewWorkModal } from '../store/modalSlice'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import RowCell from "../components/RowCell/RowCell.jsx"

export default function JobTickets() {
    const dispatch = useDispatch();
    const jobTickets = useSelector((state) => state.bd.jobTickets)
    const tasks = useSelector((state) => state.bd.tasks)
    const clients = useSelector((state) => state.bd.clients)
    const [content, setContent] = useState(jobTickets);

    const searchHandler = useCallback((e) => {
        const filterString = e.target.value
        const filterContent = (e) => jobTickets.filter(el => el.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(jobTickets)
        }
    }, [jobTickets])

    // TODO Сделать вывод имени клиента в заказ-наряд
    // const newContent = jobTickets.map(ticket => {
    //     const filteredTasks = tasks.filter(task => task.id === ticket.task_id);
    //     const clientId = filteredTasks.map(clientId => clientId.client_id);
    //     const filteredClients = clients.filter(client => client.id === clientId)
    //     console.log(filteredClients)
    // })

    // console.log(newContent)

    useEffect(() => {
        setContent(jobTickets)
        dispatch(setRouterData("2"))
    }, [jobTickets, dispatch]);

    return (
        <div className='works'>
            <div className="works__top">
                <Button className="tasks__btn tasks-btn" type="primary" size="large" icon={<PlusOutlined />} onClick={() => dispatch(toggleNewWorkModal())}/>
                <Input className="works__search works-search" size="large" placeholder="Поиск" allowClear onChange={searchHandler} />
            </div>
            <div className="works-table works__table">
                <div className="works-table-row works-table-row--header">
                    <p className="works-table-row-cell__headding">Наименование</p>
                    <p className="works-table-row-cell__headding">Дата</p>
                    <p className="works-table-row-cell__headding">Заказчик</p>
                    <p className="works-table-row-cell__headding">PDF</p>
                </div>
                {content.map((jobTickets, index) => (
                    <div className="works-table-row" key={index}>
                        <RowCell data={jobTickets} page="job-tickets" />
                    </div>
                ))}
            </div>
        </div>
    )
}
