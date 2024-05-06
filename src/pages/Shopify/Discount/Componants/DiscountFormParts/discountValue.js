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
  CardImg,
  CardTitle,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  FormGroup,
  CardHeader,
  CardFooter,
} from "reactstrap"
import classnames from "classnames"

function DiscountValue({
  summary,
  setSummary,
  data,
  appliesTo,
  setAppliesTo,
  handleAmountChange,
  setAmountType,
  setSelectedProductsCollection,
  setListOfProductCollection,
  dataOfCollection,
  setOpen,
}) {
  const [activeTabV, setactiveTabV] = useState("15")

  const [showFooter, setShowFooter] = useState(false)
  //List Of  Product Collection
  const [productsList, setProductsList] = useState(data)

  function search(event) {
    let value = event.target.value
    let productData = [...data]
    // setSearchValue(value)
    if (value != "") {
      setProductsList(
        productData.filter(ele =>
          ele.productName.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setProductsList([...data].filter(ele => ele))
    }
  }

  function searchCollection(event) {
    let value = event.target.value
    if (value != "") {
      setListOfProductCollection(
        [...dataOfCollection].filter(ele =>
          ele.collectionName.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setListOfProductCollection([...dataOfCollection].filter(ele => ele))
    }
  }

  function toggleCustomer() {
    setOpenCustomer(!openCustomer)
  }

  function toggleV(tab) {
    if (activeTabV !== tab) {
      setactiveTabV(tab)
    }
  }

  return (
    <React.Fragment>
      <div>
        <Card>
          <CardHeader className="bg-transparent">
            <span className="fs-5 fw-bold">Value</span>
            <Row className="mt-3">
              <Col md={6}>
                <Nav pills className="flex-column">
                  <Row>
                    <Col>
                      <NavLink
                        style={{ cursor: "pointer", textAlign: "center" }}
                        className={classnames({
                          active: activeTabV === "15",
                        })}
                        onClick={() => {
                          toggleV("15")
                          setShowFooter(false)
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">Percentage</span>
                      </NavLink>
                    </Col>
                    <Col>
                      <NavLink
                        style={{ cursor: "pointer", textAlign: "center" }}
                        className={classnames({
                          active: activeTabV === "16",
                        })}
                        onClick={() => {
                          toggleV("16")
                          setShowFooter(true)
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">Fixed Amount</span>
                      </NavLink>
                    </Col>
                  </Row>
                </Nav>
              </Col>
              <Col md={6}>
                <TabContent
                  activeTab={activeTabV}
                  className="text-muted mt-4 mt-md-0"
                >
                  <TabPane tabId="15">
                    <FormGroup>
                      <Input
                        name="percentage"
                        placeholder="%"
                        value={summary.percentage}
                        type="text"
                        onChange={e => handleAmountChange(e.target.value)}
                        className="form-control"
                        id="percentage"
                      />
                    </FormGroup>
                  </TabPane>
                  <TabPane tabId="16">
                    <FormGroup>
                      <Input
                        name="fixedAmount"
                        placeholder="Amount"
                        value={summary.fixedAmount}
                        onChange={e => {
                          setSummary({
                            ...summary,
                            fixedAmount: e.target.value,
                          })
                          setAmountType("Fixed Amount")
                        }}
                        type="number"
                        className="form-control"
                        id="discountCode"
                      />
                    </FormGroup>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <span className="font-size-16 fw-bold">Applies to</span>
            <br />
            <br />
            <div className="radio-btn">
              <div className="form-check form-check-inline">
                <Input
                  type="radio"
                  id="collections"
                  name="appliesTo"
                  className="form-check-input"
                  onChange={() => {
                    setSummary({
                      ...summary,
                      discountAppliesType: "collections",
                    })
                    // defaultChecked={false}
                    setSelectedProducts([])
                    setAppliesTo({ ...appliesTo, appliesToProduct: "" })
                  }}
                  defaultChecked={
                    summary.discountAppliesType == "collections" ? true : false
                  }
                />
                <Label className="form-check-label" htmlFor="collections">
                  <span className="font-size-6 fw-bold">
                    Specific collections
                  </span>
                </Label>
              </div>
            </div>
            <div className="radio-btn">
              <div className="form-check form-check-inline">
                <Input
                  type="radio"
                  id="products"
                  name="appliesTo"
                  onChange={() => {
                    setSummary({
                      ...summary,
                      discountAppliesType: "products",
                    })
                    setSelectedProductsCollection([])
                    setAppliesTo({
                      ...appliesTo,
                      appliesToCollections: "",
                    })
                  }}
                  className="form-check-input"
                  defaultChecked={
                    summary.discountAppliesType == "products" ? true : false
                  }
                />
                <Label className="form-check-label" htmlFor="products">
                  <span className="font-size-6 fw-bold">Specific products</span>
                </Label>
              </div>
            </div>
            <FormGroup className="mb-3">
              {summary.discountAppliesType == "products" ? (
                <>
                  <Row>
                    <Col md="9" sm="9" xs="8">
                      <Input
                        name="productsList"
                        placeholder="Search Product"
                        type="text"
                        className="form-control mt-1"
                        id="productsList"
                        value={appliesTo.appliesToProduct}
                        onChange={e => {
                          search(e)
                          setAppliesTo({
                            ...appliesTo,
                            appliesToProduct: e.target.value,
                          })
                          if (e.target.value) setOpen(true)
                        }}
                      />
                    </Col>
                    <Col md="2" sm="3" xs="2">
                      <Button
                        className="btn btn-invoice"
                        onClick={() => setOpen(true)}
                      >
                        Browse
                      </Button>
                    </Col>
                  </Row>
                  {summary.productList?.map((item, index) => (
                    <div key={index} className="mt-2">
                      <Card>
                        <Row>
                          <Col md={2} style={{ maxWidth: "50%" }}>
                            <CardImg
                              className="img-fluid"
                              src={item.productImage}
                              alt="Card image cap"
                              style={{ maxWidth: "100%" }} 
                            />
                          </Col>
                          <Col md={9}>
                            <CardBody>
                              <CardTitle className="h5">
                                {item.productName}
                              </CardTitle>
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
                                let updatedList = [...summary.productList]
                                setSummary({
                                  ...summary,
                                  productList: updatedList.filter(
                                    ele => ele?.id !== item.id
                                  ),
                                })
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
                <>
                  <Row>
                    <Col md="9" sm="9" xs="8">
                      <Input
                        name="collections"
                        placeholder="collections"
                        type="text"
                        value={appliesTo.appliesToCollections}
                        className="form-control mt-1"
                        id="collections"
                        onChange={e => {
                          searchCollection(e)
                          setAppliesTo({
                            ...appliesTo,
                            appliesToCollections: e.target.value,
                          })
                          if (e.target.value) setOpen(true)
                        }}
                      />
                    </Col>
                    <Col md="2" sm="3" xs="2">
                      <Button
                        className="btn btn-invoice"
                        onClick={() => setOpen(true)}
                      >
                        Browse
                      </Button>
                    </Col>
                  </Row>
                  {summary.collection?.map((item, index) => (
                    <div key={index} className="mt-2">
                      <Card>
                        <Row>
                          <Col md={11}>
                            <CardBody>
                              <CardTitle className="h5">
                                {
                                  dataOfCollection[
                                    dataOfCollection.indexOf(item)
                                  ]?.collectionName
                                }
                              </CardTitle>
                            </CardBody>
                          </Col>
                          <Col
                            md={1}
                            className="text-end"
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
                                let updatedList = [...summary.collection]
                                setSummary(
                                  {
                                    ...summary,
                                    collection: updatedList.filter(
                                      ele => ele.id !== item.id
                                    ),
                                  }
                                  // updatedList?.splice(data[item].id, 1)
                                )
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
              )}
            </FormGroup>
          </CardBody>
          {showFooter == true ? (
            <>
              <CardFooter className="bg-transparent">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="appliesTime"
                    value="checked"
                    onChange={e => {
                      setSummary({
                        ...summary,
                        appliesTime: e.target.checked,
                      })
                    }}
                  />
                  <Label className="form-check-label" htmlFor="appliesTime">
                    Only apply discount once per order{" "}
                  </Label>
                  <br />
                  <span>
                    If not selected, ₹
                    {summary.fixedAmount ? summary.fixedAmount : ""} will be
                    taken off each eligible item in an order.
                  </span>
                </div>
              </CardFooter>
            </>
          ) : (
            ""
          )}
        </Card>
      </div>
    </React.Fragment>
  )
}
export default DiscountValue
