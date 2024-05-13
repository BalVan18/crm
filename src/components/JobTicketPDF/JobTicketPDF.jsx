import React from 'react';
import {Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';

export default function JobTicketPDF({data, storageFromBD}) {
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
            fontFamily : "Roboto"
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
            borderTop: '1px solid #000',
            marginLeft: 10,
            marginRight: 10,
        },
        lastTableRow: {
            borderBottom: '1px solid #000',
        },
        tableHeader: {
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
        tableHeaderCol2: {
            width: '45%',
        },
        tableCol1: {
            width: '8%'
        },
        tableCol2: {
            width: '45%',
            textAlign: "left",
        },
        tableCol3: {
            width: '19%',
        },
        tableCol4: {
            width: '14%'
        },
        tableCol5: {
            width: '14%',
            borderRight: 'none',
        },

    });
    let tableContent = [],
        tableSum;

    const storage = data.storage;

    if (Array.isArray(storage)) {
        tableContent = storage.map(storageItem => {
            const currentStorageItem = storageFromBD.filter(item => item.id === storageItem.item_id)[0];

            return {
                count: storageItem.item_count,
                name: currentStorageItem.name,
                cost: currentStorageItem.cost,
                sum: storageItem.item_count * currentStorageItem.cost,
            }
        })

        tableSum = tableContent.reduce((acc, item) => {
            return acc + item.sum
        }, 0)
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
                    <Text style={[styles.tableCell, styles.tableHeaderCol2]}>Наименование</Text>
                    <Text style={[styles.tableCell, styles.tableCol3]}>Колличество</Text>
                    <Text style={[styles.tableCell, styles.tableCol4]}>Цена</Text>
                    <Text style={[styles.tableCell, styles.tableCol5]}>Сумма</Text>
                </View>
                {tableContent.map((el, index) => {
                    return (
                        <View key={index} style={[styles.tableRow, styles.lastTableRow]}>
                            <Text style={[styles.tableCell, styles.tableCol1]}>№{index + 1}</Text>
                            <Text style={[styles.tableCell, styles.tableCol2]}>{el.name}</Text>
                            <Text style={[styles.tableCell, styles.tableCol3]}>{el.count} шт.</Text>
                            <Text style={[styles.tableCell, styles.tableCol4]}>{el.cost} руб.</Text>
                            <Text style={[styles.tableCell, styles.tableCol5]}>{el.sum} руб.</Text>
                        </View>
                    )
                })}

                <View style={[styles.section, styles.section5]}>
                    <Text>Итого: {tableSum} руб.</Text>
                </View>

                <View style={[styles.section, styles.section5]}>
                    <Text>FOOTER</Text>
                </View>
            </Page>
        </Document>
    )
}