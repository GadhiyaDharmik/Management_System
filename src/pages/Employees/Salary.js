import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from "../../components/Common/TableContainerCopy"
import * as Yup from "yup"
import { useFormik } from "formik"

import pdf from "../../assets/images/pdf.svg"

// import {
//   getCustomers as onGetCustomers,
//   addNewCustomer as onAddNewCustomer,
//   updateCustomer as onUpdateCustomer,
//   deleteCustomer as onDeleteCustomer,
//   getInvoicesList as onGetInvoicesList,
// } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  Col,
  Row,
  Badge,
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

function Salary({ id }) {
  const [modal, setModal] = useState(false)
  // const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([])

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


  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  // const onClickDelete = customer => {
  //   setCustomer(customer)
  //   setDeleteModal(true)
  // }

  // const handleDeleteCustomer = () => {
  //   if (customer.id) {
  //     dispatch(onDeleteCustomer(customer))
  //     setDeleteModal(false)
  //   }
  // }
  // const handleCustomerClicks = () => {
  //   setCustomerList("")
  //   setIsEdit(false)
  //   toggle()
  // }

  const columns = useMemo(
    () => [
      {
        Header: "salary no.",
        accessor: "invoiceno",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Number {...cellProps} />
        },
      },
      {
        Header: " Date",
        accessor: "invoicedate",
        disableGlobalFilter: true,
        disableSortBy: false, // if true the sortBy is disabled and remove sort icons
        filterable: true,
      },
      //   {
      //     Header: "Due Date",
      //     accessor: "duedate",
      //     filterable: true
      //   },
      {
        Header: "Total",
        accessor: "total",
        filterable: true,
        Cell: cellProps => {
          return <Total {...cellProps} />
        },
      },
      {
        Header: "Status",
        accessor: "customerStatus",
        filterable: true,
        Cell: cellProps => {
          return <InvoiceStatus {...cellProps} />
        },
      },
      {
        Header: "PDF",
        accessor: "pdf",
        filterable: true,
        Cell: cellProps => {
          return <PDF {...cellProps} />
        },
      },
    ],
    []
  )

  const data = [
    {
      invoiceno: "1",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Paid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "2",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Unpaid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "3",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Paid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "4",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Unpaid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "5",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Paid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "6",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Unpaid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "7",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Paid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "8",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Unpaid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "8",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Paid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
    {
      invoiceno: "9",
      invoicedate: "11/06/2022",
      duedate: "11/06/2022",
      total: "11.38",
      nextDue: "18/01/22",
      badgeclass: "success",
      customerStatus: "Unpaid",
      pdf: "https://helpx.adobe.com/acrobat/using/links-attachments-pdfs.html",
    },
  ]

  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        // onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <div className="tab-pane fade show active">
        <div className="tab_content tab-data-table">
          <Row>
            <Col xs="12">
              <div className="table_v1">
                <TableContainer
                  tableClassName="product-table table-shadow"
                  columns={columns}
                  data={data.filter(ele => ele.invoiceno == id)}
                  isGlobalFilter={true}
                  isAddCustomer={true}
                  isAddTableBorderStrap={true}
                  // handleCustomerClicks={handleCustomerClicks}
                  getTablePropsC={() => ({
                    className: "product-table ",
                  })}
                />
              </div>
            </Col>
          </Row>
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
    </React.Fragment>
  )
}
Salary.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default Salary

const PDF = cell => {
  return (
    <>
      <a className="download" href={cell.row.original.pdf}>
        <img src={pdf} alt="" /> PDF
      </a>
    </>
  )
}

const InvoiceStatus = cell => {
  return (
    <div className="d-flex">
      <div className="status_block">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.value === "Paid"
              ? "success"
              : "danger" && cell.value === "Unpaid"
              ? "danger"
              : "")
          }
        >
          {cell.value}
        </Badge>{" "}
      </div>
    </div>
  )
}

const Number = cell => {
  return (
    <div className="d-flex align-items-center country">
      {"#" + cell.row.original.invoiceno}
    </div>
  )
}

const Total = cell => {
  return (
    <div className="d-flex align-items-center country">
      {"$" + cell.row.original.total}
    </div>
  )
}
