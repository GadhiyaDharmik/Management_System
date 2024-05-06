import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link,useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainerCopy"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../assets/images/filter.svg"
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CombineDotVerticle } from "../../components/Common/CommonSvg"
import Status from "../../components/CommonForBoth/TopbarDropdown/Status"

//profile Image
import user1 from "../../assets/images/users/avatar-1.jpg"
import user2 from "../../assets/images/users/avatar-2.jpg"
import user3 from "../../assets/images/users/avatar-3.jpg"
import user4 from "../../assets/images/users/avatar-4.jpg"
import user5 from "../../assets/images/users/avatar-5.jpg"
import user6 from "../../assets/images/users/avatar-6.jpg"
import user7 from "../../assets/images/users/avatar-7.jpg"

import {
  TotleEmployee,
  ActiveEmployee,
  InactiveEmployee,
  WidBalance,
} from "../../components/Common/Widgets"

// import {
//   getCustomers as onGetCustomers,
//   addNewCustomer as onAddNewCustomer,
//   updateCustomer as onUpdateCustomer,
//   deleteCustomer as onDeleteCustomer,
//   getServices as onGetServices,
//   getClients as onGetClients,
//   getTicketList as onGetTicketList,
// } from "../../store/actions"
import { Navigate } from "react-router-dom"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Badge,
  Label,
} from "reactstrap"

import DeleteModal from "../../components/Common/DeleteModal"

const data = [
  {
    image:user7,
    id: 1,
    employeName: "sahil sagapariya",
    email: "sahilsgapariya@gmail.com",
    Department: "Asset management",
    Role: "vice president",
    Salary: "50,000",
    Joining_date: "04-01-2020",
    Status: "Inactive",
  },
  {
    image:
      "https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?s=1024x1024&w=is&k=20&c=v0FzN5RD19wlMvrkpUE6QKHaFTt5rlDSqoUV1vrFbN4=",
    id: 2,
    employeName: "dharmik gadhiya",
    email: "dharmikdadhiya@gmail.com",
    Department: "business management",
    Role: "manager",
    Salary: "10,000",
    Joining_date: "04-11-2022",
    Status: "Active",
  },
  {
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    id: 3,
    employeName: "bhavil sagapariya",
    email: "bhavilsgapariya@gmail.com",
    Department: "Engineering",
    Role: "contributor",
    Salary: "50,000",
    Joining_date: "08-19-2020",
    Status: "Active",
  },
  {
    image:user1,
    id: 4,
    employeName: "chirag kothiya",
    email: "chiregkothiya@gmail.com",
    Department: "Genaral management",
    Role: "Director",
    Salary: "50,000",
    Joining_date: "09-07-2019",
    Status: "Active",
  },
  {
    image:user2,
    id: 5,
    employeName: "avni rupareliya",
    email: "aavnirupareliya@gmail.com",
    Department: "production",
    Role: "Manager",
    Salary: "50,000",
    Joining_date: "29-10-2012",
    Status: "Inactive",
  },
  {
    image: user3,
    id: 6,
    employeName: "priya patel",
    email: "priyapatel@gmail.com",
    Department: "sales Management",
    Role: "Employe",
    Salary: "50,000",
    Joining_date: "15-12-2017",
    Status: "Active",
  },
  {
    image:
     user4,
    id: 7,
    employeName: "sruti patoliya",
    email: "shrutipatel@gmail.com",
    Department: "HR",
    Role: "HR Generalist",
    Salary: "50,000",
    Joining_date: "08-08-2015",
    Status: "Active",
  },
  {
    image:
      user5,
    id: 8,
    employeName: "krunal lunagriya",
    email: "krunalpatel@gmail.com",
    Department: "criative services",
    Role: "Manager",
    Salary: "50,000",
    Joining_date: "05-01-2020",
    Status: "Active",
  },
  {
    image:
      user6,
    id: 9,
    employeName: "bhavesh chavda",
    email: "bhaveshchavda@gmail.com",
    Department: "Legal Management",
    Role: "Director",
    Salary: "50,000",
    Joining_date: "04-11-2011",
    Status: "Active",
  },
]

