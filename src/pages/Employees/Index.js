import React, { useEffect, useMemo, useState } from "react"
//react router
import { useParams } from "react-router-dom"
import { Card, CardBody, FormGroup } from "reactstrap"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainerCopy"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../assets/images/filter.svg"
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CombineDotVerticle } from "../../components/Common/CommonSvg"
import {
  WidServer,
  WidInvoice,
  WidTicket,
  WidBalance,
  WidAppServer,
  WidLocation,
  WidStatusInfo,
} from "../../components/Common/Widgets"
import header from "../../assets/images/header.svg"
import reset from "../../assets/images/reset.svg"
import gradiant from "../../assets/images/gradiant.svg"
import { Tab } from "bootstrap"
import Select from "react-select"
// import {
//   getCustomers as onGetCustomers,
//   addNewCustomer as onAddNewCustomer,
//   updateCustomer as onUpdateCustomer,
//   deleteCustomer as onDeleteCustomer,
// } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import ServerManageMenu from "../../components/CommonForBoth/TopbarDropdown/ServerManageMenu"
import { ServerIcon1 } from "../../components/Common/CommonSvg"
import { ServerIcon2 } from "../../components/Common/CommonSvg"
import { ServerIcon3 } from "../../components/Common/CommonSvg"
import { ServerIcon4 } from "../../components/Common/CommonSvg"
import { Technical1 } from "../../components/Common/CommonSvg"
import { Technical2 } from "../../components/Common/CommonSvg"
import { Technical3 } from "../../components/Common/CommonSvg"
import { Technical4 } from "../../components/Common/CommonSvg"
import { Technical5 } from "../../components/Common/CommonSvg"

/************************* Pages ************************* */
import UserAttendance from "../Attendance/UserAttendance"
import Salary from "../Employees/Salary"

/************************* Pages ************************* */

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

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
}

import DeleteModal from "../../components/Common/DeleteModal"

import user4 from "../../assets/images/small/img-5.jpg"

