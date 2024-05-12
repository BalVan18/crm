import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setRouterData } from '../store/routerSlice'
import { getDatabase, ref, update } from "firebase/database";
import { Input } from 'antd';

import RowCell from "../components/RowCell/RowCell.jsx"

export default function Clients() {

    const dispatch = useDispatch();
    const clients = useSelector((state) => state.bd.clients)
    const [content, setContent] = useState(clients);
    const db = getDatabase();

    const searchHandler = useCallback((e) => {
        const filterString = e.target.value
        const filterContent = (e) => clients.filter(
            el => (
                el.name.toLowerCase().indexOf(filterString.toLowerCase())
                && el.phone.toLowerCase().indexOf(filterString.toLowerCase())
                && el.model.toLowerCase().indexOf(filterString.toLowerCase())
                && el.number.toLowerCase().indexOf(filterString.toLowerCase())
            ) > -1) 

        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(clients)
        }
    }, [clients])

    const updateDB = (id, input) => {
        update(ref(db, `clients/client_${id}`), {
            phone: input
        });
    } 

    useEffect(() => {
        setContent(clients)
        dispatch(setRouterData("5"))
    }, [clients, dispatch]);

    return (
        <div className='clients'>
            <div className="clients__top">
                <Input className="clients__search clients-search" size="large" placeholder="Поиск" allowClear onChange={searchHandler} />
            </div>
            <ul className="clients-list clients__list">
                <li className="clients-list-item clients-list-item--header">
                    <p className="clients-list-item__text">Имя</p>
                    <p className="clients-list-item__text">Телефон</p>
                    <p className="clients-list-item__text">Автомобиль</p>
                    <p className="clients-list-item__text">Гос. номер</p>
                </li>
                {content.map((client, index) => (
                    <li key={index} className="clients-list-item">
                         <RowCell data={client} page="clients" key={index} updateDB={updateDB}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}
