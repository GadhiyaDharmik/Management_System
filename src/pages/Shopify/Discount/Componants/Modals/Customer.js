import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

// Date Picker
import DatePicker from "react-datepicker"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  Row,
  Col,
  CardBody,
  Button,
  Label,
  Input,
  CardTitle,
  Modal,
} from "reactstrap"

function CustomerModal({
  summary,
  setSummary,
  openCustomer,
  setOpenCustomer,
  coustemerNamesList,
  coustemerNames,
  setCoustemerNames,
  specificCustomerSegments,
  selectedCoustemerNames,
  setSelectedCoustemerNames,
  selectedSpecificCustomerSegments,
  setSelectedSpecificCustomerSegments,
  specificCustomerSegmentsList,
  setSpecificCustomerSegments,
  addSpecificCustomerName,
  addSpecificCustomerSegments,
}) {
  const [selectCoustemerNames, setSelectCoustemerNames] = useState([])
  const [selectSpecificCustomerSegments, setSelectSpecificCustomerSegments] =
    useState([])
  function toggleCustomer() {
    setOpenCustomer(!openCustomer)
  }

  function searchSpecificCustomer(event) {
    let value = event.target.value
    if (value != "") {
      setCoustemerNames(
        [...coustemerNames].filter(ele =>
          ele.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setCoustemerNames([...coustemerNamesList].filter(ele => ele))
    }
  }

  function searchSpecificCustomerSegment(event) {
    let value = event.target.value
    if (value != "") {
      setSpecificCustomerSegments(
        [...specificCustomerSegments].filter(ele =>
          ele.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setSpecificCustomerSegments(
        [...specificCustomerSegmentsList].filter(ele => ele)
      )
    }
  }

  const handleCheckCoustomer = (event, row) => {
    let updatedList = [...selectCoustemerNames]
    if (event.target.checked) {
      updatedList = [...selectCoustemerNames, row]
    } else {
      updatedList.splice(selectCoustemerNames.indexOf(row), 1)
    }
    setSelectCoustemerNames(updatedList)
  }

  const handleCheckCoustomerSegments = (event, row) => {
    var updatedList = [...selectSpecificCustomerSegments]
    if (event.target.checked) {
      updatedList = [...selectSpecificCustomerSegments, row]
    } else {
      updatedList.splice(selectSpecificCustomerSegments.indexOf(row), 1)
    }
    setSelectSpecificCustomerSegments(updatedList)
  }

  return (
    <React.Fragment>
      <div>
        <Modal
          isOpen={openCustomer}
          toggle={() => {
            toggleCustomer()
          }}
          size="xl"
        >
          <h5 className="modal-title">Add Coustomer Eligibility</h5>
          <div className="modal-body">
            {summary.customerEligibility.specificCustomers == true ? (
              <>
                <Input
                  name="specificCustomers"
                  placeholder="Specific Customers"
                  type="text"
                  value={summary.specificCustomersValue}
                  className="form-control mt-1"
                  id="specificCustomers"
                  onChange={e => {
                    searchSpecificCustomer(e)
                    setSummary({
                      ...summary,
                      specificCustomersValue: e.target.value,
                    })
                  }}
                />
                <hr />
                {coustemerNames?.map((row, index) => (
                  <div className="form-check" key={index}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      style={{ marginTop: "35px" }}
                      id={index}
                      value="checked"
                      onChange={e => handleCheckCoustomer(e, row)}
                      defaultChecked={summary.specificCustomersListValue?.includes(row)}
                    />
                    <Label className="form-check-label" htmlFor={index}>
                      <Row>
                        <Col md={12}>
                          <CardBody>
                            <CardTitle className="h5">{row}</CardTitle>
                          </CardBody>
                        </Col>
                      </Row>
                    </Label>
                  </div>
                ))}
              </>
            ) : (
              <>
                <Input
                  name="specificCustomerSegments"
                  placeholder="Search Customer Segments"
                  value={summary.specificCustomerSegmentsValue}
                  type="text"
                  className="form-control mt-1"
                  id="specificCustomerSegments"
                  onChange={e => {
                    searchSpecificCustomerSegment(e)
                    setSummary({
                      ...summary,
                      specificCustomerSegmentsValue: e.target.value,
                    })
                  }}
                />
                <hr />
                {specificCustomerSegments?.map((row, index) => (
                  <div className="form-check" key={index}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      style={{ marginTop: "35px" }}
                      id={index}
                      value="checked"
                      onChange={e => handleCheckCoustomerSegments(e, row)}
                      defaultChecked={summary.specificCustomerSegmentsListValue?.includes(
                        row
                      )}
                    />
                    <Label className="form-check-label" htmlFor={index}>
                      <Row>
                        <Col md={12}>
                          <CardBody>
                            <CardTitle className="h5">{row}</CardTitle>
                          </CardBody>
                        </Col>
                      </Row>
                    </Label>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="modal-footer">
            <Button
              className="btn pb-3 pt-3 btn-invoice ms-4"
              onClick={() => {
                setOpenCustomer(false)
                setSummary({
                  ...summary,
                  specificCustomersValue: "",
                  specificCustomerSegmentsValue: "",
                })
                setSelectedCoustemerNames([])
                setSelectCoustemerNames([])
                setSelectSpecificCustomerSegments([])
                setSelectedSpecificCustomerSegments([])
              }}
            >
              <span className="font-size-14 m-auto">Cancle</span>
            </Button>
            <Button
              className={`btn pb-3 pt-3 btn-invoice ms-4 ${
                selectCoustemerNames?.length > 0 ||
                selectSpecificCustomerSegments?.length > 0
                  ? ""
                  : "disabled"
              }`}
              onClick={() => {
                setOpenCustomer(false)
                if (summary.customerEligibility.specificCustomers == true) {
                  addSpecificCustomerName(selectCoustemerNames)

                  setSelectCoustemerNames([])
                }
                if (
                  summary.customerEligibility.specificCustomerSegments == true
                ) {
                  addSpecificCustomerSegments(selectSpecificCustomerSegments)

                  setSelectSpecificCustomerSegments([])
                }
              }}
              type="button"
            >
              <span className="font-size-14 m-auto">Add</span>
            </Button>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default CustomerModal
