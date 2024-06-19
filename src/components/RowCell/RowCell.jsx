import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';

import JobTicketPDF from "../JobTicketPDF/JobTicketPDF"

import "./RowCell.sass"

export default function RowCell({ data, page, updateDB, updateCostDB, updateCountDB, storageFromBD, worksFromDb }) {

    let cellData = {}

    switch (page) {
        case "job-tickets":
            cellData = {
                content: () => {
                    return (<>
                        <p className="table-row-cell">{data.title}</p>
                        <p className="table-row-cell">{data.date}</p>
                        <p className="table-row-cell">{data.clientName}</p>
                        <p className="table-row-cell">
                            <PDFDownloadLink document={<JobTicketPDF data={data} storageFromBD={storageFromBD} worksFromDb={worksFromDb} />} fileName="заказ-наряд.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                        </p>
                    </>)
                }
            }
            break;
        case "storage":
            cellData = {
                content: () => {
                    return (<>
                        <p className="table-row-cell">{data.name}</p>
                        <p className="table-row-cell">
                            <span className="table-row-cell__text">{data.cost} руб.</span>
                            <button onClick={(e) => editHandler(e)} className='table-row-cell__btn table-row-cell__btn--edit'>
                                <EditOutlined />
                            </button>
                            <button onClick={(e) => saveHandler(e, "cost")} className='table-row-cell__btn table-row-cell__btn--save'>
                                <CheckOutlined />
                            </button>
                            <input className="table-row-cell__input" name="cost" type="number" min="0" placeholder={data.cost} />
                        </p>
                        <p className="table-row-cell">
                            <span className="table-row-cell__text">{data.count}</span>
                            <button onClick={(e) => editHandler(e)} className='table-row-cell__btn table-row-cell__btn--edit'>
                                <EditOutlined />
                            </button>
                            <button onClick={(e) => saveHandler(e, "count")} className='table-row-cell__btn table-row-cell__btn--save'>
                                <CheckOutlined />
                            </button>
                            <input className="table-row-cell__input" name="count" type="number" min="0" placeholder={data.count} />
                        </p>
                    </>)
                }
            }
            break;

        case "works":
            cellData = {
                content: () => {
                    return (<>
                        <p className="table-row-cell">{data.name}</p>
                        <p className="table-row-cell">
                            <span className="table-row-cell__text">{data.cost} руб.</span>
                            <button onClick={(e) => editHandler(e)} className='table-row-cell__btn table-row-cell__btn--edit'>
                                <EditOutlined />
                            </button>
                            <button onClick={(e) => saveHandler(e)} className='table-row-cell__btn table-row-cell__btn--save'>
                                <CheckOutlined />
                            </button>
                            <input className="table-row-cell__input" name="cost" type="number" min="0" placeholder={data.cost} />
                        </p>
                    </>)
                }
            }
            break;

        case "clients":
            cellData = {
                content: () => {
                    return (<>
                        <p className="table-row-cell">{data.name}</p>
                        <p className="table-row-cell">
                            <span className="table-row-cell__text">{data.phone}</span>
                            <button onClick={(e) => editHandler(e)} className='table-row-cell__btn table-row-cell__btn--edit'>
                                <EditOutlined />
                            </button>
                            <button onClick={(e) => saveHandler(e)} className='table-row-cell__btn table-row-cell__btn--save'>
                                <CheckOutlined />
                            </button>
                            <input className="table-row-cell__input" name="cost" type="number" min="0" placeholder={data.cost} />
                        </p>
                        <p className="table-row-cell">{data.model}</p>
                        <p className="table-row-cell">{data.number}</p>
                    </>)
                }
            }
            break;

        default:
            break;
    }

    const editHandler = (e) => {
        let target = e.target
        let parent = target.closest(".table-row-cell")
        let input = parent.querySelector(".table-row-cell__input")
        input.classList.add("table-row-cell__input--visible")

        let btnEdit = parent.querySelector(".table-row-cell__btn--edit")
        btnEdit.classList.add("table-row-cell__btn--hidden")

        let btnSave = parent.querySelector(".table-row-cell__btn--save")
        btnSave.classList.add("table-row-cell__btn--visible")
    }

    const saveHandler = (e, key) => {
        let target = e.target
        let parent = target.closest(".table-row-cell")
        let input = parent.querySelector(".table-row-cell__input")
        input.classList.remove("table-row-cell__input--visible")

        let btnEdit = parent.querySelector(".table-row-cell__btn--edit")
        btnEdit.classList.remove("table-row-cell__btn--hidden")

        let btnSave = parent.querySelector(".table-row-cell__btn--save")
        btnSave.classList.remove("table-row-cell__btn--visible")

        if (page==="storage") {
            if (key==="cost") {
                updateCostDB(data.id, input.value)
            } else if (key==="count") {
                updateCountDB(data.id, input.value)
            }
        } else {
            updateDB(data.id, input.value)
        }

    }


    return (
        <>
           {cellData.content()}
        </>
    )
}
