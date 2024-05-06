import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link, useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainerCopy"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../assets/images/filter.svg"

//import components
import Select from "react-select"

//icons
import del from "../../assets/images/table-delete.svg"
import edit from "../../assets/images/table-edit.svg"

//DeleteModal
import DeleteModal from "../../components/Common/DeleteModal"

import {
  AttendanceModal,
  AttendanceChackInModal,
  AttendanceChackOutModal,
  ChangeAttendanceStatus,
} from "./AttendanceModel"

import {
  WidTotalAttandance,
  WidAttandancePanding,
  WidAttandanceRejected,
  WidAttandanceAprroved,
} from "../../components/Common/Widgets"

// Date Range Picker
import DateRangePicker from "react-bootstrap-daterangepicker"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  Col,
  Row,
  Label,
  Input,
  Form,
  FormGroup,
  Badge,
  Card,
} from "reactstrap"

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
}
//all Months
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const data = [
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "2",
    employe_Name: "bhavil sagaapriya",
    date: "2023-02-03",
    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-03",
    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "4",
    employe_Name: "Krunal lunagriya",
    date: "2023-04-03",
    checkIn: "11:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "5",
    employe_Name: "bhsvil sagapariya",
    date: "2023-04-03",
    checkIn: "01:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Rejected",
  },
  {
    employee_Id: "6",
    employe_Name: "chirag kothiya",
    date: "2023-12-03",
    checkIn: "09:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "7",
    employe_Name: "Krunal lunagriya",
    date: "2023-04-03",
    checkIn: "11:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "8",
    employe_Name: "bhsvil sagapariya",
    date: "2023-04-03",
    checkIn: "01:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Rejected",
  },
  {
    employee_Id: "9",
    employe_Name: "chirag kothiya",
    date: "2023-12-03",
    checkIn: "09:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "10",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "11",
    employe_Name: "bhavil sagaapriya",
    date: "2023-02-03",
    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "12",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-03",
    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "13",
    employe_Name: "Krunal lunagriya",
    date: "2023-04-03",
    checkIn: "11:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
]

const userData = [
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    checkIn: "10:00 AM",
    totalHours: "",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    checkIn: "10:00 AM",
    totalHours: "",

    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    totalHours: "",

    checkIn: "10:00 AM",

    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-01-03",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-03",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-04",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-05",
    totalHours: "",

    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "1",
    employe_Name: "Sahil sagapariya",
    date: "2023-02-06",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "2",
    employe_Name: "bhavil sagaapriya",
    date: "2023-02-07",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-03",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-04",
    totalHours: "",
    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-05",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-06",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-03-07",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "3",
    employe_Name: "dharmik gadhiya",
    date: "2023-04-01",
    totalHours: "",

    checkIn: "10:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
  {
    employee_Id: "4",
    employe_Name: "Krunal lunagriya",
    date: "2023-04-03",
    totalHours: "",

    checkIn: "11:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Approved",
  },
  {
    employee_Id: "5",
    employe_Name: "bhsvil sagapariya",
    date: "2023-04-03",
    totalHours: "",

    checkIn: "01:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Rejected",
  },
  {
    employee_Id: "6",
    employe_Name: "chirag kothiya",
    date: "2023-12-03",
    totalHours: "",

    checkIn: "09:00 AM",
    checkOut: "9:30 PM",
    EmployeeStatus: "Pending",
  },
]