const employeeData = [
  {
    image: user4,
    id: 1,
    employeName: "sahil sagapariya",
    email: "sahilsgapariya@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 2,
    employeName: "dharmik gadhiya",
    email: "dharmikdadhiya@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "70,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 3,
    employeName: "bhavil sagapariya",
    email: "bhavilsgapariya@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 4,
    employeName: "chirag kothiya",
    email: "chiregkothiya@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 5,
    employeName: "avni rupareliya",
    email: "aavnirupareliya@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 6,
    employeName: "priya patel",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 7,
    employeName: "sruti patoliya",
    email: "shrutipatel@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 8,
    employeName: "krunal lunagriya",
    email: "krunalpatel@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
  {
    image: user4,
    id: 9,
    employeName: "bhavesh chavda",
    email: "bhaveshchavda@gmail.com",
    Department: "HR",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "04-11-2022",
    password: "12345678",
    Status: "Active",
  },
]

function DatatableTables() {
  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([])
  const [selectedMonth, setSelectedMonth] = useState("")

  //to get id from url
  const { id } = useParams()

  //to store perticular employee Deatil
  const [employeeDetail, setEmployeeDetail] = useState(
    employeeData.filter(employee => employee.id == id)
  )
  // console.log(employeeDetail)
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      customerid: (customer && customer.customerid) || "",
      customerName: (customer && customer.customerName) || "",
      joiningDate: (customer && customer.joiningDate) || "",
      email: (customer && customer.email) || "",
      customerStatus: (customer && customer.customerStatus) || "Active",
      badgeclass: (customer && customer.badgeclass) || "success",
    },
    validationSchema: Yup.object({
      customerid: Yup.string().required("Please Enter Your Order Id"),
      customerName: Yup.string().required("Please Enter Your Billing Name"),
      joiningDate: Yup.string().required("Please Enter Your Order Date"),
      email: Yup.string().required("Total Amount"),
      customerStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          customerid: values.customerid,
          customerName: values.customerName,
          joiningDate: values.joiningDate,
          email: values.email,
          customerStatus: values.customerStatus,
          badgeclass: values.badgeclass,
        }

        // update customer
        // dispatch(onUpdateCustomer(updateCustomer))
        validation.resetForm()
      } else {
        const newCustomer = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          customerid: values["customerid"],
          customerName: values["customerName"],
          joiningDate: values["joiningDate"],
          email: values["email"],
          customerStatus: values["customerStatus"],
          badgeclass: values["badgeclass"],
        }

        // save new customer
        // dispatch(onAddNewCustomer(newCustomer))
        validation.resetForm()
      }
      toggle()
    },
  })

  // const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch()
  const toggle = () => {
    if (modal) {
      setModal(false)
      setCustomer(null)
    } else {
      setModal(true)
    }
  }
  const options = [
    {
      value: "GRML Linux Rescue Image (amd64)",
      label: "GRML Linux Rescue Image (amd64)",
    },
    {
      value: "GRML Linux Rescue Image (amd64) 1",
      label: "GRML Linux Rescue Image (amd64) 1",
    },
    {
      value: "GRML Linux Rescue Image (amd64) 2",
      label: "GRML Linux Rescue Image (amd64) 2",
    },
  ]

  const options2 = [
    { value: "Customised", label: "Customised" },
    { value: "Customised 1", label: "Customised 1" },
    { value: "Customised 2", label: "Customised 2" },
  ]
  const options3 = [
    { value: "Immediate", label: "Immediate" },
    { value: "Immediate 1", label: "Immediate 1" },
    { value: "Immediate 2", label: "Immediate 2" },
  ]

  const [modal_backdrop, setmodal_backdrop] = useState(false)

  const [modal_backdrop_cancel, setmodal_backdrop_cancel] = useState(false)

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop)
    removeBodyCss()
  }

  function tog_backdrop_cancel() {
    setmodal_backdrop_cancel(!modal_backdrop_cancel)
    removeBodyCss()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }
  const customStyles = {
    control: base => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
  }

  const columns = useMemo(
    () => [
      {
        Header: "IP Address",
        accessor: "ipaddress",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Gateway",
        accessor: "gateway",
        disableGlobalFilter: true,
        disableSortBy: false, // if true the sortBy is disabled and remove sort icons
        filterable: true,
      },
      {
        Header: "Null Routed",
        accessor: "value",
        filterable: true.valueOf,
        Cell: cellProps => {
          return <NullRouted {...cellProps} />
        },
      },
      {
        Header: "Reverse DNS",
        accessor: "reverse",
        disableGlobalFilter: true,
        disableSortBy: false, // if true the sortBy is disabled and remove sort icons
        filterable: true,
      },
      {
        Header: "DDOS Protection",
        accessor: "ddosprotection",
        disableGlobalFilter: true,
        disableSortBy: false, // if true the sortBy is disabled and remove sort icons
        filterable: true,
      },
      {
        Header: "Actions",
        accessor: "actions",
        filterable: true.valueOf,
        Cell: cellProps => {
          return <Actions {...cellProps} />
        },
      },
    ],
    []
  )

  const data = [
    {
      ipaddress: "95.123.44.57/26",
      gateway: "95.123.44.57",
      nullrouted: "Block",
      reverse: "hosted.by.Evenscript.com",
      ddosprotection: "Standard",
      actions: "edit",
      value: "Block",
    },
    {
      ipaddress: "95.123.44.57/26",
      gateway: "95.123.44.57",
      nullrouted: "Block",
      reverse: "hosted.by.Evenscript.com",
      ddosprotection: "Unavailable",
      actions: "edit",
      value: "Unblock",
    },
    {
      ipaddress: "95.123.44.57/26",
      gateway: "95.123.44.57",
      nullrouted: "Block",
      reverse: "hosted.by.Evenscript.com",
      ddosprotection: "Standard / Default",
      actions: "edit",
      value: "Block",
    },
    {
      ipaddress: "95.123.44.57/26",
      gateway: "95.123.44.57",
      nullrouted: "Block",
      reverse: "hosted.by.Evenscript.com",
      ddosprotection: "Standard / Default",
      actions: "edit",
      value: "Block",
    },
    {
      ipaddress: "95.123.44.57/26",
      gateway: "95.123.44.57",
      nullrouted: "Block",
      reverse: "hosted.by.Evenscript.com",
      ddosprotection: "Standard / Default",
      actions: "edit",
      value: "Unblock",
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content  server-management">
        <div className="container-fluid">
          <div className="page-header d-flex align-items-center">
            <img src={header} alt="" />{" "}
            <h3 className="mb-0">
              {id
                ? employeeDetail.map(ele => ele.employeName)
                : "rsx3462.Evenscript.com"}
            </h3>
          </div>
          {/* <div className="server_info">
            <h5 className="info_heding">Server Information: </h5>
            <div className="row">
              <div className="col">
                <WidAppServer data={employeeDetail} />
              </div>
              <div className="col">
                <WidStatusInfo data={employeeDetail} />
              </div>
              <div className="col">
                <WidLocation data={employeeDetail} />
              </div>
              <div className="col">
                <WidStatusInfo data={employeeDetail} />
              </div>
            </div>
          </div> */}
          <div className="theme_tab">
            <div className="tab-header">
              <div className="row">
                <div className="col-md-10">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Overview"
                        type="button"
                        role="tab"
                        aria-controls="Overview"
                        aria-selected="true"
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Usage"
                        type="button"
                        role="tab"
                        aria-controls="Usage"
                        aria-selected="false"
                      >
                        Usage
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="Management-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Management"
                        type="button"
                        role="tab"
                        aria-controls="Management"
                        aria-selected="false"
                      >
                        IPv4 Management
                      </button>
                    </li> */}
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="Attendance-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Attendance"
                        type="button"
                        role="tab"
                        aria-controls="Attendance"
                        aria-selected="false"
                      >
                        Attendance
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="Salary-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Salary"
                        type="button"
                        role="tab"
                        aria-controls="Salary"
                        aria-selected="false"
                      >
                        Salary
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-md-2">
                  <ServerManageMenu
                    toggleModal={tog_backdrop}
                    toggleModalCancel={tog_backdrop_cancel}
                  ></ServerManageMenu>
                </div>
              </div>
            </div>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Overview"
                role="tabpanel"
                aria-labelledby="Overview-tab"
              >
                <div className="tab_content tab-data-table">
                  <div className="row">
                    <div className="col-md-5">
                      <table className="w-100">
                        <tbody>
                          <tr>
                            <th> Joining Date</th>
                            <td className="text-right">
                              {id
                                ? employeeDetail.map(ele => ele.Joining_date)
                                : "18/05/2021"}
                            </td>
                          </tr>
                          <tr>
                            <th>Department</th>
                            <td className="text-right">
                              {id
                                ? employeeDetail.map(ele => ele.Department)
                                : "Department"}
                            </td>
                          </tr>
                          <tr>
                            <th>Role</th>
                            <td className="text-right">
                              {id
                                ? employeeDetail.map(ele => ele.Role)
                                : "Role"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-7">
                      <table className="w-100">
                        <tbody>
                          <tr>
                            <th>Username</th>
                            <td className="text-right">
                              {id
                                ? employeeDetail.map(ele => ele.employeName)
                                : "Root"}
                            </td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td className="text-right">
                              {id
                                ? employeeDetail.map(ele => ele.email)
                                : "Email"}
                            </td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                          <tr>
                            <th>Password</th>
                            <td className="text-right">
                              {id
                                ? employeeDetail.map(ele => ele.password)
                                : "********"}
                            </td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="technical_block">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="technical_block">
                            <div className="row">
                              <div className="col-4">
                                <div className="flex d-flex align-items-center left">
                                  <div className="icon_img">
                                    <Technical1 />
                                  </div>
                                  <div className="icon_content">
                                    <p>Chassis</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-8">
                                <div className="right_content">
                                  <p>
                                    Dell R720XD/2x Intel Xeon E5-2620v2 - 32GB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="technical_block">
                            <div className="row active">
                              <div className="col-4">
                                <div className="flex d-flex align-items-center left">
                                  <div className="icon_img">
                                    <Technical2 />
                                  </div>
                                  <div className="icon_content">
                                    <p>Processor</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-8">
                                <div className="right_content">
                                  <p>1xIntel Xeon E-2174G</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="technical_block">
                            <div className="row">
                              <div className="col-4">
                                <div className="flex d-flex align-items-center left">
                                  <div className="icon_img">
                                    <Technical3 />
                                  </div>
                                  <div className="icon_content">
                                    <p>Disk</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-8">
                                <div className="right_content">
                                  <p>1x32 TB NVME - 10x480 GB SSD</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="technical_block">
                                <div className="row">
                                  <div className="col-4">
                                    <div className="flex d-flex align-items-center left">
                                      <div className="icon_img">
                                        <Technical4 />
                                      </div>
                                      <div className="icon_content">
                                        <p>RAM</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-8">
                                    <div className="right_content">
                                      <p>32GB</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="technical_block">
                                <div className="row">
                                  <div className="col-4">
                                    <div className="flex d-flex align-items-center left">
                                      <div className="icon_img">
                                        <Technical5 />
                                      </div>
                                      <div className="icon_content">
                                        <p>Network</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-8">
                                    <div className="right_content">
                                      <p>1 Gbps</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="technical_block">
                                <div className="row">
                                  <div className="col-4">
                                    <div className="flex d-flex align-items-center left">
                                      <div className="icon_img">
                                        <Technical4 />
                                      </div>
                                      <div className="icon_content">
                                        <p>Operating System</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-8">
                                    <div className="right_content">
                                      <p>Ubuntu 20.04</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="traffic-use">
                                <div className="row traffic-use-title">
                                  <div className="col-md-8">
                                    <p className="use-title">Traffic Usage</p>
                                  </div>
                                  <div className="col-md-4">
                                    <p className="use-percent text-right">
                                      67%
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className="progress-bar"
                                  style={{ width: "67%" }}
                                >
                                  <div className="progress_percent"></div>
                                </div>
                                <div className="traffic_footer">
                                  <div className="row">
                                    <div className="col">
                                      <div className="traffic_footer_block">
                                        <h5>Used</h5>
                                        <p>70 TB</p>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="traffic_footer_block">
                                        <h5>Total</h5>
                                        <p>100 TB</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Usage"
                role="tabpanel"
                aria-labelledby="Usage-tab"
              >
                <div className="tab_content">
                  <div className="row">
                    <div className="col-md-5">
                      <table className="w-100 tab-data-table">
                        <tbody>
                          <tr>
                            <th>Start Date</th>
                            <td className="text-right">18/05/2021</td>
                          </tr>
                          <tr>
                            <th>Due Date</th>
                            <td className="text-right">31/02/2022</td>
                          </tr>
                          <tr>
                            <th>Recurring Amount</th>
                            <td className="text-right">$200 USD</td>
                          </tr>
                          <tr>
                            <th>Billing Cycle</th>
                            <td className="text-right">Monthly</td>
                          </tr>
                          <tr>
                            <th>Payment Method</th>
                            <td className="text-right">
                              PayPal Billing Agreement
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-7">
                      <table className="w-100">
                        <tbody>
                          <tr>
                            <th>Username</th>
                            <td className="text-right">root</td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                          <tr>
                            <th>Password</th>
                            <td className="text-right">*******</td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                          <tr>
                            <th>rescue Mode Password</th>
                            <td className="text-right">*******</td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                          <tr>
                            <th>IPMI Username</th>
                            <td className="text-right">S56126</td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                          <tr>
                            <th>IPMI Password</th>
                            <td className="text-right">*******</td>
                            <td className="text-right">
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.1125 5.60064C14.5533 6.5549 13.9158 7.46125 13.2065 8.30987C12.2732 9.23829 11.128 9.92558 9.8697 10.3126C8.6114 10.6995 7.27781 10.7743 5.98408 10.5308C4.69034 10.2873 3.47528 9.73259 2.4438 8.9146C1.41232 8.09661 0.595425 7.03997 0.0635468 5.83574C-0.0235109 5.61006 -0.0210487 5.35969 0.0705048 5.13579C0.695223 3.7496 1.69483 2.56544 2.95661 1.71709C4.2184 0.868743 5.69217 0.389945 7.21162 0.334524C8.73107 0.279103 10.2357 0.649444 11.556 1.40362C12.8762 2.15779 13.9595 3.26584 14.6835 4.60283C14.8345 4.86183 14.9695 5.13083 15.1125 5.39483V5.60064ZM7.46345 8.94683C8.14351 8.95438 8.8107 8.76055 9.38081 8.3897C9.95091 8.01885 10.3985 7.48759 10.6673 6.86284C10.9361 6.23809 11.0139 5.54764 10.8911 4.87871C10.7683 4.20978 10.4503 3.59212 9.97712 3.10357C9.50398 2.61501 8.8969 2.27753 8.23225 2.13335C7.5676 1.98918 6.87518 2.04491 6.24214 2.29351C5.60909 2.54211 5.06368 2.9724 4.67475 3.53032C4.28583 4.08825 4.07072 4.7488 4.05647 5.42876C4.04839 5.88367 4.1302 6.33561 4.29719 6.75884C4.46418 7.18207 4.71309 7.56824 5.02961 7.89507C5.34613 8.22191 5.72401 8.48316 6.14167 8.66363C6.55933 8.84409 7.00851 8.94032 7.46345 8.94683Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M7.54313 3.42299C7.9535 3.43022 8.35244 3.55914 8.68949 3.79335C9.02654 4.02756 9.28642 4.35633 9.43632 4.73842C9.58621 5.1205 9.6193 5.53868 9.53141 5.93959C9.44352 6.3405 9.23865 6.70628 8.94266 6.99062C8.64668 7.27495 8.27293 7.46503 7.86881 7.53676C7.4647 7.60849 7.04841 7.55855 6.67265 7.39345C6.29688 7.22834 5.97859 6.95544 5.75809 6.60927C5.5376 6.26309 5.42488 5.8592 5.43412 5.44887C5.44982 4.90209 5.67966 4.38348 6.07413 4.00453C6.46861 3.62558 6.99616 3.41673 7.54313 3.42299Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                            <td className="text-right">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.02526 16.4685C1.8004 16.4153 1.58059 16.3427 1.36827 16.2515C1.07612 16.1087 0.830075 15.8867 0.65819 15.6106C0.486306 15.3346 0.395472 15.0156 0.396227 14.6905C0.379227 14.1735 0.396227 13.6564 0.396227 13.1394C0.396227 10.6354 0.396227 8.13178 0.396227 5.62845C0.405174 5.19207 0.572476 4.77374 0.866808 4.45144C1.16114 4.12915 1.56255 3.9249 1.99633 3.87649C2.45233 3.84249 2.91227 3.87039 3.38927 3.87039V4.00247C3.38927 6.21447 3.37827 8.42646 3.39427 10.6385C3.37907 11.1864 3.52846 11.7263 3.82311 12.1885C4.11775 12.6507 4.54409 13.014 5.04723 13.2315C5.42622 13.4071 5.84075 13.4926 6.25829 13.4815H12.3423C12.3423 13.8745 12.3483 14.2545 12.3423 14.6345C12.3431 14.7976 12.3219 14.96 12.2793 15.1175C12.1904 15.4667 11.9978 15.781 11.7268 16.0186C11.4558 16.2562 11.1191 16.4061 10.7612 16.4485C10.7428 16.453 10.725 16.4597 10.7082 16.4685H2.02526Z"
                                  fill="#9F9EB2"
                                />
                                <path
                                  d="M4.37758 6.50446C4.37758 5.13246 4.37758 3.76019 4.37758 2.38752C4.37009 2.09061 4.43648 1.79651 4.57069 1.53156C4.70491 1.26662 4.9028 1.03905 5.14662 0.869455C5.43858 0.650757 5.79381 0.533193 6.15858 0.534494C8.51192 0.530494 10.8646 0.530494 13.2166 0.534494C13.6825 0.543533 14.1271 0.731573 14.4583 1.0594C14.7894 1.38722 14.9818 1.8297 14.9956 2.29548C15.0056 3.36048 14.9956 4.42568 14.9956 5.49568C14.9956 7.20634 14.9956 8.91685 14.9956 10.6275C15.0066 11.0475 14.8709 11.4583 14.612 11.7891C14.353 12.12 13.9869 12.3502 13.5766 12.4405C13.4481 12.4706 13.3165 12.4854 13.1846 12.4844C10.8513 12.4844 8.51792 12.4844 6.18459 12.4844C5.70827 12.4847 5.25107 12.297 4.91249 11.962C4.57391 11.627 4.38135 11.1719 4.3766 10.6956C4.3686 9.29563 4.3766 7.90461 4.3766 6.50862L4.37758 6.50446Z"
                                  fill="#9F9EB2"
                                />
                              </svg>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Attendance"
                role="tabpanel"
                aria-labelledby="Attendance-tab"
              >
                <div className="tab_content p-0 bg-transparent manage-tab">
                  <Row className="server-search">
                    <Col md="10">
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
                    <Col md="2 text-end pl-0">
                      <a href="#" className="btn-reset">
                        Reset <img src={reset} alt="" />
                      </a>
                    </Col>
                  </Row>
                  <UserAttendance nce id={id} selectedMonth={selectedMonth} />
                </div>
                {/* <div className="tab_content p-0 bg-transparent manage-tab">
                  <Row className="server-search">
                    <Col md="10">
                      <Col md="5">
                        
                      </Col>
                    </Col>
                    <Col md="2 text-end pl-0">
                     
                    </Col>
                  </Row>
                </div> */}
              </div>
              <div
                className="tab-pane fade"
                id="Salary"
                role="tabpanel"
                aria-labelledby="Salary-tab"
              >
                <div className="tab_content p-0 bg-transparent manage-tab">
                  <Row className="server-search">
                    <Col md="10">
                      <form className="app-search d-none d-lg-block p-0 search-v1">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Filter for IP addresses"
                          />
                          <span className="uil-search"></span>
                        </div>
                      </form>
                    </Col>
                    <Col md="2 text-end pl-0">
                      <a href="#" className="btn-reset">
                        Reset <img src={reset} alt="" />
                      </a>
                    </Col>
                  </Row>
                  <Salary id={id} />
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Customer" : "Add Customer"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row form>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Customer Id</Label>
                      <Input
                        name="customerid"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.customerid || ""}
                        invalid={
                          validation.touched.customerid &&
                          validation.errors.customerid
                            ? true
                            : false
                        }
                      />
                      {validation.touched.customerid &&
                      validation.errors.customerid ? (
                        <FormFeedback type="invalid">
                          {validation.errors.customerid}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Customer Name</Label>
                      <Input
                        name="customerName"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.customerName || ""}
                        invalid={
                          validation.touched.customerName &&
                          validation.errors.customerName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.customerName &&
                      validation.errors.customerName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.customerName}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Customer Status</Label>
                      <Input
                        name="customerStatus"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.customerStatus || ""}
                      >
                        <option>Active</option>
                        <option>Deactive</option>
                      </Input>
                      {validation.touched.customerStatus &&
                      validation.errors.customerStatus ? (
                        <FormFeedback type="invalid">
                          {validation.errors.customerStatus}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Joining Date</Label>
                      <Input
                        name="joiningDate"
                        type="date"
                        // value={customerList.joiningDate || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.joiningDate || ""}
                        invalid={
                          validation.touched.joiningDate &&
                          validation.errors.joiningDate
                            ? true
                            : false
                        }
                      />
                      {validation.touched.joiningDate &&
                      validation.errors.joiningDate ? (
                        <FormFeedback type="invalid">
                          {validation.errors.joiningDate}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Badge Class</Label>
                      <Input
                        name="badgeclass"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.badgeclass || ""}
                      >
                        <option>success</option>
                        <option>danger</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
      <Modal
        isOpen={modal_backdrop}
        toggle={() => {
          tog_backdrop()
        }}
        backdrop={"static"}
        scrollable={true}
        id="staticBackdrop"
        className="modal_v1"
      >
        <div className="modal-header">
          <Row className="w-100">
            <Col xs="10">
              <h5 className="modal-title" id="staticBackdropLabel">
                Rescue Mode
              </h5>
            </Col>
            <Col xs="2">
              <div className="right-content text-end">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setmodal_backdrop(false)
                  }}
                  aria-label="Close"
                >
                  {/* <span aria-hidden="true"> <img src={close} alt="" /></span> */}
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="modal-body">
          <p className="m-0 mb-4 text-blue font-semibold">
            Are you sure you want to launch Rescue Mode?
          </p>
          <div className="form-group select-v1">
            <label className="text-blue font-semibold">Select Disk Set</label>
            <Select
              classNamePrefix="select-v1"
              defaultValue={options[1]}
              options={options}
              styles={customStyles}
            />
          </div>
          <div className="form-group select-v1">
            <label className="text-blue font-semibold d-block">SSH Keys</label>
            <textarea
              className="textarea_v1"
              placeholder="ssh-rsa... "
            ></textarea>
            <p className="font-normal text-color">
              You may add your public SSH keys here, each one starting on a new
              line.
            </p>
          </div>

          <div className="form-group select-v1">
            <label className="text-blue font-semibold">
              Custom Startup Script
            </label>
            <Select
              classNamePrefix="select-v1"
              defaultValue={options2[1]}
              options={options2}
              styles={customStyles}
            />
          </div>
          <div className="form-group select-v1">
            <label className="text-blue font-semibold">
              Custom Startup Script
            </label>
            <Select
              classNamePrefix="select-v1"
              defaultValue={options2[1]}
              options={options2}
              styles={customStyles}
            />
          </div>
          <div className="btn-group">
            <button
              className="btn btn-primary btn-modal waves-effect waves-light d-flex justify-content-center align-items-center"
              type="submit"
            >
              Launch
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modal_backdrop_cancel}
        toggle={() => {
          tog_backdrop_cancel()
        }}
        backdrop={"static"}
        scrollable={true}
        id="staticBackdrop_cancel"
        className="modal_v1"
      >
        <div className="modal-header">
          <Row className="w-100">
            <Col xs="10">
              <h5 className="modal-title" id="staticBackdropLabel">
                Cancel Server
              </h5>
            </Col>
            <Col xs="2">
              <div className="right-content text-end">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setmodal_backdrop_cancel(false)
                  }}
                  aria-label="Close"
                >
                  {/* <span aria-hidden="true"> <img src={close} alt="" /></span> */}
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="modal-body">
          <p className="m-0 mb-4 text-blue font-semibold">
            Requesting Cancellation for
          </p>
          <div className="block_content mt-20 mb-30">
            <p className="text-color-v1 font-small  font-semibold">
              Custom Dedicated Servers - 2x Intel Xenon DoDeca-Core E5-2650v4
              (rsx5076.Evenscript.com)
            </p>
          </div>
          <form>
            <div className="form-group select-v1">
              <label className="text-blue font-semibold d-block">
                Briefly describe your reason for cancellation
              </label>
              <textarea
                className="textarea_v1"
                placeholder="Reason for cancellation is..... "
              ></textarea>
            </div>
            <div className="form-group select-v1">
              <label className="text-blue font-semibold">
                Cancellation Type:
              </label>
              <Select
                classNamePrefix="select-v1"
                defaultValue={options3[1]}
                options={options3}
                styles={customStyles}
              />
            </div>
            <div className="footer-btn">
              <Row className="w-100">
                <Col md="6">
                  <button
                    className="btn btn-border waves-effect waves-light text-blue font-16 font-normal w-100"
                    type="submit"
                  >
                    Close
                  </button>
                </Col>
                <Col md="6">
                  <button
                    className="btn btn-danger waves-effect waves-light btn-remove text-white w-100"
                    type="submit"
                  >
                    Request Cancellation
                  </button>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  )
}
DatatableTables.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default DatatableTables

const NullRouted = cell => {
  return (
    <div className="status_block server_block d-flex">
      <div
        className={
          "badge badge-pill bg-pill font-small  bg-soft-" +
          (cell.value === "Unblock"
            ? "success"
            : "danger" && cell.value === "Block"
            ? "danger"
            : "")
        }
      >
        {cell.value}
      </div>
      {/* <ToogleSwitch className="table-switch" /> */}
      <p className="text-color-v1 font-small text-null">Null</p>
    </div>
  )
}

const Actions = cell => {
  const [openModal, setOpenEditModal] = useState(false)
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployee = () => {
    console.log(cell.row.original)
    setOpenEditModal(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.holiday)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col md="6">
          <button className="btn btn-transparent" onClick={handleEditEmployee}>
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col md="6">
          <button
            className="btn btn-transparent"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>
      {/* <HolidayModel
        id={cell.row.original.id}
        show={openModal}
        onCloseClick={() => setOpenEditModal(false)}
      /> */}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}
