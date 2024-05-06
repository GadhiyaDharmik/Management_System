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
// Date Picker
import DatePicker from "react-datepicker"
import "bootstrap/dist/css/bootstrap.min.css"

function activeDates({ summary, setSummary }) {
  return (
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
  )
}
export default activeDates
