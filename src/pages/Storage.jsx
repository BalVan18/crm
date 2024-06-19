import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setRouterData } from '../store/routerSlice'
import { getDatabase, ref, update } from "firebase/database";
import { toggleNewStorageItemModal } from '../store/modalSlice'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import RowCell from "../components/RowCell/RowCell.jsx"
import {PDFDownloadLink} from "@react-pdf/renderer";
import StoragePDF from "../components/StoragePDF/StoragePDF";

export default function Storage() {
    const dispatch = useDispatch();
    const storage = useSelector((state) => state.bd.storage)
    const [content, setContent] = useState(storage);
    const db = getDatabase();

    const searchHandler = useCallback((e) => {
        const filterString = e.target.value
        const filterContent = (e) => storage.filter(el => el.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(storage)
        }
    }, [storage])

    const updateCostDB = (id, inputCost) => {
        update(ref(db, `storage/item_${id}`), {
            cost: inputCost
        });
    }

    const updateCountDB = (id, inputCount) => {
        update(ref(db, `storage/item_${id}`), {
            count: inputCount
        });
    }

    useEffect(() => {
        setContent(storage)
        dispatch(setRouterData("3"))
    }, [storage, dispatch]);

    console.log(storage.map(item => item.name))

    return (
        <div className='storage'>
            <div className="storage__top">
                <Button className="tasks__btn tasks-btn" type="primary" size="large" icon={<PlusOutlined />} onClick={() => dispatch(toggleNewStorageItemModal())}/>
                <Input className="storage__search storage-search" size="large" placeholder="Поиск" allowClear onChange={searchHandler} />
            </div>
            <ul className="storage-list storage__list">
                <li className="storage-list-item storage-list-item--header">
                    <p className="storage-list-item__text">Наименование</p>
                    <p className="storage-list-item__text">Стоимость</p>
                    <p className="storage-list-item__text">Колличество</p>
                </li>
                {content.map((item, index) => (
                    <li key={index} className="storage-list-item">
                        <RowCell data={item} page="storage" updateCostDB={updateCostDB} updateCountDB={updateCountDB}/>
                    </li>
                ))}
            </ul>

            <PDFDownloadLink document={<StoragePDF data={storage}/>} fileName="Остатки-на-складе.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
    )
}
