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
    const employees = useSelector((state) => state.bd.employees)
    const storageFromBD = useSelector((state) => state.bd.storage)
    const worksFromDb = useSelector((state) => state.bd.works)
    const [content, setContent] = useState(jobTickets);

    const searchHandler = useCallback((e) => {
        const filterString = e.target.value
        const filterContent = (e) => jobTickets.filter(el => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(jobTickets)
        }
    }, [jobTickets])

    useEffect(() => {
        const newContent = jobTickets.map(ticket => {
            const relatedTask = tasks.filter(task => task.id === ticket.task_id)[0];
            const clientId = relatedTask.client_id;
            const executorId = relatedTask.executor_id;
            const client = clients.filter(client => client.id === clientId)[0];
            const executor = employees.filter(employee => employee.id === executorId)[0];
            const storage = ticket.storage;
            const works = ticket.works;

            let worksArr = []
            for (const work in works) {
                worksArr.push(works[work])
            }

            let storageArr = []
            for (const storageItem in storage) {
                storageArr.push(storage[storageItem])
            }

            return {
                ...ticket,
                clientName: client.name,
                executorName: executor.full_name,
                storage: storageArr,
                works: worksArr,
            }
        })

        setContent(newContent)
        dispatch(setRouterData("2"))
    }, [jobTickets, dispatch, clients, tasks, employees]);

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
                {content.map((jobTicket, index) => (
                    <div className="works-table-row" key={index}>
                        <RowCell data={jobTicket} storageFromBD={storageFromBD} worksFromDb={worksFromDb} page="job-tickets" />
                    </div>
                ))}
            </div>
        </div>
    )
}
