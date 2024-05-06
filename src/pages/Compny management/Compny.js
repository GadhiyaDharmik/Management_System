import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../Compny management/Common/Table"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../assets/images/filter.svg"
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CombineDotVerticle } from "../../components/Common/CommonSvg"
import edit from "../Compny management/Common/imges/table-edit.svg"
import del from "../Compny management/Common/imges/table-delete.svg"

// import {
//   getBranches,
//   initAddBranch,
//   editBranch,
// } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import BranchModal from "./compnyModal"

import { Card, Col, Row } from "reactstrap"

import DeleteModal from "../../components/Common/DeleteModal"
// import { data } from "jquery"
import { Scatter } from "react-chartjs-2"

const data = [
  {
    id: 1,
    name: "Ahemdabad",
    email1: "sahilpatel2003@gamil.com",
    email2: "bhavilpatel2003@gamil.com",
    email3: "dharmikpatel2003@gamil.com",
    email4: "krunalpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "1234",
  },
  {
    id: 2,
    name: "Rajkot",
    email1: "chiragpatel2003@gamil.com",
    email2: "bhavilpatel2003@gamil.com",
    email3: "dharmikpatel2003@gamil.com",
    email4: "krunalpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "12342",
  },
  {
    id: 3,
    name: "Surat",
    email1: "bhavilpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "2345",
  },
  {
    id: 4,
    name: "Junagadh",
    email1: "krunallunagriya2000@gamil.com",
    totalEmployee: 32,
    fileFees: "1234",
  },
  {
    id: 5,
    name: "porbandar",
    email1: "sahilpatel2003@gamil.com",
    email2: "bhavilpatel2003@gamil.com",
    email3: "dharmikpatel2003@gamil.com",
    email4: "krunalpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "435",
  },
  {
    id: 6,
    name: "Mumbi",
    email1: "priyasekhda444@gamil.com",
    totalEmployee: 32,
    fileFees: "34535",
  },
  {
    id: 7,
    name: "Hriyana",
    email1: "dharmimkgadhiya555@gamil.com",
    totalEmployee: 32,
    fileFees: "445455",
  },
  {
    id: 8,
    name: "Palitana",
    email1: "shrutipatel6666@gamil.com",
    totalEmployee: 32,
    fileFees: "2500",
  },
  {
    id: 9,
    name: "Porbandar",
    email1: "sahilpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "2300",
  },
  {
    id: 10,
    name: "Kolkata",
    email1: "sahilpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "5400",
  },
  {
    id: 11,
    name: " New delhi",
    email1: "sahilpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "5200",
  },
  {
    id: 12,
    name: "Bengaluru",
    email1: "sahilpatel2003@gamil.com",
    totalEmployee: 32,
    fileFees: "20000",
  },
]

function Company() {
  const [modal, setModal] = useState(false)

  const [isEdit, setIsEdit] = useState(false)

  //Add Holiday Modal
  const [openModal, setOpenModal] = useState(false)

  function branchName(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <span className="fw-bold fs-5 text-capitalize">{row.name}</span>
      </div>
    )
  }
  function totalEmployee(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <span className="fw-bold fs-5 text-capitalize">{row.phoneNumber}</span>
      </div>
    )
    // console.log(row)
  }
  const toggle = () => {
    if (modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  const editeOpen = (cell, row) => <BranchActions data={row} />

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Compny Name",
        accessor: "name",
        Cell: cellProps => {
          return (
            <div>
              <span className="fw-bold fs-5 text-capitalize">
                {cellProps.row.original.name}
              </span>
            </div>
          )
        },
      },
      {
        Header: "Email List",
        accessor: "email",
        Cell: cellProps => {
          return <CompnyEmail {...cellProps} />
        },
      },
      {
        Header: "FIle Fees",
        accessor: "fileFees",
        Cell: cellProps => {
          return (
            <div>
              <span className="fw-bold fs-5 text-capitalize">
                {cellProps.row.original.fileFees}
              </span>
            </div>
          )
        },
      },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: editeOpen,
      },
    ],
    []
  )
  const handleCustomerClicks = () => {
    setCustomerList("")
    setIsEdit(false)
    toggle()
  }

  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <div className="tab_content p-0 bg-transparent manage-tab">
            <Row className="">
              <Col md="10"></Col>
              <Col md="2">
                <button
                  className="btn pb-3 pt-6 p-2.5 btn-invoice"
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  <div>
                    <i className="uil-plus"></i>
                  </div>
                  {"  "}Add Compny
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
                  data={data}
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
          <BranchModal
            data={data}
            show={openModal}
            onCloseClick={() => setOpenModal(false)}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
Company.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default Company

const BranchActions = ({ data }) => {
  const dispatch = useDispatch()
  const [openBranchEdit, setopenBranchEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditBranch = () => {
    setopenBranchEdit(true)
  }
  //Delete Model
  const handleDeleteBranch = data => {
    console.log("data", data.id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row className="g-2">
        <Col lg={6}>
          <button
            className="btn btn-transparent"
            onClick={handleEditBranch}
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

      <BranchModal
        id={data.id}
        show={openBranchEdit}
        onCloseClick={() => setopenBranchEdit(false)}
      />
      {/* <DeleteModal
        id={data.id}
        show={deleteModal}
        onDeleteClick={handleDeleteBranch}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
    </div>
  )
}
const CompnyEmail = cell => {
  return (
    <Link
      to={`/employee-management/${cell.row.original.id}`}
      className="text-body fw-bold gap-2"
    >
      <h5 className="sub-text fs-6 ">{cell.row.original.email1}</h5>
      <h5 className="sub-text fs-6 mt-2">{cell.row.original.email2}</h5>
      <h5 className="sub-text fs-6 mt-2">{cell.row.original.email3}</h5>
      <h5 className="sub-text fs-6 mt-2">{cell.row.original.email4}</h5>
    </Link>
  )
}
