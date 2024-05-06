import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"

import InputGroup from "react-bootstrap/InputGroup"
import TableContainer from "./componants/TableContainer"
import BranchModal from "./BtSearchModal"
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
// import edit from "./Compny management/Common/imges/table-edit.svg"
import edit from "../../assets/images/table-edit.svg"

import { Link } from "react-router-dom"

import add from "../../assets/Web/add-circle-svgrepo-com.svg"

import * as Yup from "yup"
import {
  Col,
  Card,
  CardBody,
  Row,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  CardHeader,
} from "reactstrap"
import Select from "react-select"

const customStyles = {
  control: base => ({
    ...base,
    border: "1px",
  }),
}

const data = [
  {
    file: 1,
    name: "HDFC Bank",
    customer: "RAMESHBHAI LADHANI",
    mobile: 9756435232,
    chequeCollection: "02-06-2021",
    chequeDeposite: "02-06-2021",
    chequeNumber: "325641",
    amount: "14452.00",
    btBank: "TATA CAPITAL",
  },
  {
    file: 2,
    name: "HDB BHAKTINAGR DISA CREDIT",
    customer: "RAMESHBHAI LADHANI",
    mobile: 974652652,
    chequeCollection: "01-12-2022",
    chequeDeposite: "01-12-2022",
    chequeNumber: "654521",
    amount: "251463.00",
    btBank: "ICICI BANK",
  },
  {
    file: 3,
    name: "PNB HOUSING RAJKOT",
    customer: "RAMESHBHAI LADHANI",
    mobile: 965472165,
    chequeCollection: "09-09-2021",
    chequeDeposite: "09-09-2021",
    chequeNumber: "542136",
    amount: "654213.00",
    btBank: "CAPRI GLOBAL",
  },
  {
    file: 4,
    name: "RBL BANK- AGRI",
    customer: "RAMESHBHAI LADHANI",
    mobile: 965425647,
    chequeCollection: "03-04-2022",
    chequeDeposite: "03-04-2022",
    chequeNumber: "546217",
    amount: "325641.00",
    btBank: "TATA CAPITAL",
  },
  {
    file: 5,
    name: "HDFC BANK",
    customer: "RAMESHBHAI LADHANI",
    mobile: 98656235887,
    chequeCollection: "02-09-2022",
    chequeDeposite: "02-09-2022",
    chequeNumber: "254187",
    amount: "325641.00",
    btBank: "PIRAMAL",
  },
  {
    file: 6,
    name: "HDFC BANK",
    customer: "RAMESHBHAI LADHANI",
    email1: "priyasekhda444@gamil.com",
    mobile: 9865475647,
    chequeCollection: "19-02-2022",
    chequeDeposite: "19-02-2022",
    chequeNumber: "326478",
    amount: "325641.00",
    btBank: "IDFC FIRST BANK",
  },
  {
    file: 7,
    name: "HDFC BANK",
    customer: "RAMESHBHAI LADHANI",
    mobile: 9856478459,
    chequeCollection: "06-11-2022",
    chequeDeposite: "06-11-2022",
    chequeNumber: "695847",
    amount: "987456.00",
    btBank: "ICICI",
  },
  {
    file: 8,
    name: "BOD BANK",
    customer: "RAMESHBHAI LADHANI",
    mobile: 945665786,
    chequeCollection: "08-10-2022",
    chequeDeposite: "0+10-2022",
    chequeNumber: "255847",
    amount: "987452.00",
    btBank: "INDIA SHETER",
  },
  {
    file: 9,
    name: "RAJKOT DISTRIK BANK",
    customer: "RAMESHBHAI LADHANI",
    mobile: 9856745986,
    chequeCollection: "06-07-2022",
    chequeDeposite: "06-07-2022",
    chequeNumber: "6396852",
    amount: "657894.00",
    btBank: "CAPITAL SEEL",
  },
  {
    file: 10,
    name: "KOTAK BANK",
    customer: "RAMESHBHAI LADHANI",
    mobile: 9865412563,
    chequeCollection: "16-03-2022",
    chequeDeposite: "16-03-2022",
    chequeNumber: "354986",
    amount: "689574.00",
    btBank: "TATA POWER",
  },
  {
    file: 11,
    name: "SBI RAJKOT",
    customer: "RAMESHBHAI LADHANI",
    mobile: 9865445126,
    chequeCollection: "06-12-2022",
    chequeDeposite: "06-12-2022",
    chequeNumber: "2536478",
    amount: "658974.00",
    btBank: "ORKESTA LIGHT",
  },
  {
    file: 12,
    name: "BOD BANK RAJKOT",
    customer: "RAMESHBHAI LADHANI",
    mobile: 9845678954,
    chequeCollection: "16-05-2022",
    chequeDeposite: "16-05-2022",
    chequeNumber: "59652",
    amount: "635987.00",
    btBank: "GOLDAN",
  },
]

const optionGroup = [
  {
    label: "Picnic",
    options: [
      { label: "Mustard", value: "Mustard" },
      { label: "Ketchup", value: "Ketchup" },
      { label: "Relish", value: "Relish" },
    ],
  },
]
const optionGroup1 = [
  {
    label: "Picnic",
    options: [
      { label: "2020", value: "2020" },
      { label: "2021", value: "2021" },
      { label: "2022", value: "2022" },
    ],
  },
]

