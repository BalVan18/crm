import React from 'react';
import {Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';

export default function StoragePDF({data}) {
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

    function getCurrentDateFormatted() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = now.getFullYear();

        return `${day}.${month}.${year}`;
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.section, styles.section1]}>
                    <Text style={[styles.text]}>Дата формирования {getCurrentDateFormatted()}</Text>
                </View>

                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableCol1]}></Text>
                    <Text style={[styles.tableCell, styles.worksTableHeaderCol2]}>Наименование</Text>
                    <Text style={[styles.tableCell, styles.worksTableCol3]}>Колличество</Text>
                </View>
                {data.map((el, index) => {
                    return (
                        <View key={index} style={[styles.tableRow]}>
                            <Text style={[styles.tableCell, styles.tableCol1]}>№{index + 1}</Text>
                            <Text style={[styles.tableCell, styles.worksTableCol2]}>{el.name}</Text>
                            <Text style={[styles.tableCell, styles.worksTableCol3]}>{el.count} шт.</Text>
                        </View>
                    )
                })}
            </Page>
        </Document>
    )
}
