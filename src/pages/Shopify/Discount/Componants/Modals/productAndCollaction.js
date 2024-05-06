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

function ProductAndCollectionModal({ ...data }) {
  const [productsList, setProductsList] = useState(data.productListData)

  function search(event) {
    let value = event.target.value
    let productData = [...data.productListData]
    if (value != "") {
      setProductsList(
        productData.filter(ele =>
          ele.productName.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setProductsList([...data.productListData].filter(ele => ele))
    }
  }
  function searchCollection(event) {
    let value = event.target.value
    if (value != "") {
      data.setListOfProductCollection(
        [...data.dataOfCollection].filter(ele =>
          ele.collectionName.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      data.setListOfProductCollection(
        [...data.dataOfCollection].filter(ele => ele)
      )
    }
  }
  const  handleCheck = (event, row) => {
    var updatedList = [...data.selectedProducts]
    if (event.target.checked == true) {
      updatedList = [...updatedList, row]
    } else {
      updatedList.splice(data.selectedProducts.indexOf(row), 1)
    }
    data.setSelectedProducts(updatedList)
  }
  const handleCheckCollection = (event, row) => {
    var updatedList = [...data.selectedProductsCollection]
    if (event.target.checked) {
      updatedList = [...data.selectedProductsCollection, row]
    } else {
      updatedList.splice(data.selectedProductsCollection.indexOf(row), 1)
    }
    data.setSelectedProductsCollection(updatedList)
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={data.open}
        toggle={() => {
          data.toggle()
        }}
        size="xl"
      >
        <h5 className="modal-title">Add collections</h5>
        <div className="modal-body">
          {data.summary.discountAppliesType == "products" ? (
            <>
              <Input
                name="productsList"
                placeholder="Search Product"
                type="text"
                value={data.appliesTo.appliesToProduct}
                onChange={e => {
                  search(e)
                  data.setAppliesTo({
                    ...data.appliesTo,
                    appliesToProduct: e.target.value,
                  })
                }}
                className="form-control mt-1"
                id="productsList"
              />
              <hr />
              {productsList?.map((row, index) => (
                <div className="form-check" key={row.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ marginTop: "35px" }}
                    onChange={e => handleCheck(e, row)}
                    defaultChecked={data.selectedProducts?.includes(row)}
                  />
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
                            This is a wideeer card with supporting text below as
                            a natural lead-in to additional content.
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
                value={data.appliesTo.appliesToCollections}
                className="form-control mt-1"
                id="collections"
                onChange={e => {
                  searchCollection(e)
                  data.setAppliesTo({
                    ...data.appliesTo,
                    appliesToCollections: e.target.value,
                  })
                }}
              />
              <hr />
              {data.listOfProductCollection?.map((row, index) => (
                <div className="form-check" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ marginTop: "35px" }}
                    id={index}
                    value="checked"
                    onChange={e => handleCheckCollection(e, row)}
                    defaultChecked={data.selectedProductsCollection?.includes(
                      row
                    )}
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
              data.setOpen(false)
              setProductsList(data.productListData)
              data.setSelectedProductsCollection([])
              data.setSelectedProducts([])
              data.setAppliesTo({
                ...data.appliesTo,
                appliesToCollections: "",
                appliesToProduct: "",
              })
            }}
          >
            <span className="font-size-14 m-auto">Cancle</span>
          </Button>
          <Button
            className={`btn pb-3 pt-3 btn-invoice ms-4 ${
              data.selectedProductsCollection.length > 0 ||
              data.selectedProducts.length > 0
                ? ""
                : "disabled"
            }`}
            onClick={() => {
              data.setOpen(false)
              if (data.summary.discountAppliesType == "collections") {
                data.addCollection(data.selectedProductsCollection)

                data.setSelectedProductsCollection([])
              }
              if (data.summary.discountAppliesType == "products") {
                // data.setSummary({
                //   ...data.summary,
                //   productList: data.selectedProducts,
                // })
                data.addProduct(data.selectedProducts)
                data.setSelectedProducts([])
              }
              setProductsList(data.productListData)
            }}
            type="button"
          >
            <span className="font-size-14 m-auto">Add</span>
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default ProductAndCollectionModal
