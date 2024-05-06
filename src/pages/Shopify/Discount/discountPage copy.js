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
  Card,
  CardBody,
  Button,
  Label,
  Input,
  CardImg,
  CardTitle,
  CardText,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  FormGroup,
  CardHeader,
  CardFooter,
} from "reactstrap"
import classnames from "classnames"

import del from "../../../assets/images/table-delete.svg"

import { useNavigate, useParams } from "react-router-dom"

const coustemerNamesList = [
  "River Larue",
  "Kenya Woodworth",
  "Thomas Fay",
  "Britton Luu",
  "Keegan Estrada",
  "Stefani Cowart",
  "Giavanna Becerra",
  "Leif Juarez",
  "Paloma Luce",
  "Erica Foss",
  "Tariq Ahrens",
  "Giovanni Baughman",
  "Jerome Hedrick",
]
const specificCustomerSegmentsList = [
  "Abandoned checkouts",
  "Email subscribers",
  "New",
  "Returning",
]

const data = [
  {
    id: 1,
    productName: "ipone",
    productImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRNbBYJMpadu9mFFz2_0A73st1svwKRBwxQhmhuMMJYtuItv1J5AiaCZPQKsooPIhUYP0O4Fsgpqlstx7ErNzZkwcHhybipKZWkErZgnP5ShYxKujtc4EpWWVk7NWFx_y55wg&usqp=CAc",
  },
  {
    id: 2,
    productName: "vivo phone",
    productImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiiCKBGsHZJfItsR8r3yvozks5kQv5SeQfoQPvaP2rXQ&usqp=CAU&ec=48665698",
  },
  {
    id: 3,
    productName: "oppo",
    productImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRNbBYJMpadu9mFFz2_0A73st1svwKRBwxQhmhuMMJYtuItv1J5AiaCZPQKsooPIhUYP0O4Fsgpqlstx7ErNzZkwcHhybipKZWkErZgnP5ShYxKujtc4EpWWVk7NWFx_y55wg&usqp=CAc",
  },
  {
    id: 4,
    productName: "samsung",
    productImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiiCKBGsHZJfItsR8r3yvozks5kQv5SeQfoQPvaP2rXQ&usqp=CAU&ec=48665698",
  },
  {
    id: 5,
    productName: "motorola",
    productImage:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRNbBYJMpadu9mFFz2_0A73st1svwKRBwxQhmhuMMJYtuItv1J5AiaCZPQKsooPIhUYP0O4Fsgpqlstx7ErNzZkwcHhybipKZWkErZgnP5ShYxKujtc4EpWWVk7NWFx_y55wg&usqp=CAc",
  },
  {
    id: 6,
    productName: "nokia",
    productImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiiCKBGsHZJfItsR8r3yvozks5kQv5SeQfoQPvaP2rXQ&usqp=CAU&ec=48665698",
  },
]

const dataOfCollection = [{ collectionName: "Phone", productList: data }]

