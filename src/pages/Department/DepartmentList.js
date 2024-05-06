import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../assets/images/filter.svg"
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CombineDotVerticle } from "../../components/Common/CommonSvg"
import del from "../../assets/images/table-delete.svg"
import edit from "../../assets/images/table-edit.svg"
// import Table from "../../components/Common/Table"
import {
  getDepartment,
}
  from "../../store/actions"

//profile Image
import user4 from "../../assets/images/small/img-5.jpg"

import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
  getServices as onGetServices,
  getClients as onGetClients,
  getTicketList as onGetTicketList,
} from "../../store/actions"


//redux
import { useSelector, useDispatch } from "react-redux"

import DepartmentModal from "./DepartmentModel"

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

import DeleteModal from "../../components/Common/DeleteModal"

// const data = [
//   {
//     id: 1,
//     name: "Asset management",
//     hodName: "Ravi Vekriya",
//     totalEmployee: 32,
//     address: "ahemdabad",
//   },
//   {
//     id: 2,
//     name: "	business management",
//     hodName: "raj sorthiaya",
//     totalEmployee: 20,
//     address: "rajkot",
//   },
//   {
//     id: 3,
//     name: "Genaral management",
//     hodName: "jaydev gadhiya",
//     totalEmployee: 22,
//     address: "porbandar",
//   },
//   {
//     id: 4,
//     name: "sales Management",
//     hodName: "rahul patle",
//     totalEmployee: 22,
//     address: "mumbi",
//   },
//   {
//     id: 5,
//     name: "	criative services",
//     hodName: "varshi pansuriya",
//     totalEmployee: 28,
//     address: "delhi",
//   },
//   {
//     id: 6,
//     name: "Legal Management",
//     hodName: "prkash joshi",
//     totalEmployee: 29,
//     address: "ahemdabad",
//   },
//   {
//     id: 7,
//     name: "Engineering",
//     hodName: "rakesh shah",
//     totalEmployee: 27,
//     address: "bengaluru",
//   },
//   {
//     id: 8,
//     name: "Asset management",
//     hodName: "Ravi sagpariya",
//     totalEmployee: 32,
//     address: "ahemdabad",
//   },
//   {
//     id: 9,
//     name: "	business management",
//     hodName: "mahi gondaliya",
//     totalEmployee: 20,
//     address: "hriyana",
//   },
//   {
//     id: 10,
//     name: "Genaral management",
//     hodName: "shidhraj vala",
//     totalEmployee: 22,
//     address: "palitana",
//   },
//   {
//     id: 11,
//     name: "sales Management",
//     hodName: "rahul gandhi",
//     totalEmployee: 22,
//     address: "rajstan",
//   },
//   {
//     id: 12,
//     name: "	criative services",
//     hodName: "varshil vora ",
//     totalEmployee: 24,
//     address: "goa",
//   },
// ]

function DatatableTables() {
  const dispatch = useDispatch()

  const [totalCount, setTotalCount] = useState(15)

  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const Department = useSelector((state) => state.department.departmentList);

  //Add Holiday Modal
  const [openModal, setOpenModal] = useState(false)

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([])

  const [openBranchEdit, setOpenBranchEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  console.log(Department)
  React.useEffect(() => {
    dispatch(getDepartment());
  }, []);

  const [state, setState] = useState({
    data: Department,
    page: 1,
    sizePerPage: 5,
  })

  function handleTableChange(type, eventData) {
    console.log(type, eventData)
  }
  //colums
  function departmentName(...row) {
    console.log(row)
    return (
      <div>
        <span className="fw-bold fs-5 text-capitalize">{row[1].name}</span>
      </div>
    )
  }


  //Edit
  const handleEditEmployeeBranch = (cell, row) => {
    console.log(row.original)
    setOpenBranchEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = (cell, row) => {
    // console.log(row.id)
    setDeleteModal(false)
  }
  const BranchName = row => {
    return (
      <div className="d-flex align-items-center country">
        {row}
      </div>
    )
  }
  function DepartmentActions(cell, row) {
    return (
      <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
        <Row>
          <Col>
            <button
              className="btn btn-transparent"
              onClick={handleEditEmployeeBranch}
            >
              <img src={edit} alt="" />
            </button>
          </Col>
          <Col>
            <button
              className="btn btn-transparent"
              onClick={() => setDeleteModal(true)}
            >
              <img src={del} alt="" />
            </button>
          </Col>
        </Row>
        <DepartmentModal
          show={openBranchEdit}
          id={row.id}
          onCloseClick={() => setOpenBranchEdit(false)}
        />
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteEmployee}
          onCloseClick={() => setDeleteModal(false)}
        />
      </div>
    )
  }

  const departmentActions= row =><DepartmentActions data={row}/>
  const columns = useMemo(
    () => [ 
      {
        text: "Id",
        dataField: "id",
      },
      {
        text: "Department Name",
        dataField: "name",
        formatter: departmentName,
      },
      {
        text: "Hod Name",
        dataField: "hodName",
      },
      {
        text: "Total Employee",
        dataField: "totalEmployee",
      },
      {
        text: "Branch Name",
        dataField: "branchId",
        formatter: BranchName,
      },
      {
        text: "Actions",
        dataField: "Actions",
        formatter: departmentActions,
      },
    ],
    []
  )
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <div className="server_info">
            <div className="row">
              {/* <div className="col">
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
              </div> */}
            </div>
          </div>
          <div className="tab_content p-0 bg-transparent manage-tab">
            <Row className="">
              <Col md="2">
                <button
                  className="btn pb-3 pt-2.5 p-2.5 btn-invoice"
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  <div>
                    <i className="uil-plus"></i>
                  </div>
                  Add New
                </button>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs="12">
              <div className="table_v1">
                {/* <Table
                  data={Department}
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
          <DepartmentModal
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


const DepartmentActions = data => {
  const [openBranchEdit, setOpenBranchEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeBranch = () => {
    console.log(data)
    setOpenBranchEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(data.id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <button
            className="btn btn-transparent"
            onClick={handleEditEmployeeBranch}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col>
          <button
            className="btn btn-transparent"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>
      <DepartmentModal
        show={openBranchEdit}
        id={data}
        onCloseClick={() => setOpenBranchEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

