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

function DiscountCode({ summary, setSummary }) {
    function generateCode() {
        const charters =
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var code = ""
        for (var i = 12; i > 0; --i)
          code += charters[Math.floor(Math.random() * charters.length)]
        setSummary({ ...summary, code: code })
      }
  return (
    <React.Fragment>
      <div>
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
                <Label className="form-check-label" htmlFor="discountCode">
                  <span className="font-size-6 fw-bold">Discount Code</span>
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
      </div>
    </React.Fragment>
  )
}
export default DiscountCode