function BtSearchList() {
  const [selectedGroup, setselectedGroup] = useState(null)
  const [selectedMulti1, setselectedMulti1] = useState(null)
  const [modal, setModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }
  function handleMulti1(selectedMulti1) {
    setselectedMulti1(selectedMulti1)
  }
  ///////////////////////////Table//////////////////////////////////////
  const toggle = () => {
    if (modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }

  const handleCustomerClicks = () => {
    setCustomerList("")
    setIsEdit(false)
    toggle()
  }

  const editeOpen = (cell, row) => <BranchActions data={row} />

  const columns = useMemo(
    () => [
      {
        Header: "file",
        accessor: "file",
      },
      {
        Header: "Compny Name",
        accessor: "name",
        Cell: cellProps => {
          return (
            <div>
              <span className="fw-bold text-capitalize">
                {cellProps.row.original.name}
              </span>
            </div>
          )
        },
      },
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
      },
      {
        Header: "Cheque Collection",
        accessor: "chequeCollection",
      },
      {
        Header: "Cheque Deposite",
        accessor: "chequeDeposite",
      },
      {
        Header: "Cheque Number",
        accessor: "chequeNumber",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "BTBank",
        accessor: "btBank",
      },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: editeOpen,
      },
    ],
    []
  )
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <Card>
            <CardHeader className="bg-transparent">
              <Row>
                <Col>
                  <span className="fs-2 fw-bold">BT Reports</span>
                </Col>
                <Col className="text-end">
                  <Link to="/bt-entry-list">
                    <img
                      src={add}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form className="needs-validation">
                <Row>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">File</Label>
                      <div className="input-group">
                        <Input
                          name="compnyName"
                          placeholder="Search FIle"
                          type="text"
                          className="form-control"
                          id="validationTooltipUsername"
                          // value=""
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div>
                      <Label id="company">Compny</Label>
                      <Select
                        id="company"
                        styles={customStyles}
                        value={selectedGroup}
                        onChange={() => {
                          handleSelectGroup()
                        }}
                        options={optionGroup}
                        className="form-control"
                      />
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Customer
                      </Label>
                      <div className="input-group">
                        <Input
                          name="numberOfCustomer"
                          placeholder="E.g:Customer Name"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">Mobile</Label>
                      <div className="input-group">
                        <Input
                          name="mobile"
                          placeholder="E.g:9875654255"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Cheque Collection Date
                      </Label>
                      <div className="input-group">
                        <Input
                          name="chequeCollection"
                          type="text"
                          placeholder="Search Collection Date"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 position-relative">
                      <Label htmlFor="validationTooltipUsername">
                        Cheque Deposite Date
                      </Label>
                      <div className="input-group">
                        <Input
                          name="chequeDeposite"
                          type="text"
                          placeholder="Search Deposite Date"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label htmlFor="validationTooltipUsername">
                        Cheque Number
                      </Label>
                      <div className="input-group">
                        <Input
                          name="chequeNumber"
                          type="text"
                          placeholder="125436"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Cheque Amount
                      </Label>{" "}
                      <InputGroup>
                        <div
                          className="input-group-text"
                          style={{
                            WebkitBorderTopLeftRadius: "24px ",
                            WebkitBorderBottomLeftRadius: "24px",
                          }}
                        >
                          <i className="bx bx-dollar"></i>
                        </div>
                        <Input
                          name="chequeDeposite"
                          type="number"
                          style={{
                            WebkitBorderTopLeftRadius: "0px !important",
                            WebkitBorderBottomLeftRadius: "0px !important",
                          }}
                          placeholder="0000"
                          // className="form-control"
                          // id="validationCustom01"
                        />
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Paper Collection
                      </Label>
                      <div className="input-group">
                        <Input
                          name="paperCollection"
                          placeholder=" Paper Collection"
                          type="date"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">
                        Paper Handover
                      </Label>
                      <div className="input-group">
                        <Input
                          name="paperHandover"
                          placeholder=" Paper Collection"
                          type="date"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label htmlFor="validationTooltipUsername">BT Bank</Label>
                      <div className="input-group">
                        <Input
                          name="btBank"
                          placeholder="Bank Name"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3 input-group-prepend">
                      <Label>status</Label>
                      <Select
                        id="validationCustom01"
                        styles={customStyles}
                        value={selectedMulti1}
                        onChange={() => {
                          handleMulti1()
                        }}
                        options={optionGroup}
                        className="form-control"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <div className="mb-3">
                      <Label>Finacal Year</Label>
                      <Select
                        id="validationCustom01"
                        value={selectedMulti1}
                        onChange={() => {
                          handleMulti1()
                        }}
                        styles={customStyles}
                        options={optionGroup1}
                        className="form-control "
                      />
                    </div>
                  </Col>
                </Row>
                <Button color="primary" type="button">
                  Search
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
        <div className="tab_content p-0 bg-transparent manage-tab">
          <Row className="">
            <Col md="10"></Col>
            {/* <Col md="2">
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
            </Col> */}
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
    </React.Fragment>
  )
}
BtSearchList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default BtSearchList

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
