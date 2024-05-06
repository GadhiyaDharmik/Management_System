import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import "bootstrap/dist/css/bootstrap.min.css"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap"

import { useNavigate, useParams } from "react-router-dom"

function discountPage() {
  const { id } = useParams()
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
  return (
    <React.Fragment>
      <div className="page-content dashboard">
        <div className="container-fluid">
          <Row>
            <Col lg="8" sm="12" xs="12">
              
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
      </div>
    </React.Fragment>
  )
}
discountPage.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default discountPage
