import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { setRouterData } from '../store/routerSlice'
import { Col, Row } from 'antd';
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
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <p>Прибыль за детали: {materialsSum}</p>
                    <p>Прибыль за работы: {worksSum}</p>
                    <p>итог: {materialsSum + worksSum}</p>
                    <PieChart
                        data={[
                            { title: 'Детали', value: materialsSum, color: '#E38627' },
                            { title: 'Работы', value: worksSum, color: '#C13C37' },
                        ]}
                    />
                </Col>
            </Row>
        </>
    )
}