function discountPage() {
  const [activeTabV, setactiveTabV] = useState("15")
  const { id } = useParams()

  const navigate = useNavigate()

  //List Of  Product Collection
  const [productsList, setProductsList] = useState(data)
  const [listOfProductCollection, setListOfProductCollection] =
    useState(dataOfCollection)

  const [open, setOpen] = useState(false)
  const [openCustomer, setOpenCustomer] = useState(false)

  const [coustemerNames, setCoustemerNames] = useState(coustemerNamesList)
  const [specificCustomerSegments, setSpecificCustomerSegments] = useState(
    specificCustomerSegmentsList
  )

  const [selectCoustemerNames, setSelectCoustemerNames] = useState([])
  const [selectSpecificCustomerSegments, setSelectSpecificCustomerSegments] =
    useState([])

  const [appliesTo, setAppliesTo] = useState({
    appliesToCollections: "",
    appliesToProduct: "",
  })

  const [amountType, setAmountType] = useState(
    "No minimum purchase requirement"
  )
  const [discountList, setDiscountList] = useState(
    JSON.parse(localStorage.getItem("discountList"))
      ? JSON.parse(localStorage.getItem("discountList"))
      : []
  )
  const [updateDiscount, setUpdateDiscount] = useState(
    discountList.filter(ele => ele.id == id)
  )
  const summarys = {
    id: discountList[discountList.length + 1]?.id + 1,
    type: "Amount off products",
    code: id ? (updateDiscount[0].code ? updateDiscount[0].code : "") : "",
    discountTitle: id
      ? updateDiscount[0].discountTitle
        ? updateDiscount[0].discountTitle
        : ""
      : "",
    percentage: id
      ? updateDiscount[0].percentage
        ? updateDiscount[0].percentage
        : ""
      : "",
    status: id
      ? updateDiscount[0].status
        ? updateDiscount[0].status
        : false
      : false,
    fixedAmount: id
      ? updateDiscount[0].fixedAmount
        ? updateDiscount[0].fixedAmount
        : ""
      : "",
    discountType: id
      ? updateDiscount[0].discountType
        ? updateDiscount[0].discountType
        : "code"
      : "code",
    discountAppliesType: id
      ? updateDiscount[0].discountAppliesType
        ? updateDiscount[0].discountAppliesType
        : "collections"
      : "collections",
    productList: id
      ? updateDiscount[0].productList != []
        ? updateDiscount[0].productList.map((ele, index) => index)
        : []
      : [],
    collection: id
      ? updateDiscount[0].collection != []
        ? updateDiscount[0].collection.map((ele, index) => index)
        : []
      : [],
    appliesTime: id
      ? updateDiscount[0].appliesTime
        ? updateDiscount[0].appliesTime
        : false
      : false,
    pointOfSale: id
      ? updateDiscount[0].pointOfSale
        ? updateDiscount[0].pointOfSale
        : false
      : false,
    minimumPurchaseRequirements: {
      noMinimumRequirements: id
        ? updateDiscount[0].noMinimumRequirements
          ? updateDiscount[0].noMinimumRequirements
          : true
        : true,
      minimumPurchaseAmount: id
        ? updateDiscount[0].minimumPurchaseAmount
          ? updateDiscount[0].minimumPurchaseAmount
          : false
        : false,
      minimumQuantityOfItems: id
        ? updateDiscount[0].minimumQuantityOfItems
          ? updateDiscount[0].minimumQuantityOfItems
          : false
        : false,
    },
    minimumPurchaseAmountValue: id
      ? updateDiscount[0].minimumPurchaseAmountValue
        ? updateDiscount[0].minimumPurchaseAmountValue
        : 0
      : 0,
    minimumQuantityOfItemsValue: id
      ? updateDiscount[0].minimumQuantityOfItemsValue
        ? updateDiscount[0].minimumQuantityOfItemsValue
        : 0
      : 0,
    customerEligibility: {
      allCustomers: id
        ? updateDiscount[0].allCustomers
          ? updateDiscount[0].allCustomers
          : true
        : true,
      specificCustomerSegments: id
        ? updateDiscount[0].specificCustomerSegments
          ? updateDiscount[0].specificCustomerSegments
          : false
        : false,
      specificCustomers: id
        ? updateDiscount[0].specificCustomers
          ? updateDiscount[0].specificCustomers
          : false
        : false,
    },
    specificCustomerSegmentsValue: id
      ? updateDiscount[0].specificCustomerSegmentsValue
        ? updateDiscount[0].specificCustomerSegmentsValue
        : []
      : [],
    specificCustomersValue: id
      ? updateDiscount[0].specificCustomersValue
        ? updateDiscount[0].specificCustomersValue
        : []
      : [],
    limitNumberOfTimes: id
      ? updateDiscount[0].limitNumberOfTimes
        ? updateDiscount[0].limitNumberOfTimes
        : false
      : false,
    limitToOneTime: id
      ? updateDiscount[0].limitToOneTime
        ? updateDiscount[0].limitToOneTime
        : false
      : false,
    limitNumberOfTimesValue: id
      ? updateDiscount[0].limitNumberOfTimesValue
        ? updateDiscount[0].limitNumberOfTimesValue
        : 0
      : 0,
    otherProductDiscounts: id
      ? updateDiscount[0].otherProductDiscounts
        ? updateDiscount[0].otherProductDiscounts
        : false
      : false,
    shippingDiscounts: id
      ? updateDiscount[0].shippingDiscounts
        ? updateDiscount[0].shippingDiscounts
        : false
      : false,
    startDate: new Date(),
    startTime: new Date(),
    setEndDate: id
      ? updateDiscount[0].setEndDate
        ? updateDiscount[0].setEndDate
        : false
      : false,
    endDate: new Date(),
    endTime: new Date(),
  }
  const [summary, setSummary] = useState(summarys)

  //On Select Product / Product Collection
  const [selectedProducts, setSelectedProducts] = useState(
    id ? summarys.productList?.map((ele, index) => ele.id - 1) : []
  )
  const [selectedProductsCollection, setSelectedProductsCollection] = useState(
    id ? summarys.collection.map((ele, index) => ele.id - 1) : []
  )

  const [selectedCoustemerNames, setSelectedCoustemerNames] = useState(
    id ? summarys.specificCustomersValue.map((ele, index) => ele.id - 1) : []
  )
  const [
    selectedSpecificCustomerSegments,
    setSelectedSpecificCustomerSegments,
  ] = useState(
    id
      ? summarys.specificCustomerSegmentsValue.map((ele, index) => ele.id - 1)
      : []
  )

  const [searchValue, setSearchValue] = useState("")
  //Add Selected Product / Product Collection

  // React.useEffect(() => {
  //   setSummary({ ...summary, collection: selectedCollectionList })
  // }, [selectedCollectionList])
  // React.useEffect(() => {
  //   setSummary({ ...summary, specificCustomersValue: selectedCoustemerNames })
  // }, [selectedCoustemerNames])
  // React.useEffect(() => {
  //   setSummary({
  //     ...summary,
  //     specificCustomerSegmentsValue: selectedSpecificCustomerSegments,
  //   })
  // }, [selectedProductsList])

  const [showFooter, setShowFooter] = useState(false)

  function formatAMPM(time) {
    let date = time
    var hours = date?.getHours()
    var minutes = date?.getMinutes()
    var ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes
    var strTime = hours + ":" + minutes + " " + ampm
    return strTime
  }

  function getDate(startDate, endDate) {
    let startMonth = startDate?.substring(0, 1)
    let endMonth = endDate?.substring(0, 1)
    let satrtingDate = startDate?.substring(2, 4)
    let endingDate = endDate?.substring(2, 4)

    return (
      monthL[startMonth - 1] +
      " " +
      satrtingDate.replace("/", "") +
      " " +
      formatAMPM(summary.startTime) +
      " To " +
      monthL[endMonth - 1] +
      " " +
      endingDate.replace("/", "") +
      " " +
      formatAMPM(summary.endTime)
    )
  }

  function toggleV(tab) {
    if (activeTabV !== tab) {
      setactiveTabV(tab)
    }
  }

  function generateCode() {
    const charters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var code = ""
    for (var i = 12; i > 0; --i)
      code += charters[Math.floor(Math.random() * charters.length)]
    setSummary({ ...summary, code: code })
  }

  function handleAmountChange(amount) {
    if (amount <= 100) {
      setSummary({
        ...summary,
        percentage: amount,
      })
      setAmountType("percentage")
    }
  }

  const handleCheck = (event, row) => {
    var updatedList = [...selectedProducts]
    if (event.target.checked == true) {
      updatedList = [...updatedList, row]
    } else {
      updatedList.splice(selectedProducts.indexOf(row), 1)
    }

    // console.log(event, updatedList)
    // console.log("updatedList", updatedList)
    setSelectedProducts(updatedList)
  }
  const handleCheckCollection = (event, index) => {
    var updatedList = [...selectedProductsCollection]
    if (event.target.checked) {
      updatedList = [...selectedProductsCollection, index]
    } else {
      updatedList.splice(selectedProductsCollection.indexOf(index), 1)
    }
    setSelectedProductsCollection(updatedList)
  }

  var monthL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handleSubmitData = () => {
    let dataList = [...discountList]

    if (id) {
      dataList[parseInt(id) - 1] = summary
      localStorage.setItem("discountList", JSON.stringify(dataList))
      navigate("/discount-page")
    } else {
      dataList.push(summary)
      localStorage.setItem("discountList", JSON.stringify(dataList))
      navigate("/discount-page")
    }
  }

  function toggle() {
    setOpen(!open)
    // removeBodyCss()
  }
  function toggleCustomer() {
    setOpenCustomer(!openCustomer)
  }

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

  const handleCheckCoustomer = (event, index) => {
    var updatedList = [...selectCoustemerNames]
    if (event.target.checked) {
      updatedList = [...selectCoustemerNames, index]
    } else {
      updatedList.splice(selectCoustemerNames.indexOf(index), 1)
    }
    setSelectCoustemerNames(updatedList)
  }

  const handleCheckCoustomerSegments = (event, index) => {
    var updatedList = [...selectSpecificCustomerSegments]
    if (event.target.checked) {
      updatedList = [...selectSpecificCustomerSegments, index]
    } else {
      updatedList.splice(selectSpecificCustomerSegments.indexOf(index), 1)
    }
    setSelectSpecificCustomerSegments(updatedList)
  }
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <Row>
            <Col lg="8" sm="12" xs="12">
              <Card>
                <CardBody>
                  <div className="radio-btn">
                    <div className="form-check form-check-inline">
                      <Input
                        type="radio"
                        id="discountCode"
                        name="automatic"
                        className="form-check-input"
                        onChange={() =>
                          setSummary({ ...summary, discountType: "code" })
                        }
                        defaultChecked
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="discountCode"
                      >
                        <span className="font-size-6 fw-bold"></span>
                      </Label>
                    </div>
                  </div>
                  <div className="radio-btn">
                    <div className="form-check form-check-inline">
                      <Input
                        type="radio"
                        id="automatic"
                        name="automatic"
                        onChange={() =>
                          setSummary({ ...summary, discountType: "Automatic" })
                        }
                        className="form-check-input"
                      />
                      <Label className="form-check-label" htmlFor="automatic">
                        <span className="font-size-6 fw-bold">
                          Automatic discount
                        </span>
                      </Label>
                    </div>
                  </div>
                  <FormGroup className="mb-3">
                    {summary.discountType == "code" ? (
                      <>
                        <Row>
                          <Col md="9" sm="9" xs="8">
                            <Label htmlFor="discountCode">Discount code</Label>
                            <Input
                              name="code"
                              placeholder="Discount code"
                              value={summary.code}
                              type="text"
                              className="form-control"
                              id="discountCode"
                              onChange={e =>
                                setSummary({ ...summary, code: e.target.value })
                              }
                            />
                          </Col>
                          <Col md="2" sm="3" xs="2">
                            <Button
                              className="btn btn-invoice mt-4"
                              onClick={() => generateCode()}
                              type="submit"
                            >
                              Generate
                            </Button>
                          </Col>
                        </Row>
                        <span className="font-size-12 ">
                          Customers must enter this code at checkout.
                        </span>
                      </>
                    ) : (
                      <>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          name="title"
                          placeholder="Title"
                          type="text"
                          className="form-control"
                          id="title"
                          onChange={e =>
                            setSummary({
                              ...summary,
                              discountTitle: e.target.value,
                            })
                          }
                        />
                        <span className="font-size-6">
                          Customers will see this in their cart and at checkout.
                        </span>
                      </>
                    )}
                  </FormGroup>
                </CardBody>
              </Card>
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
                              <span className="d-none d-sm-block">
                                Percentage
                              </span>
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
                              <span className="d-none d-sm-block">
                                Fixed Amount
                              </span>
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
                          summary.discountAppliesType == "collections"
                            ? true
                            : false
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
                          summary.discountAppliesType == "products"
                            ? true
                            : false
                        }
                      />
                      <Label className="form-check-label" htmlFor="products">
                        <span className="font-size-6 fw-bold">
                          Specific products
                        </span>
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
                                    src={data[item]?.productImage}
                                    alt="Card image cap"
                                    style={{ maxWidth: "100%" }}
                                  />
                                </Col>
                                <Col md={9}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      {data[item]?.productName}
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
                                        ...summarys,
                                        productList: updatedList.filter(
                                          ele => data[ele]?.id !== data[item].id
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
                                            ele =>
                                              data[ele].id !== data[item].id
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
                        <Label
                          className="form-check-label"
                          htmlFor="appliesTime"
                        >
                          Only apply discount once per order{" "}
                        </Label>
                        <br />
                        <span>
                          If not selected, ₹
                          {summary.fixedAmount ? summary.fixedAmount : ""} will
                          be taken off each eligible item in an order.
                        </span>
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  ""
                )}
              </Card>
              <Card>
                <CardBody>
                  <Row>
                    <Col md="8" sm="6" xs="12">
                      <span className="fs-5 fw-bold">Sales channels</span>
                    </Col>
                    <Col md="4 text-end" sm="6 " xs="12 text-end">
                      <span className="font-size-6">
                        {summary.pointOfSale == true ? 1 : 0} of 1 selected
                      </span>
                    </Col>
                  </Row>
                  <br />
                  <span>
                    Select where this discount will be visible and promoted.
                    Online store is included by default.
                  </span>
                  <br />
                  <br />
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="pointOfSale"
                      value="checked"
                      onChange={e =>
                        setSummary({
                          ...summary,
                          pointOfSale: e.target.checked,
                        })
                      }
                    />
                    <Label className="form-check-label" htmlFor="pointOfSale">
                      <span className="font-size-6 fw-bold">Point of Sale</span>
                    </Label>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <span className="fs-5 fw-bold">
                    Minimum purchase requirements
                  </span>
                  <br />
                  <br />
                  <span className="font-size-16">
                    Select where this discount will be visible and promoted.
                    Online store is included by default.
                  </span>
                  <br />
                  <br />

                  <div className="radio-btn">
                    <div className="form-check form-check-inline">
                      <Input
                        type="radio"
                        id="noRequirements"
                        name="requirements"
                        className="form-check-input"
                        onChange={e =>
                          setSummary({
                            ...summary,
                            minimumPurchaseRequirements: {
                              noMinimumRequirements: e.target.checked,
                            },
                          })
                        }
                        defaultChecked
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="noRequirements"
                      >
                        <span className="font-size-6 fw-bold">
                          No minimum requirements
                        </span>
                      </Label>
                    </div>
                  </div>
                  <div className="radio-btn">
                    <div className="form-check form-check-inline">
                      <Input
                        type="radio"
                        id="minimumPaseAmount"
                        name="requirements"
                        onChange={e =>
                          setSummary({
                            ...summary,
                            minimumPurchaseRequirements: {
                              minimumPurchaseAmount: e.target.checked,
                            },
                          })
                        }
                        className="form-check-input"
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="minimumPaseAmount"
                      >
                        <span className="font-size-6 fw-bold">
                          Minimum purchase amount (₹)
                        </span>
                      </Label>
                    </div>
                  </div>
                  {summary.minimumPurchaseRequirements.minimumPurchaseAmount ==
                  true ? (
                    <FormGroup>
                      <Input
                        name="purchaseAmount"
                        placeholder="₹ 0.00"
                        value={summary.minimumPurchaseAmountValue}
                        type="text"
                        onChange={e =>
                          setSummary({
                            ...summary,
                            minimumPurchaseAmountValue: e.target.value,
                          })
                        }
                        className="form-control w-25 ms-4"
                        id="purchaseAmount"
                      />
                    </FormGroup>
                  ) : (
                    ""
                  )}
                  <div className="radio-btn">
                    <div className="form-check form-check-inline">
                      <Input
                        type="radio"
                        id="minimumQuantity"
                        name="requirements"
                        onChange={e =>
                          setSummary({
                            ...summary,
                            minimumPurchaseRequirements: {
                              minimumQuantityOfItems: e.target.checked,
                            },
                          })
                        }
                        className="form-check-input"
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="minimumQuantity"
                      >
                        <span className="font-size-6 fw-bold">
                          Minimum quantity of items
                        </span>
                      </Label>
                    </div>
                  </div>
                  {summary.minimumPurchaseRequirements.minimumQuantityOfItems ==
                  true ? (
                    <FormGroup>
                      <Input
                        name="quantityOfItems"
                        placeholder=""
                        value={summary.minimumQuantityOfItemsValue}
                        type="text"
                        onChange={e =>
                          setSummary({
                            ...summary,
                            minimumQuantityOfItemsValue: e.target.value,
                          })
                        }
                        className="form-control w-25 ms-4"
                        id="quantityOfItems"
                      />
                    </FormGroup>
                  ) : (
                    ""
                  )}
                </CardBody>
              </Card>
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
                        defaultChecked={
                          summary.customerEligibility.allCustomers
                        }
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="allCustomers"
                      >
                        <span className="font-size-6 fw-bold">
                          All customers
                        </span>
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
                        defaultChecked={
                          summary.customerEligibility.specificCustomers
                        }
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="specificCustomers"
                      >
                        <span className="font-size-6 fw-bold">
                          Specific customers{" "}
                        </span>
                      </Label>
                    </div>
                  </div>
                  <br />
                  {summary.customerEligibility.specificCustomerSegments ==
                  true ? (
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
                      <span className="font-size-16 mt-1">
                        Select customer segments that can use this discount.
                      </span>

                      {selectedSpecificCustomerSegments?.map((item, index) => (
                        <div key={index} className="mt-2">
                          <Card>
                            <Row>
                              <Col md={11}>
                                <CardBody>
                                  <CardTitle className="h5">
                                    {specificCustomerSegmentsList[item]}
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
                                    let updatedList = [
                                      ...selectedSpecificCustomerSegments,
                                    ]
                                    setSelectedSpecificCustomerSegments(
                                      updatedList.filter(
                                        ele => data[ele].id !== data[item].id
                                      )
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

                      {summarys.specificCustomersValue?.map((item, index) => (
                        <div key={index} className="mt-2">
                          <Card>
                            <Row>
                              <Col md={11}>
                                <CardBody>
                                  <CardTitle className="h5">
                                    {coustemerNamesList[item]}
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
                                    let updatedList = [
                                      ...selectedCoustemerNames,
                                    ]
                                    setSelectedCoustemerNames(
                                      updatedList.filter(
                                        ele => data[ele].id !== data[item].id
                                      )
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
                  ) : (
                    ""
                  )}
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <span className="fs-5 fw-bold">Maximum discount uses</span>
                  <br />
                  <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="limitUsed"
                      value="checked"
                      defaultChecked={summary.limitNumberOfTimes}
                      onChange={e =>
                        setSummary({
                          ...summary,
                          limitNumberOfTimes: e.target.checked,
                        })
                      }
                    />
                    <Label className="form-check-label" htmlFor="limitUsed">
                      Limit number of times this discount can be used in total{" "}
                    </Label>
                    {summary.limitNumberOfTimes == true ? (
                      <>
                        <Input
                          name="collections"
                          placeholder="Collections"
                          type="text"
                          value={summary.limitNumberOfTimesValue}
                          className="form-control mt-1 w-25"
                          id="collections"
                          onChange={e =>
                            setSummary({
                              ...summary,
                              limitNumberOfTimesValue: e.target.value,
                            })
                          }
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={summary.limitToOneTime}
                      id="limitPerCustomer"
                      value="checked"
                      onChange={e =>
                        setSummary({
                          ...summary,
                          limitToOneTime: e.target.checked,
                        })
                      }
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="limitPerCustomer"
                    >
                      Limit to one use per customer
                    </Label>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <span className="fs-5 fw-bold">Combinations</span>
                  <br />
                  <br />
                  <span className="font-size-16">
                    {summary.code ? (
                      <span className="fs-5 fw-bold">{summary.code}</span>
                    ) : (
                      "This product discount"
                    )}{" "}
                    can be combined with:
                  </span>
                  <br />
                  <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="otherProductDiscount"
                      defaultChecked={summary.otherProductDiscounts}
                      onChange={e =>
                        setSummary({
                          ...summary,
                          otherProductDiscounts: e.target.checked,
                        })
                      }
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="otherProductDiscount"
                    >
                      Other product discounts
                    </Label>
                    <br />
                    {summary.otherProductDiscounts == true ? (
                      <>
                        <span>
                          No product discounts are currently set to combine. To
                          let customers use more than one discount, set up at
                          least one product discount that combines with product
                          discounts.
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="shippingDiscount"
                      defaultChecked={summary.shippingDiscounts}
                      onChange={e =>
                        setSummary({
                          ...summary,
                          shippingDiscounts: e.target.checked,
                        })
                      }
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="shippingDiscount"
                    >
                      Shipping discounts
                    </Label>
                    <br />
                    {summary.shippingDiscounts == true ? (
                      <span>
                        No shipping discounts are currently set to combine. To
                        let customers use more than one discount, set up at
                        least one shipping discount that combines with product
                        discounts.
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <span className="fs-5 fw-bold">Active dates</span>
                  <br />
                  <br />
                  <Row>
                    <Col>
                      <Label>Start date</Label>
                      <DatePicker
                        selected={summary.startDate}
                        onChange={date =>
                          setSummary({
                            ...summary,
                            startDate: date,
                          })
                        }
                        minDate={new Date()}
                        placeholderText="Start Date"
                        className="form-control w-75"
                      />
                    </Col>
                    <Col>
                      <Label>Start time (IST)</Label>
                      <DatePicker
                        selected={summary.startTime}
                        onChange={date =>
                          // console.log(date)
                          setSummary({
                            ...summary,
                            startTime: date,
                          })
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Start Time"
                        className="form-control w-75"
                      />
                    </Col>
                  </Row>
                  <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="closeButton"
                      value="checked"
                      onChange={e => {
                        setSummary({ ...summary, setEndDate: e.target.checked })
                      }}
                      defaultChecked={summary.setEndDate}
                    />
                    <Label className="form-check-label" htmlFor="closeButton">
                      Set end date
                    </Label>
                  </div>
                  <br />
                  {summary.setEndDate == true ? (
                    <Row>
                      <Col>
                        <Label>End date</Label>
                        <DatePicker
                          selected={summary.endDate}
                          minDate={summary.startDate}
                          onChange={date =>
                            setSummary({
                              ...summary,
                              endDate: date,
                            })
                          }
                          placeholderText="End Date"
                          className="form-control w-75"
                        />
                      </Col>
                      <Col>
                        <Label>End time (IST)</Label>
                        <DatePicker
                          selected={summary.endTime}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          onChange={date =>
                            setSummary({
                              ...summary,
                              endTime: date,
                            })
                          }
                          placeholderText="End Time"
                          className="form-control w-75"
                        />
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <Button
                    type="button"
                    className="btn pb-3 pt-3 w-25 btn-invoice"
                    onClick={() =>
                      setSummary({
                        code: "",
                        discountTitle: "",
                        percentage: "",
                        fixedAmount: "",
                        discountType: "code",
                        discountAppliesType: "collections",
                        appliesToCollections: "",
                        appliesToProduct: "",
                        appliesTime: false,
                        pointOfSale: false,
                        minimumPurchaseRequirements: {
                          noMinimumRequirements: true,
                          minimumPurchaseAmount: false,
                          minimumQuantityOfItems: false,
                        },
                        minimumPurchaseAmountValue: 0,
                        minimumQuantityOfItemsValue: 0,
                        customerEligibility: {
                          allCustomers: true,
                          specificCustomerSegments: false,
                          specificCustomers: false,
                        },
                        specificCustomerSegmentsValue: "",
                        specificCustomersValue: "",
                        limitNumberOfTimes: false,
                        limitToOneTime: false,
                        limitNumberOfTimesValue: 0,
                        otherProductDiscounts: false,
                        shippingDiscounts: false,
                        startDate: new Date(),
                        startTime: new Date().getTime(),
                        setEndDate: false,
                        endDate: new Date(),
                        endTime: new Date().getTime(),
                      })
                    }
                  >
                    <span className="font-size-14 m-auto">Reset</span>
                  </Button>

                  <Button
                    className="btn pb-3 pt-3 w-25 btn-invoice ms-4"
                    onClick={() => handleSubmitData()}
                    type="submit"
                  >
                    <span className="font-size-14 m-auto">Submit</span>
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardHeader className="bg-transparent">
                  <span className="fs-5 fw-bold">Summary</span>
                </CardHeader>
                <CardBody>
                  <span className="font-size-20 fw-bold">
                    {summary.discountType == "code"
                      ? summary.code
                        ? summary.code
                        : "No title yet."
                      : "No title yet."}
                  </span>
                  <br />
                  <br />
                  <span className="font-size-6"> Type and method</span>
                  <ul className="mt-2">
                    <li>Amount off products</li>
                    <li className="mt-2">{summary.discountType}</li>
                  </ul>
                  <span className="font-size-6"> Details</span>
                  {summary.discountType == "code" ? (
                    summary.code ? (
                      <ul className="mt-2">
                        <li>
                          For Online Store
                          {summary.pointOfSale == true
                            ? "and 1 sales channel"
                            : ""}
                        </li>

                        {amountType == "percentage" ? (
                          summary.percentage ? (
                            <li className="mt-2">
                              {summary.percentage +
                                "% Off " +
                                summary.discountAppliesType}
                            </li>
                          ) : (
                            ""
                          )
                        ) : amountType == "Fixed Amount" ? (
                          summary.fixedAmount ? (
                            <li className="mt-2">
                              {"₹" +
                                summary.fixedAmount +
                                " Off " +
                                summary.discountAppliesType}
                            </li>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                        {showFooter == true ? (
                          summary.appliesTime == true ? (
                            <li className="mt-2">Applies once per order</li>
                          ) : (
                            <li className="mt-2">
                              Applies to each eligible item per order
                            </li>
                          )
                        ) : (
                          ""
                        )}
                        <li className="mt-2">
                          {summary.minimumPurchaseRequirements
                            .noMinimumRequirements == true
                            ? "No minimum purchase requirement"
                            : summary.minimumPurchaseRequirements
                                .minimumPurchaseAmount == true
                            ? "Minimum purchase of ₹" +
                              summary.minimumPurchaseAmountValue
                            : summary.minimumPurchaseRequirements
                                .minimumQuantityOfItems == true
                            ? "Minimum purchase of " +
                              summary.minimumQuantityOfItemsValue +
                              " items"
                            : ""}
                        </li>
                        <li className="mt-2">
                          {summary.limitNumberOfTimes == true
                            ? summary.limitNumberOfTimes &&
                              summary.limitToOneTime == true
                              ? "Limit of " +
                                summary.limitNumberOfTimesValue +
                                " uses, one per customer"
                              : "Limit of " +
                                summary.limitNumberOfTimesValue +
                                " uses"
                            : summary.limitToOneTime == true
                            ? summary.limitNumberOfTimes &&
                              summary.limitToOneTime == true
                              ? "Limit of " +
                                summary.limitNumberOfTimesValue +
                                " uses, one per customer"
                              : "One per customer"
                            : "No usage limits"}
                        </li>
                        <li className="mt-2">
                          {summary.otherProductDiscounts == true
                            ? summary.otherProductDiscounts == true &&
                              summary.shippingDiscounts == true
                              ? "Combines with product and shipping discounts"
                              : "Combines with product discounts"
                            : summary.shippingDiscounts == true
                            ? summary.otherProductDiscounts == true &&
                              summary.shippingDiscounts == true
                              ? "Combines with product and shipping discounts"
                              : "shipping discounts"
                            : "Can’t combine with other discounts"}
                        </li>
                        <li className="mt-2">
                          {summary.startDate.toLocaleDateString() ==
                            new Date().toLocaleDateString() &&
                          summary.endDate.toLocaleDateString() ==
                            new Date().toLocaleDateString()
                            ? "Today Only"
                            : getDate(
                                summary.startDate.toLocaleDateString(),
                                summary.endDate.toLocaleDateString()
                              )}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal
          isOpen={open}
          toggle={() => {
            toggle()
          }}
          size="xl"
        >
          <h5 className="modal-title">Add collections</h5>
          <div className="modal-body">
            {summary.discountAppliesType == "products" ? (
              <>
                <Input
                  name="productsList"
                  placeholder="Search Product"
                  type="text"
                  value={appliesTo.appliesToProduct}
                  onChange={e => {
                    search(e)
                    setAppliesTo({
                      ...appliesTo,
                      appliesToProduct: e.target.value,
                    })
                  }}
                  className="form-control mt-1"
                  id="productsList"
                />
                <hr />
                {productsList?.map((row, index) => (
                  <div className="form-check" key={index}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      style={{ marginTop: "35px" }}
                      onChange={e => handleCheck(e, row)}
                      defaultChecked={selectedProducts?.includes(row)}
                    />
                    {/* {console.log("selectedProducts", selectedProducts)} */}
                    <Label className="form-check-label" htmlFor={index}>
                      <Row className="g-0 align-item-center">
                        <Col md={2}>
                          <CardImg
                            className="img-fluid"
                            src={row?.productImage}
                            alt="Card image cap"
                            style={{ maxWidth: "50%" }}
                          />
                        </Col>
                        <Col md={10}>
                          <CardBody>
                            <CardTitle className="h5">
                              {row?.productName}
                            </CardTitle>
                            <CardText>
                              This is a wideeer card with supporting text below
                              as a natural lead-in to additional content.
                            </CardText>
                            <CardText>
                              <small className="text-muted">
                                Last updated 3 mins ago
                              </small>
                            </CardText>
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
                  }}
                />
                <hr />
                {listOfProductCollection?.map((row, index) => (
                  <div className="form-check" key={index}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      style={{ marginTop: "35px" }}
                      id={index}
                      value="checked"
                      onChange={e => handleCheckCollection(e, index)}
                      defaultChecked={selectedProductsCollection?.includes(row)}
                    />
                    <Label className="form-check-label" htmlFor={index}>
                      <Row>
                        <Col md={10}>
                          <CardBody>
                            <CardTitle className="h5">
                              {row?.collectionName}
                            </CardTitle>
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
                setOpen(false)
                setProductsList(data)
                setSelectedProductsCollection([])
                setSelectedProducts([])
                setAppliesTo({
                  ...appliesTo,
                  appliesToCollections: "",
                  appliesToProduct: "",
                })
              }}
            >
              <span className="font-size-14 m-auto">Cancle</span>
            </Button>
            <Button
              className={`btn pb-3 pt-3 btn-invoice ms-4 ${
                selectedProductsCollection.length > 0 ||
                selectedProducts.length > 0
                  ? ""
                  : "disabled"
              }`}
              onClick={() => {
                setOpen(false)
                setProductsList(data)
                if (summary.discountAppliesType == "collections") {
                  // setSelectedCollectionList(selectedProductsCollection)
                  setSummary({
                    ...summary,
                    collection: selectedProductsCollection,
                  })
                  setSelectedProductsCollection([])
                }
                if (summary.discountAppliesType == "products") {
                  setSummary({
                    ...summary,
                    productList: selectedProducts,
                  })
                  setSelectedProducts([])
                }
              }}
              type="button"
            >
              <span className="font-size-14 m-auto">Add</span>
            </Button>
          </div>
        </Modal>

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
                      onChange={e => handleCheckCoustomer(e, index)}
                      defaultChecked={selectedCoustemerNames?.includes(row)}
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
                      onChange={e => handleCheckCoustomerSegments(e, index)}
                      defaultChecked={selectedSpecificCustomerSegments?.includes(
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
                selectCoustemerNames.length > 0 ||
                selectSpecificCustomerSegments.length > 0
                  ? ""
                  : "disabled"
              }`}
              onClick={() => {
                setOpenCustomer(false)
                if (summary.customerEligibility.specificCustomers == true) {
                  setSummary({
                    ...summary,
                    specificCustomersValue: selectCoustemerNames,
                  })

                  setSelectCoustemerNames([])
                }
                if (
                  summary.customerEligibility.specificCustomerSegments == true
                ) {
                  setSummary({
                    ...summary,
                    specificCustomerSegmentsValue:
                      selectSpecificCustomerSegments,
                  })
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
discountPage.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default discountPage