function DatatableTables() {
  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([])
  const [statusdata, setStatusdata] = useState(data)

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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = customer => {
    setCustomer(customer)
    setDeleteModal(true)
  }

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer))
      setDeleteModal(false)
    }
  }
  const handleCustomerClicks = () => {
    setCustomerList("")
    setIsEdit(false)
    toggle()
  }

  const columns = useMemo(
    () => [
      {
        Header: "Img",
        accessor: "image",
        disableSortBy: true,
        Cell: cellProps => {
          return (
            <div>
              <img
                className="rounded-circle header-profile-user"
                alt="Header Avatar"
                src={cellProps.row.original.image}
              />
            </div>
          )
        },
      },
      {
        Header: "Employe name",
        accessor: "employeName",
        disableGlobalFilter: true,
        filterable: true,
        Cell: cellProps => {
          return <EmployeeName {...cellProps} />
        },
      },
      {
        Header: "Department",
        accessor: "Department",
        filterable: true,
      },
      {
        Header: "Role",
        accessor: "Role",
        filterable: false,
        // Cell: (cellProps) => {
        //   return <Location {...cellProps} />;
        // },
      },
      // {
      //   Header: "Next Due",
      //   accessor: "nextDue",

      // },
      {
        Header: "Joining date",
        accessor: "Joining_date",
        filterable: true,
        // formatter: (cellContent, row) => handleValidDate(row.joiningDate),
        Cell: cellProps => {
          return <Date {...cellProps} />
        },
      },
      {
        Header: "Status",
        accessor: "Status",
        filterable: true,
        Cell: cellProps => {
          return <CustomerStatus {...cellProps} />
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content dashboard">
        <div className="container-fluid">
          <div className="server_info">
            <div className="row">
              <div
                className="col"
                onClick={() => {
                  setStatusdata([...data].filter(ele => ele))
                }}
                style={{ cursor: "pointer" }}
              >
                <TotleEmployee data={data.length}></TotleEmployee>
              </div>
              <div
                className="col"
                onClick={() => {
                  setStatusdata(
                    [...data].filter(ele => ele.Status === "Active")
                  )
                }}
                style={{ cursor: "pointer" }}
              >
                <ActiveEmployee data={data}></ActiveEmployee>
              </div>
              <div
                className="col"
                onClick={() => {
                  setStatusdata(
                    [...data].filter(ele => ele.Status === "Inactive")
                  )
                }}
                style={{ cursor: "pointer" }}
              >
                <InactiveEmployee data={data}></InactiveEmployee>
              </div>
              {/*<div className="col">
                <WidBalance></WidBalance>
              </div> */}
            </div>
          </div>
          <div className="tab_content p-0 bg-transparent manage-tab">
            <Row className="">
              <Col md="10">
                <form className="app-search d-lg-block p-0 search-v1">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Employee Detail"
                      onChange={e => {
                        handelEmployeeSearch(e)
                      }}
                    />
                    <span className="uil-search"></span>
                  </div>
                </form>
              </Col>
              <Col md="2">  
                <Link className="top-btn pb-3 btn-invoice" to="/my-account">
                  <div>
                    <i className="uil-plus"></i>
                  </div>
                  {"  "}Add New
                </Link>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs="12">
              <div className="table_v1">
                <TableContainer
                  tableClassName="product-table table-shadow"
                  columns={columns}
                  data={statusdata}
                  isGlobalFilter={true}
                  isAddCustomer={true}
                  isAddTableBorderStrap={true}
                  handleCustomerClicks={handleCustomerClicks}
                  getTablePropsC={() => ({
                    className: "product-table",
                  })}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}
DatatableTables.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default DatatableTables
const EmployeeName = cell => {
  return (
    <Link
      to={`/employee-management/${cell.row.original.id}`}
      className="text-body fw-bold"
    >
      <h5 className="fw-bold text-capitalize">
        {cell.row.original.employeName}
      </h5>
      <p className="sub-text fs-5">{cell.row.original.email}</p>
    </Link>
  )
}
const CustomerStatus = cell => {
  return (
    <div className="d-flex">
      <div className="status_block btn">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.value === "Active"
              ? "success"
              : "danger" && cell.value === "Inactive"
              ? "danger"
              : "")
          }
        >
          {cell.value}
        </Badge>
      </div>
      <div className="status_ab">
        <Status />
      </div>
    </div>
  )
}
const Date = cell => {
  return cell.value ? cell.value : ""
}
