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

function Combinations({ summary, setSummary }) {
  return (
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
          <Label className="form-check-label" htmlFor="otherProductDiscount">
            Other product discounts
          </Label>
          <br />
          {summary.otherProductDiscounts == true ? (
            <>
              <span>
                No product discounts are currently set to combine. To let
                customers use more than one discount, set up at least one
                product discount that combines with product discounts.
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
          <Label className="form-check-label" htmlFor="shippingDiscount">
            Shipping discounts
          </Label>
          <br />
          {summary.shippingDiscounts == true ? (
            <span>
              No shipping discounts are currently set to combine. To let
              customers use more than one discount, set up at least one shipping
              discount that combines with product discounts.
            </span>
          ) : (
            ""
          )}
        </div>
      </CardBody>
    </Card>
  )
}
export default Combinations
