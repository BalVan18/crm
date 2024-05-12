import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setRouterData } from '../store/routerSlice'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

export default function Reports() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouterData("6"))
    }, [dispatch]);

    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}