function Attendance() {
  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const { id } = useParams()

  const [openModal, setOpenModal] = useState(false)
  // const [customer, setCustomer] = useState([])
  const [selectedMonth, setSelectedMonth] = useState("")

  const [userAttendanceList, setUserAttendanceList] = useState(
    userData.filter(ele => ele.employee_Id == id)
  )

  const [attendanceList, setAttendanceList] = useState(data)
  const [usersAttendanceList, setUsersAttendanceList] = useState(
    userData.filter(ele => ele.employee_Id == id)
  )
  const [totalCount, setTotalCount] = useState(attendanceList.length)

  const columns = useMemo(
    id
      ? () => [
          {
            Header: "ID",
            accessor: "employee_Id",
            filterable: false,
            disableSortBy: true,
            hidden: true,
          },
          {
            Header: "Date",
            accessor: "date",
            filterable: true,
          },
          {
            Header: "Check In",
            accessor: "checkIn",
            filterable: true,
            Cell: cellProps => {
              return <ActionCheckIn {...cellProps} />
            },
          },
          {
            Header: "Check Out",
            accessor: "checkOut",
            filterable: true,
            Cell: cellProps => {
              return <ActionCheckOut {...cellProps} />
            },
          },
          {
            Header: "Total Hours",
            accessor: "totalHours",
            filterable: true,
            Cell: cellProps => {
              const convertTime12to24 = time12h => {
                const [time, modifier] = time12h.split(" ")

                let [hours, minutes] = time.split(":")

                if (hours === "12") {
                  hours = "00"
                }

                if (modifier === "PM") {
                  hours = parseInt(hours, 10) + 12
                }

                return `${hours}:${minutes}`
              }
              const checkInTime = new Date(
                `${cellProps.row.original.date}T${convertTime12to24(
                  cellProps.row.original.checkIn
                )}`
              )
              const checkOutTime = new Date(
                `${cellProps.row.original.date}T${convertTime12to24(
                  cellProps.row.original.checkOut
                )}`
              )
              const diffInMs = checkOutTime - checkInTime
              const totalHours = diffInMs / 60000
              return (
                <>
                  <div>{totalHours / 60} Hours</div>
                </>
              )
            },
          },
          {
            Header: " Employe Status",
            accessor: "CustomerStatus",
            filterable: true,
            Cell: cellProps => {
              return <AttendanceStatus {...cellProps} />
            },
          },
          {
            Header: "Action",
            accessor: "action",
            disableSortBy: true,
            filterable: false,
            Cell: cellProps => {
              return <AttendanceActions {...cellProps} />
            },
          },
        ]
      : () => [
          {
            Header: "ID",
            accessor: "employee_Id",
            filterable: false,
            disableSortBy: true,
            hidden: true,
          },
          {
            Header: "Employe Name",
            accessor: "employe_Name",
            filterable: true,
            Cell: cellProps => {
              return (
                <div>
                  <Link
                    to={`/attendance-list/${cellProps.row.original.employee_Id}`}
                    className="text-body fw-bold"
                  >
                    <span className="fw-bold text-capitalize">
                      {cellProps.row.original.employe_Name}
                    </span>
                  </Link>
                </div>
              )
            },
          },
          {
            Header: "Date",
            accessor: "date",
            filterable: true,
          },
          {
            Header: "Check In",
            accessor: "checkIn",
            filterable: true,
            Cell: cellProps => {
              return <ActionCheckIn {...cellProps} />
            },
          },
          {
            Header: "Check Out",
            accessor: "checkOut",
            filterable: true,
            Cell: cellProps => {
              return <ActionCheckOut {...cellProps} />
            },
          },
          {
            Header: "Total Hours",
            accessor: "totalHours",
            filterable: true,
            Cell: cellProps => {
              const convertTime12to24 = time12h => {
                const [time, modifier] = time12h.split(" ")

                let [hours, minutes] = time.split(":")

                if (hours === "12") {
                  hours = "00"
                }

                if (modifier === "PM") {
                  hours = parseInt(hours, 10) + 12
                }

                return `${hours}:${minutes}`
              }
              const checkInTime = new Date(
                `${cellProps.row.original.date}T${convertTime12to24(
                  cellProps.row.original.checkIn
                )}`
              )
              const checkOutTime = new Date(
                `${cellProps.row.original.date}T${convertTime12to24(
                  cellProps.row.original.checkOut
                )}`
              )
              const diffInMs = checkOutTime - checkInTime
              const totalHours = diffInMs / 60000
              return (
                <>
                  <div>{totalHours / 60} Hours</div>
                </>
              )
            },
          },
          {
            Header: " Employe Status",
            accessor: "CustomerStatus",
            filterable: true,
            Cell: cellProps => {
              return <AttendanceStatus {...cellProps} />
            },
          },
          {
            Header: "Action",
            accessor: "action",
            disableSortBy: true,
            filterable: false,
            Cell: cellProps => {
              return <AttendanceActions {...cellProps} />
            },
          },
        ]
  )

  const ChangeAttendanceData = e => {
    let selctedMonth = monthNames.indexOf(e.value) + 1
    setAttendanceList(
      [...data].filter(
        item => parseInt(item.date.substring(5, 7)) == selctedMonth
      )
    )
  }

  //set Data Followig selected date
  React.useEffect(() => {
    if (selectedMonth) {
      id
        ? setUserAttendanceList(
            [...usersAttendanceList].filter(
              item => parseInt(item.date.substring(5, 7)) == selectedMonth
            )
          )
        : setAttendanceList(
            [...data].filter(
              item => parseInt(item.date.substring(5, 7)) == selectedMonth
            )
          )
    }
  }, [selectedMonth])

  //set Selected Dates
  const handleDatepicker = (event, picker) => {
    let months =
      monthNames.indexOf(picker.startDate.format("YYYY-MMMM").substring(5)) + 1
    let date =
      picker.startDate.format("D").length == 1
        ? "0" + picker.startDate.format("D")
        : picker.startDate.format("D")

    // let allDates=
    if (months.toString().length == 1) {
      // console.log(

      // ,"2023-01-03")
      let newDate =
        picker.startDate.format("YYYY") + "-" + "0" + months + "-" + date
      id
        ? setUserAttendanceList(data.filter(ele => ele.date.includes(newDate)))
        : setAttendanceList(data.filter(ele => ele.date.includes(newDate)))
    } else {
      let newDate = picker.startDate.format("YYYY") + "-" + months + "-" + date
      id
        ? setUserAttendanceList(data.filter(ele => ele.date.includes(newDate)))
        : setAttendanceList(data.filter(ele => ele.date.includes(newDate)))
    }
  }

  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <div className="server_info">
            <div className="row">
              <div className="col-md-3">
                {id ? (
                  <div className="mb-4 mb-lg-0">
                    <div className="info_content">
                      <div className="info_flex">
                        <p className="fs-5 fw-bold ps-1">
                          {data.map(ele =>
                            ele.employee_Id == id ? ele.employe_Name : ""
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="row mt-3">
              <div
                className="col-md-3"
                onClick={() => {
                  id
                    ? setUserAttendanceList(
                        [...usersAttendanceList].filter(ele => ele)
                      )
                    : setAttendanceList([...data].filter(ele => ele))
                }}
              >
                <WidTotalAttandance
                  data={id ? userAttendanceList : attendanceList}
                ></WidTotalAttandance>
              </div>
              <div
                className="col-md-3"
                onClick={() => {
                  id
                    ? setUserAttendanceList(
                        [...usersAttendanceList].filter(
                          ele => ele.EmployeeStatus == "Pending"
                        )
                      )
                    : setAttendanceList(
                        [...data].filter(ele => ele.EmployeeStatus == "Pending")
                      )
                }}
              >
                <WidAttandancePanding
                  data={id ? userAttendanceList : attendanceList}
                ></WidAttandancePanding>
              </div>
              <div
                className="col-md-3"
                onClick={() => {
                  id
                    ? setUserAttendanceList(
                        [...usersAttendanceList].filter(
                          ele => ele.EmployeeStatus == "Approved"
                        )
                      )
                    : setAttendanceList(
                        [...data].filter(
                          ele => ele.EmployeeStatus == "Approved"
                        )
                      )
                }}
              >
                <WidAttandanceAprroved
                  data={id ? userAttendanceList : attendanceList}
                ></WidAttandanceAprroved>
              </div>
              <div
                className="col-md-3"
                onClick={() => {
                  id
                    ? setUserAttendanceList(
                        [...usersAttendanceList].filter(
                          ele => ele.EmployeeStatus == "Rejected"
                        )
                      )
                    : setAttendanceList(
                        [...data].filter(
                          ele => ele.EmployeeStatus == "Rejected"
                        )
                      )
                }}
              >
                <WidAttandanceRejected
                  data={id ? userAttendanceList : attendanceList}
                ></WidAttandanceRejected>
              </div>
            </div>
          </div>
          <Row>
            <Col md="5">
              <FormGroup floating>
                {id ? (
                  <Col md="6">
                    <FormGroup floating>
                      <Select
                        name="shiftFromType"
                        classNamePrefix="select-v1"
                        options={monthNames.map(item => {
                          return { label: item, value: item }
                        })}
                        // defaultValue={{ label: "Full Day", value: "fullday" }}
                        onChange={e => {
                          setSelectedMonth(monthNames.indexOf(e.value) + 1)
                        }}
                        styles={customStyles}
                        placeholder="Select Month"
                      />
                    </FormGroup>
                  </Col>
                ) : (
                  <Col md="6">
                    <Label>Search Date:</Label>
                    <DateRangePicker
                      initialSettings={{
                        singleDatePicker: true,
                        showDropdowns: true,
                      }}
                      onApply={(event, picker) =>
                        handleDatepicker(event, picker)
                      }
                    >
                      <input
                        name="leaveFrom"
                        // onChange={() => handleDatepickerValidation()}
                        type="text"
                        style={{
                          border: "none",
                          borderRadius: "10px",
                          backgroundColor: "rgb(73 80 87 / 23%)",
                        }}
                        className="form-control fw-bold text-dark text-center"
                      />
                    </DateRangePicker>
                    {/* {validation.touched.leaveFrom && validation.errors.leaveFrom ? (
                <p style={{ color: "red" }}>{validation.errors.leaveFrom}</p>
              ) : null} */}
                    {/* {errors ? (
                <p>Please Select A Leaves Dates</p>
              // ) : null} */}
                  </Col>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div className="table_v1">
                <TableContainer
                  tableClassName="product-table table-shadow"
                  columns={columns}
                  data={id ? userAttendanceList : attendanceList}
                  totalCount={totalCount}
                  isGlobalFilter={true}
                  isAddCustomer={true}
                  isAddTableBorderStrap={true}
                  //   handleCustomerClicks={handleCustomerClicks}
                  getTablePropsC={() => ({
                    className: "product-table",
                  })}
                />
              </div>
            </Col>
          </Row>
          <AttendanceModal
            show={openModal}
            onCloseClick={() => setOpenModal(false)}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
Attendance.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default Attendance

const AttendanceActions = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeAttendance = () => {
    console.log(cell.row.original)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.employee_Id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col lg={4}>
          <button
            className="btn btn-transparent"
            onClick={() => setOpenAttendanceEdit(true)}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col lg={8}>
          <button
            className="btn btn-transparent"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>

      <AttendanceModal
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

const ActionCheckIn = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)

  //Edit
  const handleAttendanceEdit = () => {
    console.log(cell.row.original.id)
    setOpenAttendanceEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleAttendanceEdit}
      >
        {cell.row.original.checkIn}
      </Badge>
      <AttendanceChackInModal
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
    </div>
  )
}
const ActionCheckOut = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  //CheckIn Model
  const handleAttendanceEdit = () => {
    console.log(cell.row.original.id)
    setOpenAttendanceEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleAttendanceEdit}
      >
        {cell.row.original.checkOut}
      </Badge>
      <AttendanceChackOutModal
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
    </div>
  )
}
const AttendanceStatus = cell => {
  const [openStatusModal, setOpenStatusModal] = React.useState(false)
  const handleAttendanceStatus = () => {
    setOpenStatusModal(true)
  }
  return (
    <div className="d-flex">
      <div className="status_block">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.row.original.EmployeeStatus === "Approved"
              ? "success"
              : ("danger" && cell.row.original.EmployeeStatus === "pending") ||
                "Rejected"
              ? "danger"
              : "")
          }
          style={{ cursor: "pointer" }}
          onClick={() => handleAttendanceStatus()}
        >
          {cell.row.original.EmployeeStatus}
        </Badge>
      </div>
      <ChangeAttendanceStatus
        show={openStatusModal}
        onCloseClick={() => setOpenStatusModal(false)}
      />
    </div>
  )
}
