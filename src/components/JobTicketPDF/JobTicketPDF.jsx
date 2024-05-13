import React from 'react';
import {Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';

export default function JobTicketPDF({data, storageFromBD, worksFromDb}) {
    Font.register({
        family: "Roboto",
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
    });

    Font.register({
        family: "RobotoBold",
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf"
    });

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFF',
            fontFamily : "Roboto",
            fontSize: '14px',
        },
        section: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            padding: 10
        },
        text: {
            // width: '50vw'
        },
        section1: {

        },
        section2: {

        },
        section3: {

        },
        tableRow: {
            display: 'flex',
            flexDirection: 'row',
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
            borderBottom: '1px solid #000',
            marginLeft: 10,
            marginRight: 10,
        },
        tableHeader: {
            borderTop: '1px solid #000',
            textAlign: "center",
            fontFamily: "RobotoBold"
        },
        tableCell: {
            display: 'flex',
            textAlign: "center",
            height: '100%',
            padding: 10,
            borderRight: '1px solid #000',
            overflow: "hidden",
            fontSize: '12px',
        },
        worksTableHeaderCol2: {
            width: '60%',
        },
        worksTableCol3: {
            width: '32%',
        },
        worksTableCol2: {
            width: '60%',
            textAlign: "left",
        },
        storageTableHeaderCol2: {
            width: '45%',
        },
        tableCol1: {
            width: '8%'
        },
        storageTableCol2: {
            width: '45%',
            textAlign: "left",
        },
        storageTableCol3: {
            width: '19%',
        },
        storageTableCol4: {
            width: '14%'
        },
        storageTableCol5: {
            width: '14%',
            borderRight: 'none',
        },
    });

    let storageTableContent = [],
        storageTableSum,
        worksTableContent = [],
        worksTableSum,
        totalSum;

    const {storage, works} = data;

    if (Array.isArray(storage) && Array.isArray(works)) {
        storageTableContent = storage.map(storageItem => {
            const currentStorageItem = storageFromBD.filter(item => item.id === storageItem.item_id)[0];

            return {
                count: storageItem.item_count,
                name: currentStorageItem.name,
                cost: currentStorageItem.cost,
                sum: storageItem.item_count * currentStorageItem.cost,
            }
        })

        storageTableSum = storageTableContent.reduce((acc, item) => {
            return acc + item.sum
        }, 0)

        worksTableContent = works.map(work => {
            const currentWork = worksFromDb.filter(currWork => currWork.id === work)[0];

            return {
                name: currentWork.name,
                cost: currentWork.cost,
            }
        })

        worksTableSum = worksTableContent.reduce((acc, item) => {
            return acc + Number(item.cost)
        }, 0)

        totalSum = worksTableSum + storageTableSum;
    }


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.section, styles.section1]}>
                    <Text style={[styles.text]}>Заказ наряд: {data.title}</Text>
                    <Text style={[styles.text]}>Дата формирования {data.date}</Text>
                </View>
                <View style={[styles.section, styles.section2]}>
                    <Text>Заказчик: {data.clientName}</Text>
                </View>
                <View style={[styles.section, styles.section3]}>
                    <Text>исполнитель: {data.executorName}</Text>
                </View>


                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableCol1]}></Text>
                    <Text style={[styles.tableCell, styles.worksTableHeaderCol2]}>Наименование</Text>
                    <Text style={[styles.tableCell, styles.worksTableCol3]}>Цена</Text>
                </View>
                {worksTableContent.map((el, index) => {
                    return (
                        <View key={index} style={[styles.tableRow]}>
                            <Text style={[styles.tableCell, styles.tableCol1]}>№{index + 1}</Text>
                            <Text style={[styles.tableCell, styles.worksTableCol2]}>{el.name}</Text>
                            <Text style={[styles.tableCell, styles.worksTableCol3]}>{el.cost} руб.</Text>
                        </View>
                    )
                })}
                <View style={[styles.section, styles.section5]}>
                    <Text>Итого за работы: {worksTableSum} руб.</Text>
                </View>


                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableCol1]}></Text>
                    <Text style={[styles.tableCell, styles.storageTableHeaderCol2]}>Наименование</Text>
                    <Text style={[styles.tableCell, styles.storageTableCol3]}>Колличество</Text>
                    <Text style={[styles.tableCell, styles.storageTableCol4]}>Цена</Text>
                    <Text style={[styles.tableCell, styles.storageTableCol5]}>Сумма</Text>
                </View>
                {storageTableContent.map((el, index) => {
                    return (
                        <View key={index} style={[styles.tableRow]}>
                            <Text style={[styles.tableCell, styles.tableCol1]}>№{index + 1}</Text>
                            <Text style={[styles.tableCell, styles.storageTableCol2]}>{el.name}</Text>
                            <Text style={[styles.tableCell, styles.storageTableCol3]}>{el.count} шт.</Text>
                            <Text style={[styles.tableCell, styles.storageTableCol4]}>{el.cost} руб.</Text>
                            <Text style={[styles.tableCell, styles.storageTableCol5]}>{el.sum} руб.</Text>
                        </View>
                    )
                })}
                <View style={[styles.section, styles.section5]}>
                    <Text>Итого за материалы: {storageTableSum} руб.</Text>
                </View>


                <View style={[styles.section, styles.section5]}>
                    <Text>Общий итог: {totalSum} руб.</Text>
                </View>

                <View style={[styles.section, styles.section5]}>
                    <Text>FOOTER</Text>
                </View>
            </Page>
        </Document>
    )
}
