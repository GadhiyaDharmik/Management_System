import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
//redux

import HolidayModel from "./HolidayModel"

// import Table from "../../components/Common/Table"

import del from "../../assets/images/table-delete.svg"
import edit from "../../assets/images/table-edit.svg"

import { useDispatch, useSelector } from "react-redux"

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
  Card,
  CardBody,
  CardHeader,
} from "reactstrap"

import DeleteModal from "../../components/Common/DeleteModal"

//Actions
import {
  getHolidayList,
  editHoliday,
  deleteHolidayes,
} from "../../store/actions"

// import { Actions, Location } from "./CellpropsData"

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
}

function HolidayList() {
  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const dispatch = useDispatch()

  //Add Holiday Modal
  const [openModal, setOpenModal] = useState(false)

  const data = [
    {
      id: "1",
      shiftName: "Day",
      holidayOn: "2023-03-03",
      location: "Office",
      details: "Chrismas is a fastival for enjoy ment",
      holiday: "Chrismas",
    },
    {
      id: "2",
      shiftName: "Holiday",
      holidayOn: "2023-03-03",
      location: "home",
      details: "Diwali is a fastival for enjoy ment",
      holiday: "Diwali",
    },
    {
      id: "3",
      shiftName: "Holiday",
      holidayOn: "2023-03-03",
      location: "home",
      details: "Utrayan is a fastival for enjoy ment",
      holiday: "Utrayan",
    },
    {
      id: "4",
      shiftName: "Holiday",
      holidayOn: "2023-03-03",
      location: "home",
      details: "Holi is a fastival for enjoy ment",
      holiday: "Holi",
    },
    {
      id: "5",
      shiftName: "Full Day",
      holidayOn: "2023-03-03",
      location: "Office",
      details: "Dhulaty is a fastival for enjoy ment",
      holiday: "Dhulaty",
    },
    {
      id: "6",
      shiftName: "Holiday",
      holidayOn: "2023-03-03",
      location: "home",
      details: "Shivratri is a fastival for enjoy ment",
      holiday: "Shivratri",
    },
  ]
  // useState(useSelector(state => state.holiday.holidays))

  const holiday = useSelector(state => state.holidayListData.holidayList)

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([])
  const [totalCount, setTotalCount] = useState(15)
  const [searchText, setSearchText] = useState([])
  const [sortOrder, setSortOrder] = useState([])
  // const [sort]
  // console.log(useSelector(state => state.holiday.holiday))
  const [state, setState] = useState({
    page: 1,
    sizePerPage: 1111,
    searchText: "",
    sortOrder: "",
    sortField: "",
  })
  const holidayData = useSelector(state => state.holidayListData.holidays)
  // console.log(useSelector(state => state.holiday.holidays))

  //Call API
  React.useEffect(() => {
    dispatch(getHolidayList(state))
  }, [])

  //Cell Componants
  const actionsFormatter = (cell, row) => <HolidayActions data={row} />

  const columns = [
    {
      text: "Holidays",
      dataField: "holiday",
      width: 270,
      sort: true,
      footer: ""
    },
    {
      text: "Shift Name",
      dataField: "employeeShift",
      width: 200,
      sort: true,
      formatter: shiftNames,
      footer: ""

    },
    {
      text: "Holiday Date",
      dataField: "holidayOn",
      width: 150,
      sort: true,
      footer: ""
    },
    {
      text: "Location",
      dataField: "location",
      width: 150,
      sort: true,
      footer: ""
      // formatter: statusEvent,
    },
    {
      text: "Details",
      dataField: "details",
      width: 150,
      sort: true,
      // formatter: statusEvent,
      footer: "Total"
      
    },
    {
      dataField: "action",
      text: "Action",
      // formatter: actionEvent,
      sort: false,
      headerAlign: "center",
      align: "center",
      formatter: actionsFormatter,
      footer: "123"
    },
  ]

  function shiftNames(cell, row, rowIndex, formatExtraData) {
    return <div className="d-flex">{row.employeeShift.shiftName}</div>
  }

  // function QualityRanger(...data) {
  //   return (

  //   )
  // }

  function handleTableChange(type, eventData) {
    console.log(type, eventData)
  }
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <Card>
          <CardHeader>
            <div className="tab_content p-0 bg-transparent manage-tab">
              <Row>
                <Col md="12" className="text-end">
                  <button
                    className="btn pb-3 pt-6 btn-invoice"
                    onClick={() => {
                      setOpenModal(true)
                    }}
                  >
                    <div>
                      <i className="uil-plus"></i>
                    </div>
                    {"  "}Add New
                  </button>
                </Col>
              </Row>
            </div>
          </CardHeader>
          <CardBody>
            <div className="container-fluid">
              <Row>
                <Col xs="12">
                  <div className="table_v1">
                    {/* <Table
                      data={holidayData}
                      page={state.page}
                      sizePerPage={state.sizePerPage}
                      totalSize={totalCount}
                      onTableChange={handleTableChange}
                      columns={columns}
                      noDataIndication={"No Data Found"}
                      // loading={isSpinner}
                    /> */}
                  </div>
                </Col>
              </Row>
              <HolidayModel
                show={openModal}
                id=""
                onCloseClick={() => setOpenModal(false)}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  )
}
HolidayList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default HolidayList

