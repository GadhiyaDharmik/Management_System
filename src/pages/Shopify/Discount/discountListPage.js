import React, { useEffect, useMemo, useRef, useState } from "react"

//Export To PDF
import { useNavigate } from "react-router-dom"

import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Card,
  Collapse,
  Table,
  CardTitle,
  CardBody,
} from "reactstrap"

import downloadIcon from "../icons/download-svgrepo-com.svg"

import DeleteModal from "./Componants/DeleteModal"
import { includes } from "lodash"

function discountListPage() {
  const [isOpenCollapse1, setIsOpenCollapse1] = useState(false)
  const [singlebtn, setSinglebtn] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [statusModal, setStatusModal] = useState(false)
  const [discountList, setDiscountList] = useState(
    JSON.parse(localStorage.getItem("discountList")) != []
      ? JSON.parse(localStorage.getItem("discountList"))
      : []
  )
  const [discountRows, setDiscountRows] = useState([])

  const allChecked = useRef(null)

  const navigate = useNavigate()

  const toggleCollapse1 = () => {
    setIsOpenCollapse1(true)
  }
  var dateInPast = function (firstDate, secondDate, index) {
    if (firstDate?.setHours(0, 0, 0, 0) <= secondDate?.setHours(0, 0, 0, 0)) {
      discountList[index].status = "Active"
    }
    discountList[index].status = "Deactivat"
  }

  function handelCheck(event, row) {
    let checkedRow = [...discountRows]

    if (event.target.checked) {
      checkedRow?.push(row)
      toggleCollapse1()
    } else {
      checkedRow?.splice(checkedRow.indexOf(row), 1)
      toggleCollapse1()
    }
    setDiscountRows(checkedRow)
  }

  function handleDeleteItem() {
    let data = [...discountList]
    let selectedData = discountRows.map(ele => ele.id - 1)
    data.splice(selectedData, 1)
    setDiscountList(data)
    setDeleteModal(false)
  }

  function handleStatusItem() {
    let data = [...discountList]
    let dataIndex = discountRows.map(ele => ele.id - 1)
    data[dataIndex].status = "Active"
    // console.log(dataIndex)
    setDiscountList(data)
    // localStorage.setItem("discountList", discountList)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardBody>
            <CardTitle className="h4">
              <Row>
                <Col>
                  <span className="fs-2 fw-bold">Discounts</span>
                </Col>
                <Col>
                  <div className="d-flex flex-row-reverse">
                    <div>
                      <button
                        className="btn btn-lg btn-soft-primary btn-primary font-size-15"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/add-discount")}
                      >
                        Create discount
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-transeperent ps-3 pe-3 font-size-7 rounded-4"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <img src={downloadIcon} width="30" />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardTitle>
            <div className="table-responsive mt-2">
              <Table className="table mb-0 table-striped table-hover">
                <caption>
                  <Collapse
                    isOpen={discountRows.length > 0 ? isOpenCollapse1 : false}
                    id="faqs-gen-ques-collapse"
                  >
                    <Row className="w-50 m-auto">
                      <Col md="5">
                        <button
                          className="btn btn-lg btn-soft-primary btn-primary font-size-15"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleStatusItem()}
                        >
                          Activate Discount
                        </button>
                      </Col>
                      <Col md="5">
                        <button
                          className="btn btn-lg btn-soft-primary btn-primary font-size-15"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            // discountList.indexOf()
                            let data = [...discountList]
                            let indexOfRow = discountRows.map(
                              (ele, index) => ele.id - 1
                            )
                            data[indexOfRow].status = "deactive"
                            setDiscountList(data)
                          }}
                        >
                          Deactivate Discount
                        </button>
                      </Col>
                      <Col md="2">
                        <Dropdown
                          isOpen={singlebtn}
                          toggle={() => setSinglebtn(!singlebtn)}
                          direction="up"
                        >
                          <DropdownToggle
                            tag="button"
                            className="btn btn-lg btn-soft-primary btn-primary font-size-20 pt-0"
                            caret
                          >
                            ...
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem onClick={() => setDeleteModal(true)}>
                              Delete
                            </DropdownItem>
                            <DropdownItem>Something else here</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </Collapse>
                </caption>
                <thead>
                  <tr>
                    <th>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="allChecked"
                          onClick={e => {
                            toggleCollapse1()
                            allChecked.current.checked = e.target.checked
                            if (e.target.checked) {
                              discountList.map((row, index) => {
                                handelCheck(e, index)
                              })
                            } else {
                              setDiscountRows([])
                            }
                          }}
                        />
                      </div>
                    </th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Method</th>
                    <th>Type</th>
                    <th>Combines with</th>
                    <th>Used</th>
                  </tr>
                </thead>
                <tbody>
                  {discountList?.length != 0 ? (
                    discountList?.map((row, index) => (
                      <tr key={index}>
                        <td scope="row">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="allChecked"
                            onChange={e => handelCheck(e, row)}
                            ref={allChecked}
                          />
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.setItem("RowData", JSON.stringify(row))
                            navigate(`/add-discount/${row.id}`)
                          }}
                        >
                          <span className="fs-5 fw-bold">{row.code}</span>
                          <br />
                          <span className="font-size-14">
                            {row.limitNumberOfTimesValue}% off{" "}
                            {row.discountAppliesType}
                          </span>
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.setItem("RowData", JSON.stringify(row))
                            navigate(`/add-discount/${row.id}`)
                          }}
                        >
                          <span
                            className={`badge badge-pill bg-pill font-size-12 bg-soft-${
                              row.status == "deactive" ? "danger" : "success"
                            } badge bg-secondary`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.setItem("RowData", JSON.stringify(row))
                            navigate(`/add-discount/${row.id}`)
                          }}
                        >
                          {row.discountType}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.setItem("RowData", JSON.stringify(row))
                            navigate(`/add-discount/${row.id}`)
                          }}
                        >
                          {row.type}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.setItem("RowData", JSON.stringify(row))
                            navigate(`/add-discount/${row.id}`)
                          }}
                        >
                          {row.otherProductDiscounts == true
                            ? row.otherProductDiscounts == true &&
                              row.shippingDiscounts == true
                              ? "Combines with product and shipping discounts"
                              : "Combines with product discounts"
                            : row.shippingDiscounts == true
                            ? row.otherProductDiscounts == true &&
                              row.shippingDiscounts == true
                              ? "Combines with product and shipping discounts"
                              : "shipping discounts"
                            : "Not set to combine"}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            localStorage.setItem("RowData", JSON.stringify(row))
                            navigate(`/add-discount/${row.id}`)
                          }}
                        >
                          0
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan="7">
                        <iframe src="https://embed.lottiefiles.com/animation/13659"></iframe>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteItem}
          onCloseClick={() => setDeleteModal(false)}
        />
        {/* <DeleteModal
          show={statusModal}
          onDeleteClick={handleStatusItem}
          onCloseClick={() => setStatusModal(false)}
        /> */}
      </div>
    </React.Fragment>
  )
}

export default discountListPage
