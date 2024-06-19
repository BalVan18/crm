import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { setRouterData } from '../store/routerSlice'
import { PieChart } from 'react-minimal-pie-chart';

export default function Reports() {
    const dispatch = useDispatch();
    const bd = useSelector((state) => state.bd)
    const jobTickets = bd.jobTickets
    const storage = bd.storage
    const works = bd.works
    const jobTicketsStorageItems = jobTickets.map(item => item.storage)
    const jobTicketsWorks = jobTickets.map(item => item.works)

    useEffect(() => {
        dispatch(setRouterData("6"))
    }, [dispatch]);

    const result = {};

    jobTicketsStorageItems.forEach(entry => {
        Object.values(entry).forEach(item => {
            const itemId = item.item_id;
            const itemCount = item.item_count;
            if (result[itemId]) {
                result[itemId] += itemCount;
            } else {
                result[itemId] = itemCount;
            }
        });
    });

    const IDs = Object.keys(result)
    let materialsCosts = {}

    IDs.forEach(id => {
        const currStorageItem = storage.filter(item => Number(item.id) === Number(id))[0]
        const currStorageItemCost = currStorageItem.cost

        materialsCosts = {
            ...materialsCosts,
            [id]: currStorageItemCost
        }
    })

    let materialsSum = 0;

    IDs.forEach(id => {
        let count = result[id]
        let cost = materialsCosts[id]
        materialsSum = materialsSum + (count * cost)
    })

    const worksIDs = []
    let worksSum = 0

    jobTicketsWorks.forEach(entry => {
        Object.values(entry).forEach(item => {
            worksIDs.push(item)
        });
    });

    worksIDs.forEach(id => {
        const currWorksItem = works.filter(item => Number(item.id) === Number(id))[0]
        const currWorkCost = currWorksItem.cost

        worksSum = worksSum + Number(currWorkCost)
    })

    return (
        <div className="reports">
            <h3 className="reports__title">Отчёт о прибыли за текущий месяц</h3>
            <div className="reports__diagram">
                <div className="reports__wrap">
                    <div className="reports__row">
                        <span className="reports__color reports__color--first"></span>
                        <p className="reports__text">Прибыль за детали: {materialsSum} руб.</p>
                    </div>
                    <div className="reports__row">
                        <span className="reports__color reports__color--second"></span>
                        <p className="reports__text">Прибыль за работы: {worksSum} руб.</p>
                    </div>
                    <p className="reports__text">Итог: {materialsSum + worksSum} руб.</p>
                </div>
                <PieChart
                    className="reports__piechart"
                    data={[
                        {title: 'Детали', value: materialsSum, color: '#0bb4ff'},
                        {title: 'Работы', value: worksSum, color: '#50e991'},
                    ]}
                />
            </div>
        </div>
    )
}