const HolidayActions = ({ data }) => {
  const dispatch = useDispatch()
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeAttendance = () => {
    dispatch(editHoliday(data))
    setOpenAttendanceEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    // dispatch(editHoliday(data))
    dispatch(deleteHolidayes(data.id))
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row className="g-2">
        <Col lg={6}>
          <button
            className="btn btn-transparent"
            onClick={handleEditEmployeeAttendance}
            style={{ cursor: "pointer" }}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col lg={6}>
          <button
            className="btn btn-transparent"
            onClick={() => setDeleteModal(true)}
            style={{ cursor: "pointer" }}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>

      <HolidayModel
        id={data.id}
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

// const ActionCheckIn = cell => {
//   const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)

//   //Edit
//   const handleAttendanceEdit = () => {
//     console.log(cell.row.original.id)
//     setOpenAttendanceEdit(true)
//   }

//   return (
//     <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
//       <Badge
//         className="badge badge-pill bg-pill font-size-12 bg-soft-success"
//         style={{ cursor: "pointer" }}
//         onClick={handleAttendanceEdit}
//       >
//         {cell.row.original.checkIn}
//       </Badge>
//       <AttendanceChackInModal
//         show={openAttendanceEdit}
//         onCloseClick={() => setOpenAttendanceEdit(false)}
//       />
//     </div>
//   )
// }
// const ActionCheckOut = cell => {
//   const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
//   //CheckIn Model
//   const handleAttendanceEdit = () => {
//     console.log(cell.row.original.id)
//     setOpenAttendanceEdit(true)
//   }

//   return (
//     <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
//       <Badge
//         className="badge badge-pill bg-pill font-size-12 bg-soft-success"
//         style={{ cursor: "pointer" }}
//         onClick={handleAttendanceEdit}
//       >
//         {cell.row.original.checkOut}
//       </Badge>
//       <AttendanceChackOutModal
//         show={openAttendanceEdit}
//         onCloseClick={() => setOpenAttendanceEdit(false)}
//       />
//     </div>
//   )
// }
// const AttendanceStatus = cell => {
//   const [openStatusModal, setOpenStatusModal] = React.useState(false)
//   const handleAttendanceStatus = () => {
//     setOpenStatusModal(true)
//   }
//   return (
//     <div className="d-flex">
//       <div className="status_block">
//         <Badge
//           className={
//             "badge badge-pill bg-pill font-size-12 bg-soft-" +
//             (cell.row.original.EmployeeStatus === "Approved"
//               ? "success"
//               : ("danger" && cell.row.original.EmployeeStatus === "pending") ||
//                 "Rejected"
//               ? "danger"
//               : "")
//           }
//           style={{ cursor: "pointer" }}
//           onClick={() => handleAttendanceStatus()}
//         >
//           {cell.row.original.EmployeeStatus}
//         </Badge>
//       </div>
//       <ChangeAttendanceStatus
//         show={openStatusModal}
//         onCloseClick={() => setOpenStatusModal(false)}
//       />
//     </div>
//   )
// }
