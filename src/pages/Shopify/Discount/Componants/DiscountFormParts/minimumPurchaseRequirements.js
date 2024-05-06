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

function minimumPurchaseRequirements({ summary, setSummary }) {
  return (
    <Card>
      <CardBody>
        <span className="fs-5 fw-bold">Minimum purchase requirements</span>
        <br />
        <br />
        <span className="font-size-16">
          Select where this discount will be visible and promoted. Online store
          is included by default.
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
            <Label className="form-check-label" htmlFor="noRequirements">
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
            <Label className="form-check-label" htmlFor="minimumPaseAmount">
              <span className="font-size-6 fw-bold">
                Minimum purchase amount (₹)
              </span>
            </Label>
          </div>
        </div>
        {summary.minimumPurchaseRequirements.minimumPurchaseAmount == true ? (
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
            <Label className="form-check-label" htmlFor="minimumQuantity">
              <span className="font-size-6 fw-bold">
                Minimum quantity of items
              </span>
            </Label>
          </div>
        </div>
        {summary.minimumPurchaseRequirements.minimumQuantityOfItems == true ? (
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
  )
}
export default minimumPurchaseRequirements
