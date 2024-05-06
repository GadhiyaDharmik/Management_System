import React, { useState } from "react"
import del from "../../../../../assets/images/table-delete.svg"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  CardTitle,
} from "reactstrap"
import classnames from "classnames"

function customerEligibility({
  summary,
  setSummary,
  openCustomer,
  coustemerNamesList,
  setOpenCustomer,
  addSpecificCustomerName,
  addSpecificCustomerSegments,
  searchSpecificCustomerSegment,
  coustemerNames,
  specificCustomerSegments,
  setSpecificCustomerSegments,
  setCoustemerNames,
}) {
  const [coustemerNamesLists, setCoustemerNamesLists] = useState(
    summary.specificCustomersValue
  )
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
  return (
    <React.Fragment>
      <div>
        <Card>
          <CardBody>
            <span className="fs-5 fw-bold">Customer eligibility</span>
            <br />
            <br />
            <div className="radio-btn">
              <div className="form-check form-check-inline">
                <Input
                  type="radio"
                  id="allCustomers"
                  name="eligibility"
                  className="form-check-input"
                  onChange={e =>
                    setSummary({
                      ...summary,
                      customerEligibility: {
                        allCustomers: e.target.checked,
                      },
                    })
                  }
                  defaultChecked={summary.customerEligibility.allCustomers}
                />
                <Label className="form-check-label" htmlFor="allCustomers">
                  <span className="font-size-6 fw-bold">All customers</span>
                </Label>
              </div>
            </div>
            <div className="radio-btn">
              <div className="form-check form-check-inline">
                <Input
                  type="radio"
                  id="specificCustomersSegment"
                  name="eligibility"
                  className="form-check-input"
                  onChange={e => {
                    setSummary({
                      ...summary,
                      customerEligibility: {
                        specificCustomerSegments: e.target.checked,
                      },
                    })
                  }}
                  defaultChecked={
                    summary.customerEligibility.specificCustomerSegments
                  }
                />
                <Label
                  className="form-check-label"
                  htmlFor="specificCustomersSegment"
                >
                  <span className="font-size-6 fw-bold">
                    Specific customer segments
                  </span>
                </Label>
              </div>
            </div>
            <div className="radio-btn">
              <div className="form-check form-check-inline">
                <Input
                  type="radio"
                  id="specificCustomers"
                  name="eligibility"
                  className="form-check-input"
                  onChange={e =>
                    setSummary({
                      ...summary,
                      customerEligibility: {
                        specificCustomers: e.target.checked,
                      },
                    })
                  }
                  defaultChecked={summary.customerEligibility.specificCustomers}
                />
                <Label className="form-check-label" htmlFor="specificCustomers">
                  <span className="font-size-6 fw-bold">
                    Specific customers{" "}
                  </span>
                </Label>
              </div>
            </div>
            <br />
            {summary.customerEligibility.specificCustomerSegments == true ? (
              <>
                <Row>
                  <Col md="9" sm="9" xs="8">
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
                        setOpenCustomer(true)
                      }}
                    />
                  </Col>
                  <Col md="2" sm="3" xs="2">
                    <Button
                      className="btn btn-invoice"
                      onClick={() => setOpenCustomer(true)}
                      type="submit"
                    >
                      Browse
                    </Button>
                  </Col>
                </Row>

                {summary.specificCustomerSegmentsListValue?.map(
                  (item, index) => (
                    <div key={index} className="mt-2">
                      <Card>
                        <Row>
                          <Col md={11}>
                            <CardBody>
                              <CardTitle className="h5">{item}</CardTitle>
                            </CardBody>
                          </Col>
                          <Col
                            md={1}
                            style={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                cursor: "pointer",
                                border: "none",
                              }}
                              className="btn btn-transparent"
                              onClick={() => {
                                let updatedList = [
                                  ...summary.specificCustomerSegmentsListValue,
                                ]
                                addSpecificCustomerSegments(
                                  updatedList.filter(ele => ele !== item)
                                )
                                // updatedList?.splice(data[item].id, 1)
                              }}
                            >
                              <img src={del} alt="" />
                            </button>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  )
                )}

                <span className="font-size-16 mt-1">
                  Select customer segments that can use this discount.
                </span>
              </>
            ) : summary.customerEligibility.specificCustomers == true ? (
              <>
                <Row>
                  <Col md="9" sm="9" xs="8">
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
                        setOpenCustomer(true)
                      }}
                    />
                  </Col>
                  <Col md="2" sm="3" xs="2">
                    <Button
                      className="btn btn-invoice"
                      onClick={() => setOpenCustomer(true)}
                      type="submit"
                    >
                      Browse
                    </Button>
                  </Col>
                </Row>
                {summary.specificCustomersListValue?.map((item, index) => (
                  <div key={index} className="mt-2">
                    <Card>
                      <Row>
                        <Col md={11}>
                          <CardBody>
                            <CardTitle className="h5">{item}</CardTitle>
                          </CardBody>
                        </Col>
                        <Col
                          md={1}
                          style={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <button
                            type="button"
                            style={{
                              cursor: "pointer",
                              border: "none",
                            }}
                            className="btn btn-transparent"
                            onClick={() => {
                              let updatedList = [
                                ...summary.specificCustomersListValue,
                              ]
                              addSpecificCustomerName(
                                updatedList.filter(ele => ele !== item)
                              )
                              // updatedList?.splice(data[item].id, 1)
                            }}
                          >
                            <img src={del} alt="" />
                          </button>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  )
}
export default customerEligibility
