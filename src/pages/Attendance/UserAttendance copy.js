import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../../components/Common/TableContainerCopy"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../../assets/images/filter.svg"

import ToogleSwitch from "../../../components/Common/ToogleSwitch"

//import components
import Select from "react-select"
import { Modal, ModalBody } from "reactstrap"

import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
  getInvoicesList as onGetInvoicesList,
} from "../../../store/actions"

// import {
//   AttendanceActions,
//   ActionCheckIn,
//   TotalHours,
//   ActionCheckOut,
// } from "../../Ecommerce/EcommerceCustomers/EcommerceCustomerCol"

//redux
import { useSelector, useDispatch } from "react-redux"

import { ServerIcon1 } from "../../../components/Common/CommonSvg"
import { ServerIcon3 } from "../../../components/Common/CommonSvg"
import { ServerIcon4 } from "../../../components/Common/CommonSvg"
import { ServerIcon2 } from "../../../components/Common/CommonSvg"

import {
  WidServer,
  WidInvoice,
  WidTicket,
  WidBalance,
} from "../../../components/Common/Widgets"

import { Col, Row, Label, Input, Form, FormGroup } from "reactstrap"

import { AttendanceModal } from "./AttendanceModel"
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

function UserAttendance({ id, selectedMonth }) {
  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [customer, setCustomer] = useState([])
  const [attendanceList, setAttendanceList] = useState(userData)

  // const [AttendanceList,setAttendanceList]=useState()
  // validation
  //   const validation = useFormik({
  //     // enableReinitialize : use this flag when initial values needs to be changed
  //     enableReinitialize: true,

  //     initialValues: {
  //       customerid: (customer && customer.customerid) || "",
  //       customerName: (customer && customer.customerName) || "",
  //       joiningDate: (customer && customer.joiningDate) || "",
  //       email: (customer && customer.email) || "",
  //       customerStatus: (customer && customer.customerStatus) || "Active",
  //       badgeclass: (customer && customer.badgeclass) || "success",
  //     },
  //     validationSchema: Yup.object({
  //       customerid: Yup.string().required("Please Enter Your Order Id"),
  //       customerName: Yup.string().required("Please Enter Your Billing Name"),
  //       joiningDate: Yup.string().required("Please Enter Your Order Date"),
  //       email: Yup.string().required("Total Amount"),
  //       customerStatus: Yup.string().required("Please Enter Your Payment Status"),
  //       badgeclass: Yup.string().required("Please Enter Your Badge Class"),
  //     }),
  //     onSubmit: values => {
  //       if (isEdit) {
  //         const updateCustomer = {
  //           id: customer ? customer.id : 0,
  //           customerid: values.customerid,
  //           customerName: values.customerName,
  //           joiningDate: values.joiningDate,
  //           email: values.email,
  //           customerStatus: values.customerStatus,
  //           badgeclass: values.badgeclass,
  //         }

  //         // update customer
  //         dispatch(onUpdateCustomer(updateCustomer))
  //         validation.resetForm()
  //       } else {
  //         const newCustomer = {
  //           id: Math.floor(Math.random() * (30 - 20)) + 20,
  //           customerid: values["customerid"],
  //           customerName: values["customerName"],
  //           joiningDate: values["joiningDate"],
  //           email: values["email"],
  //           customerStatus: values["customerStatus"],
  //           badgeclass: values["badgeclass"],
  //         }

  //         // save new customer
  //         dispatch(onAddNewCustomer(newCustomer))
  //         validation.resetForm()
  //       }
  //       toggle()
  //     },
  //   })

  // const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch()
  // const { customers } = useSelector((state) => ({
  //   customers: state.ecommerce.customers,
  // }));

  const { invoicesList } = useSelector(state => ({
    invoicesList: state.invoices.invoicesList,
  }))
  // console.log("invoice list", invoicesList)
  // useEffect(() => {
  //   if (customers && !customers.length) {
  //     dispatch(onGetCustomers());
  //   }
  // }, [dispatch, customers]);

  // useEffect(() => {
  //   if (customers && !customers.length) {
  //     dispatch(onGetCustomers());
  //   }
  // }, [dispatch, customers]);

  // for api integration

  useEffect(() => {
    let config = {
      params: {
        command: "whmcs_invoicelist",
        debug: 1,
      },
    }

    if (invoicesList && !invoicesList.length) {
      dispatch(onGetInvoicesList(config))
    }
  }, [dispatch])

  // useEffect(() => {
  //   setCustomerList(customers);
  // }, [customer]);

  // useEffect(() => {
  //   if (!isEmpty(customers) && !!isEdit) {
  //     setCustomerList(customers);
  //     setIsEdit(false);
  //   }
  // }, [customers]);

  //   const toggle = () => {
  //     if (modal) {
  //       setModal(false)
  //       setCustomer(null)
  //     } else {
  //       setModal(true)
  //     }
  //   }

  //   const handleCustomerClick = arg => {
  //     const customer = arg
  //     setCustomer({
  //       id: customer.id,
  //       customerid: customer.customerid,
  //       customerName: customer.customerName,
  //       joiningDate: customer.joiningDate,
  //       email: customer.email,
  //       customerStatus: customer.customerStatus,
  //       badgeclass: customer.badgeclass,
  //     })

  //     setIsEdit(true)

  //     toggle()
  //   }

  //delete customer
  //   const [deleteModal, setDeleteModal] = useState(false)

  //   const onClickDelete = customer => {
  //     setCustomer(customer)
  //     setDeleteModal(true)
  //   }

  //   const handleDeleteCustomer = () => {
  //     if (customer.id) {
  //       dispatch(onDeleteCustomer(customer))
  //       setDeleteModal(false)
  //     }
  //   }
  //   const handleCustomerClicks = () => {
  //     setCustomerList("")
  //     setIsEdit(false)
  //     toggle()
  //   }

  const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "employee_Id",
      filterable: false,
      disableSortBy: true,
    },

    {
      Header: "Employe Name",
      accessor: "employe_Name",
      filterable: true,
      Cell: cellProps => {
        return (
          <div>
            <span className="fw-bold text-capitalize">
              {cellProps.row.original.employe_Name}
            </span>
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
      accessor: "EmployeeStatus",
      filterable: true,
      Cell: cellProps => {
        return <AttendanceStatus {...cellProps} />
      },
    },
    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      filterable: true,
      Cell: cellProps => {
        return <AttendanceActions {...cellProps} />
      },
    },
  ])

  React.useEffect(() => {
    if (selectedMonth) {
      setAttendanceList(
        [...data].filter(
          item => parseInt(item.date.substring(5, 7)) == selectedMonth
        )
      )
    }
  }, [selectedMonth])

  return (
    <React.Fragment>
      {/*<div className="server_info">
            <div className="row">
              <div className="col">
                <WidServer></WidServer>
              </div>
              <div className="col">
                <WidInvoice></WidInvoice>
              </div>
              <div className="col">
                <WidTicket></WidTicket>
              </div>
              <div className="col">
                <WidBalance></WidBalance>
              </div>
            </div>
          </div> */}
      <div className="tab-pane fade show active">
        <div className="tab_content tab-data-table">
          <div className="table_v1">
            <TableContainer
              tableClassName="product-table table-shadow"
              columns={columns}
              data={
                id ? data.filter(ele => ele.employee_Id == id) : attendanceList
              }
              isGlobalFilter={true}
              isAddCustomer={true}
              isAddTableBorderStrap={true}
              //   handleCustomerClicks={handleCustomerClicks}
              getTablePropsC={() => ({
                className: "product-table",
              })}
            />
          </div>
        </div>
      </div>

      <AttendanceModal
        show={openModal}
        onCloseClick={() => setOpenModal(false)}
      />
    </React.Fragment>
  )
}
UserAttendance.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default UserAttendance

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

//Attendance Status Modal
const ChangeAttendanceStatus = ({ show, onCloseClick }) => {
  const [attendanceStatus, setAttendanceStatus] = React.useState("Panding")
  const [openStatus, setOpenStatus] = React.useState(false)

  const onApprovedClick = () => {
    setAttendanceStatus("Approved")
    onCloseClick()
  }
  const onRejectClick = () => {
    setAttendanceStatus("Rejected")
    onCloseClick()
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Form
          className="form-horizontal floating-form my-account"
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()
            return false
          }}
        >
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <i
                  className="mdi mdi-alert-circle-outline"
                  style={{ fontSize: "9em", color: "orange" }}
                />
                <h2>Are you sure?</h2>
                <h4>{"You won't be able to revert this!"}</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-success btn-lg ms-2"
                  onClick={onApprovedClick}
                >
                  Yes, Approved it!
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg ms-2"
                  onClick={onRejectClick}
                >
                  Yes, Reject it!
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}
