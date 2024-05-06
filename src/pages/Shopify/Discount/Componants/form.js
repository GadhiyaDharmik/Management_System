import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { Card, CardBody, Button } from "reactstrap"

import CustomerModal from "./Modals/Customer"

import ProductAndCollectionModal from "./Modals/productAndCollaction"

//Form Parts
import DiscountCode from "./DiscountFormParts/discountCode"
import DiscountValue from "./DiscountFormParts/discountValue"
import DiscountSalesChannels from "./DiscountFormParts/discountSalesChannels"
import MinimumPurchaseRequirements from "./DiscountFormParts/minimumPurchaseRequirements"
import CustomerEligibility from "./DiscountFormParts/customerEligibility"
import MaximumDiscountUses from "./DiscountFormParts/maximumDiscountUses"
import Combinations from "./DiscountFormParts/combinations"
import ActiveDates from "./DiscountFormParts/activeDates"

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

const dataOfCollection = [{ id: 1, collectionName: "Phone", productList: data }]

function discountForm({
  summary,
  setSummary,
  setAmountType,
  handleAmountChange,
  handleSubmitData,
  id,
}) {
  const [listOfProductCollection, setListOfProductCollection] =
    useState(dataOfCollection)

  const [open, setOpen] = useState(false)
  const [openCustomer, setOpenCustomer] = useState(false)

  const [coustemerNames, setCoustemerNames] = useState(coustemerNamesList)
  const [specificCustomerSegments, setSpecificCustomerSegments] = useState(
    specificCustomerSegmentsList
  )

  const [appliesTo, setAppliesTo] = useState({
    appliesToCollections: "",
    appliesToProduct: "",
  })

  //On Select Product / Product Collection
  const [selectedProducts, setSelectedProducts] = useState(
    id ? summary.productList : []
  )
  const [selectedProductsCollection, setSelectedProductsCollection] = useState(
    id ? summary.collection : []
  )

  const [selectedCoustemerNames, setSelectedCoustemerNames] = useState(
    id ? summary.specificCustomersValue.map((ele, index) => ele) : []
  )
  const [
    selectedSpecificCustomerSegments,
    setSelectedSpecificCustomerSegments,
  ] = useState(
    id ? summary.specificCustomerSegmentsValue.map((ele, index) => ele) : []
  )

  function toggle() {
    setOpen(!open)
    // removeBodyCss()
  }

  function addProduct(list) {
    setSummary({
      ...summary,
      productList: list,
    })
  }
  function addCollection(list) {
    setSummary({
      ...summary,
      collection: list,
    })
  }

  function addSpecificCustomerName(list) {
    setSummary({
      ...summary,
      specificCustomersValue: list,
      specificCustomersListValue: list,
    })
  }
  function addSpecificCustomerSegments(list) {
    setSummary({
      ...summary,
      specificCustomerSegmentsValue: list,
      specificCustomerSegmentsListValue: list,
    })
  }
  return (
    <React.Fragment>
      <div>
        <DiscountCode summary={summary} setSummary={setSummary} />
        <DiscountValue
          summary={summary}
          setSummary={setSummary}
          data={data}
          appliesTo={appliesTo}
          dataOfCollection={dataOfCollection}
          handleAmountChange={handleAmountChange}
          setAmountType={setAmountType}
          setSelectedProductsCollection={setSelectedProductsCollection}
          setAppliesTo={setAppliesTo}
          setOpen={setOpen}
          setListOfProductCollection={setListOfProductCollection}
        />
        <DiscountSalesChannels summary={summary} setSummary={setSummary} />
        <MinimumPurchaseRequirements
          summary={summary}
          setSummary={setSummary}
        />
        <CustomerEligibility
          summary={summary}
          setSummary={setSummary}
          coustemerNames={coustemerNames}
          specificCustomerSegments={specificCustomerSegments}
          setCoustemerNames={setCoustemerNames}
          setSpecificCustomerSegments={setSpecificCustomerSegments}
          selectedCoustemerNames={selectedCoustemerNames}
          setSelectedCoustemerNames={setSelectedCoustemerNames}
          selectedSpecificCustomerSegments={selectedSpecificCustomerSegments}
          setSelectedSpecificCustomerSegments={
            setSelectedSpecificCustomerSegments
          }
          addSpecificCustomerName={addSpecificCustomerName}
          addSpecificCustomerSegments={addSpecificCustomerSegments}
          openCustomer={openCustomer}
          setOpenCustomer={setOpenCustomer}
          coustemerNamesList={coustemerNamesList}
        />
        <MaximumDiscountUses summary={summary} setSummary={setSummary} />
        <Combinations summary={summary} setSummary={setSummary} />
        <ActiveDates summary={summary} setSummary={setSummary} />
        <Card>
          <CardBody className="text-center">
            <Button
              type="button"
              className="btn pb-3 pt-3 w-25 btn-invoice"
              onClick={() => setSummary(summary)}
            >
              <span className="font-size-14 m-auto">Reset</span>
            </Button>

            <Button
              className="btn pb-3 pt-3 w-25 btn-invoice ms-4"
              onClick={() => handleSubmitData()}
              type="submit"
            >
              <span className="font-size-14 m-auto">
                {id ? "Update" : "Submit"}
              </span>
            </Button>
          </CardBody>
        </Card>
        <ProductAndCollectionModal
          open={open}
          setOpen={setOpen}
          toggle={toggle}
          appliesTo={appliesTo}
          setAppliesTo={setAppliesTo}
          summary={summary}
          setSummary={setSummary}
          productListData={data}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          selectedProductsCollection={selectedProductsCollection}
          setSelectedProductsCollection={setSelectedProductsCollection}
          listOfProductCollection={listOfProductCollection}
          setListOfProductCollection={setListOfProductCollection}
          dataOfCollection={dataOfCollection}
          addProduct={addProduct}
          addCollection={addCollection}
        />
        <CustomerModal
          summary={summary}
          setSummary={setSummary}
          openCustomer={openCustomer}
          setOpenCustomer={setOpenCustomer}
          coustemerNamesList={coustemerNamesList}
          specificCustomerSegmentsList={specificCustomerSegmentsList}
          coustemerNames={coustemerNames}
          setCoustemerNames={setCoustemerNames}
          specificCustomerSegments={specificCustomerSegments}
          setSpecificCustomerSegments={setSpecificCustomerSegments}
          selectedCoustemerNames={selectedCoustemerNames}
          setSelectedCoustemerNames={setSelectedCoustemerNames}
          selectedSpecificCustomerSegments={selectedSpecificCustomerSegments}
          setSelectedSpecificCustomerSegments={
            setSelectedSpecificCustomerSegments
          }
          addSpecificCustomerName={addSpecificCustomerName}
          addSpecificCustomerSegments={addSpecificCustomerSegments}
        />
      </div>
    </React.Fragment>
  )
}
discountForm.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default discountForm
