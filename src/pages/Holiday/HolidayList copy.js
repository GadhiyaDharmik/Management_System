import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../../components/Common/TableContainerCopy"
//redux

import HolidayModel from "./HolidayModel"

import del from "../../../assets/images/table-delete.svg"
import edit from "../../../assets/images/table-edit.svg"

import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

import DeleteModal from "../../../components/Common/DeleteModal"

import {Actions,Location} from './CellpropsData'

const data = [
  {
    holidayId: "1",
    shiftName: "Day",
    holidayOn: "2023-03-03",
    location: "Office",
    details: "Chrismas is a fastival for enjoy ment",
    holiday: "Chrismas",
  },
  {
    holidayId: "2",
    shiftName: "Holiday",
    holidayOn: "2023-03-03",
    location: "home",
    details: "Diwali is a fastival for enjoy ment",
    holiday: "Diwali",
  },
  {
    holidayId: "3",
    shiftName: "Holiday",
    holidayOn: "2023-03-03",
    location: "home",
    details: "Utrayan is a fastival for enjoy ment",
    holiday: "Utrayan",
  },
  {
    holidayId: "4",
    shiftName: "Holiday",
    holidayOn: "2023-03-03",
    location: "home",
    details: "Holi is a fastival for enjoy ment",
    holiday: "Holi",
  },
  {
    holidayId: "5",
    shiftName: "Full Day",
    holidayOn: "2023-03-03",
    location: "Office",
    details: "Dhulaty is a fastival for enjoy ment",
    holiday: "Dhulaty",
  },
  {
    holidayId: "6",
    shiftName: "Holiday",
    holidayOn: "2023-03-03",
    location: "home",
    details: "Shivratri is a fastival for enjoy ment",
    holiday: "Shivratri",
  },
]

function DatatableTables() {
  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  //Add Holiday Modal
  const [openModal, setOpenModal] = useState(false)
  const [holidayList, setHolidayList] = useState(data)

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([])

  const columns = useMemo(() => [
    {
      Header: "Holiday Id",
      accessor: "holidayId",
      filterable: true,
    },
    {
      Header: "Holiday Name",
      accessor: "holiday",
      filterable: true,
      Cell: cellProps => {
        return (
          <div>
            <span className="fw-bold fs-5 text-capitalize">
              {cellProps.row.original.holiday}
            </span>
          </div>
        )
      },
    },
    {
      Header: "Holiday Shift",
      accessor: "shiftName",
      filterable: true,
    },
    {
      Header: "Details",
      accessor: "details",
      filterable: true,
    },
    {
      Header: "Holiday Date",
      accessor: "holidayOn",
      filterable: true,
      formatter: (cellContent, row) => handleValidDate(row.holidayOn),
    },
    // {
    //   Header: "Next Due",
    //   accessor: "nextDue",

    // },
    {
      Header: "Location",
      accessor: "location",
      filterable: true,
      Cell: cellProps => {
        return <Location {...cellProps} />
      },
    },
    {
      Header: "Actions",
      accessor: "Actions",
      filterable: true,
      Cell: cellProps => {
        return <Actions {...cellProps} />
      },
    },
  ])
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <div className="tab_content p-0 bg-transparent manage-tab">
            <Row className="">
              <Col md="10">
                <form className="app-search d-lg-block p-0 search-v1">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Employee Detail"
                    />
                    <span className="uil-search"></span>
                  </div>
                </form>
              </Col>
              <Col md="2">
                <button
                  className="btn pb-3 pt-3 btn-invoice"
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  <div>
                    <i className="uil-plus"></i>
                  </div>
                  {"  "}Add Holiday
                </button>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs="12">
              <div className="table_v1">
                <TableContainer
                  tableClassName="product-table table-shadow"
                  columns={columns}
                  data={holidayList}
                  isGlobalFilter={true}
                  isAddCustomer={true}
                  isAddTableBorderStrap={true}
                  getTablePropsC={() => ({
                    className: "product-table",
                  })}
                />
              </div>
            </Col>
          </Row>

          <HolidayModel
            show={openModal}
            onCloseClick={() => setOpenModal(false)}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
DatatableTables.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default DatatableTables

//All Cells
