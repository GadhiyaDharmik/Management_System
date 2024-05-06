import React, { useEffect, useMemo, useState } from "react"
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
import edit from "../../assets/images/table-edit.svg"
import del from "../../assets/images/table-delete.svg"
// import Table from "../../components/Common/Table"
import { getBranches, initAdd } from "../../store/actions"

//profile Image
import user4 from "../../assets/images/small/img-5.jpg"

import {
  WidServer,
  WidInvoice,
  WidTicket,
  WidBalance,
} from "../../components/Common/Widgets"

// import {
//   CustomerId,
//   Address,
//   BranchActions,
// } from "../../Ecommerce/EcommerceCustomers/EcommerceCustomerCol"

//redux
import { useSelector, useDispatch } from "react-redux"

import BranchModal from "./BranchModel"

import { Card, Col, Row } from "reactstrap"

import DeleteModal from "../../components/Common/DeleteModal"
import { data } from "jquery"

function DatatableTables() {
  const [totalCount, setTotalCount] = useState(15)

  const [openBranchEdit, setOpenBranchEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const branchs = useSelector(state => state.branch.branchs)

  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);

  const [isEdit, setIsEdit] = useState(false)

  //Add Holiday Modal
  const [openModal, setOpenModal] = useState(false)

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([])
  // //Api
  // const [size, setSize] = useState(10);
  // const [page, setPage] = useState(1);
  // const [search, setSearch] = useState('');

  // validation
  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     customerid: (customer && customer.customerid) || "",
  //     customerName: (customer && customer.customerName) || "",
  //     joiningDate: (customer && customer.joiningDate) || "",
  //     email: (customer && customer.email) || "",
  //     customerStatus: (customer && customer.customerStatus) || "Active",
  //     badgeclass: (customer && customer.badgeclass) || "success",
  //   },
  //   validationSchema: Yup.object({
  //     customerid: Yup.string().required("Please Enter Your Order Id"),
  //     customerName: Yup.string().required("Please Enter Your Billing Name"),
  //     joiningDate: Yup.string().required("Please Enter Your Order Date"),
  //     email: Yup.string().required("Total Amount"),
  //     customerStatus: Yup.string().required("Please Enter Your Payment Status"),
  //     badgeclass: Yup.string().required("Please Enter Your Badge Class"),
  //   }),
  //   onSubmit: values => {
  //     if (isEdit) {
  //       const updateCustomer = {
  //         id: customer ? customer.id : 0,
  //         customerid: values.customerid,
  //         customerName: values.customerName,
  //         joiningDate: values.joiningDate,
  //         email: values.email,
  //         customerStatus: values.customerStatus,
  //         badgeclass: values.badgeclass,
  //       }

  //       // update customer
  //       dispatch(onUpdateCustomer(updateCustomer))
  //       validation.resetForm()
  //     } else {
  //       const newCustomer = {
  //         id: Math.floor(Math.random() * (30 - 20)) + 20,
  //         customerid: values["customerid"],
  //         customerName: values["customerName"],
  //         joiningDate: values["joiningDate"],
  //         email: values["email"],
  //         customerStatus: values["customerStatus"],
  //         badgeclass: values["badgeclass"],
  //       }

  //       // save new customer
  //       dispatch(onAddNewCustomer(newCustomer))
  //       validation.resetForm()
  //     }
  //     toggle()
  //   },
  // })

  // const searchBranche = useDebouncedCallback(
  //   (e) => {
  //     dispatch(getBranches({ page, size, search: e.target.value.toLowerCase() }));
  //   },
  //   1000
  // );
  // const pageChange = (data) => {
  //   let p = data + 1;
  //   // setPage(p);
  //   dispatch(getBranches({ page: p, size, search }));
  // };
  // const pageSizeChange = (data) => {
  //   setSize(data);
  //   dispatch(getBranches({ page, size: data, search }));
  // };

  // const columnHeaderClick = (data) => {
  //   console.log(data);
  // };

  React.useEffect(() => {
    dispatch(getBranches())
  }, [])

  // const toggleViewModal = () => setModal1(!modal1);
  const [state, setState] = useState({
    data: branchs,
    page: 1,
    sizePerPage: 5,
  })



  const dispatch = useDispatch()
  function branchName(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <span className="fw-bold fs-5 text-capitalize">{row.name}</span>
      </div>
    )
    // console.log(row)
  }
  //Edit
  const handleEditEmployeeBranch = (cell, row, rowIndex, formatExtraData) => {
    setOpenBranchEdit(true)
    console.log(openBranchEdit)

  }
  //Delete Model
  const handleDeleteEmployee = (cell, row, rowIndex, formatExtraData) => {
    setDeleteModal(false)
  }
  function BranchActions(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
        <Row>
          <Col>
            <button
              className="btn btn-transparent"
              onClick={handleEditEmployeeBranch(cell, row, rowIndex, formatExtraData)}
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
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteEmployee}
          onCloseClick={() => setDeleteModal(false)}
        />
      </div>
    )
  }

  const columns = [
    {
      text: "Id",
      dataField: "id",
    },
    {
      text: "Branch Name",
      dataField: "name",
      formatter: branchName,
    },
    {
      text: "Phone Number",
      dataField: "phoneNumber",
    },
    {
      text: "Total Employee",
      dataField: "totalEmployee",
    },
    {
      text: "Address",
      dataField: "address",
      formatter: Address,
    },
    {
      text: "Actions",
      dataField: "Actions",
      formatter: BranchActions,
    },
  ]

  //search
  const handelBranchSearch = event => {
    let value = event.target.value
    if (value != "") {
      setBrancData(
        [...data].filter(ele =>
          ele.name.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setBrancData([...data].filter(ele => ele))
    }
  }
  const handleCustomerClicks = () => {
    setCustomerList("")
    setIsEdit(false)
    toggle()
  }

  const barnchAdd = () => {
    dispatch(initAdd())
    setOpenModal(true)
  }

  function handleTableChange(type, eventData) {
    console.log(type, eventData)
  }
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
          <Card>
            <div className="tab_content p-0 bg-transparent manage-tab">
              <Row>
                <Col md="12" className="text-end">
                  <button
                    className="btn pb-3 pt-6 btn-invoice"
                    onClick={() => {
                      barnchAdd()
                    }}
                  >
                    <div>
                      <i className="uil-plus"></i>
                    </div>
                    {"  "}Add Branch
                  </button>
                </Col>
              </Row>
            </div>
            <Row>
              <Col xs="12">
                <div className="table_v1">
                  {/* <Table
                    data={branchs}
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
          </Card>
          <BranchModal
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

//Branch Address

const Address = (cell, row, rowIndex, formatExtraData) => {
  return <div className="d-flex align-items-center country">{row.address}</div>
}

//Branch Modal

//Branch Address
const BranchName = (cell, row, rowIndex, formatExtraData) => {
  return <div className="d-flex align-items-center country">{row.address}</div>
}

//Branch Modal

//cell function
