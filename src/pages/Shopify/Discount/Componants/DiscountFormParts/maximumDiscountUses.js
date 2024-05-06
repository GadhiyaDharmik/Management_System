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

function maximumDiscountUses({ summary, setSummary }) {
  return (
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
          <Label className="form-check-label" htmlFor="limitPerCustomer">
            Limit to one use per customer
          </Label>
        </div>
      </CardBody>
    </Card>
  )
}
export default maximumDiscountUses
