import React from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  FormGroup,
} from "reactstrap"

function DiscountSalesChannels({ summary, setSummary }) {
  function generateCode() {
    const charters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var code = ""
    for (var i = 12; i > 0; --i)
      code += charters[Math.floor(Math.random() * charters.length)]
    setSummary({ ...summary, code: code })
  }
  return (
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
          Select where this discount will be visible and promoted. Online store
          is included by default.
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
            defaultChecked={summary.pointOfSale}
          />
          <Label className="form-check-label" htmlFor="pointOfSale">
            <span className="font-size-6 fw-bold">Point of Sale</span>
          </Label>
        </div>
      </CardBody>
    </Card>
  )
}
export default DiscountSalesChannels
