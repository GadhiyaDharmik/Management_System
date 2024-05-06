import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"
import { ServerIcon1 } from "./CommonSvg"
import { ServerIcon3 } from "./CommonSvg"
import { ServerIcon4 } from "./CommonSvg"
import { ServerIcon2 } from "./CommonSvg"
import { CombineDotVerticle } from "./CommonSvg"
import { Invoice, Ticket, Balance } from "./CommonSvg"
import vector from "../../assets/images/Vector.svg"
import Approved from "../../assets/Web/approvedIcon.png"
import Rejected from "../../assets/Web/cross-circle-svgrepo-com.svg"
import Panding from "../../assets/Web/pending-icon.svg"
import ip from "../../assets/images/base.png"

export function WidAppServer({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <ServerIcon2 />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="6">
                <p>Email</p>
              </Col>
              <Col md="2 d-flex align-items-center">
                <Link to="/reinstall-wizard-1">
                  <img src={vector} alt="" />
                </Link>
              </Col>
            </Row>
          </div>
          <div className="block-content">
            <h6>
              {data ? data.map(ele => ele.email) : "rsx3462.Evenscript.com"}{" "}
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}

export function WidServer({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <ServerIcon2 />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Servers</p>
              </Col>
            </Row>
          </div>
          <h6>22</h6>
        </div>
      </div>
    </>
  )
}

export function WidStatusInfo({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <ServerIcon4 />
        </div>
        <div className="info_content">
          <p>Status</p>
          <h6>{data.map(ele => ele.Status)}</h6>
        </div>
      </div>
    </>
  )
}

export function WidLocation({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <ServerIcon3 />
        </div>
        <div className="info_content">
          <p>Location</p>
          <h6>Amsterdam</h6>
        </div>
      </div>
    </>
  )
}

export function WidStatus(props) {
  return (
    <>
      <div className="server_info">
        <div className="info_block mb-4 mb-lg-0">
          <div className="icon_img">
            <ServerIcon4 />
          </div>
          <div className="info_content">
            <p>Status</p>
            <h6>Active</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export function WidInvoice(props) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <Invoice />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Invoices</p>
              </Col>
            </Row>
          </div>
          <h6>647 </h6>
        </div>
      </div>
    </>
  )
}

export function WidTicket(props) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <Ticket />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Tickets</p>
              </Col>
            </Row>
          </div>
          <h6>834 </h6>
        </div>
      </div>
    </>
  )
}

export function WidBalance(props) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <Balance />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Current Balance</p>
              </Col>
            </Row>
          </div>
          <h6>$1400 USD</h6>
        </div>
      </div>
    </>
  )
}

export function WidTotalHoliday({ data }) {
  // const pandingData = data.filter(ele=>ele.leaveStatus=="Pending")
  // console.log()
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <ServerIcon2 />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Panding Leave</p>
              </Col>
            </Row>
          </div>
          <h6>{data.length}</h6>
        </div>
      </div>
    </>
  )
}

//Attendance
export function WidTotalAttandance({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <ServerIcon2 />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Total Attendance</p>
              </Col>
            </Row>
          </div>
          <h6>{data.length}</h6>
        </div>
      </div>
    </>
  )
}
export function WidAttandancePanding({ data }) {
  const pandingData = data.filter(ele => ele.EmployeeStatus == "Pending")
  // console.log()
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <img src={Panding} width="45px" height="45px" />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Panding Attendance</p>
              </Col>
            </Row>
          </div>
          <h6>{pandingData.length}</h6>
        </div>
      </div>
    </>
  )
}

export function WidAttandanceAprroved({ data }) {
  const ApprovedData = data.filter(ele => ele.EmployeeStatus == "Approved")
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <img src={Approved} width="46px" height="46px" />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Approved Attendance</p>
              </Col>
            </Row>
          </div>
          <h6>{ApprovedData.length}</h6>
        </div>
      </div>
    </>
  )
}

export function WidAttandanceRejected({ data }) {
  const rejectData = data.filter(ele => ele.EmployeeStatus == "Rejected")
  // console.log()
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <img src={Rejected} alt="logo" width="46px" height="46px" />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Rejected Attendance</p>
              </Col>
            </Row>
          </div>
          <h6>{rejectData.length}</h6>
        </div>
      </div>
    </>
  )
}

export function WidTotalLeave({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <ServerIcon2 />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Total Leave</p>
              </Col>
            </Row>
          </div>
          <h6>{data.length}</h6>
        </div>
      </div>
    </>
  )
}
export function WidPanding({ data }) {
  const pandingData = data.filter(ele => ele.leaveStatus == "Pending")
  // console.log()
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <img src={Panding} width="45px" height="45px" />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Panding Leave</p>
              </Col>
            </Row>
          </div>
          <h6>{pandingData.length}</h6>
        </div>
      </div>
    </>
  )
}

//Holiday List
export function WidUpComingHoliday({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img"></div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Upcoming Holiday</p>
              </Col>
            </Row>
          </div>
          <h6>{data}</h6>
        </div>
      </div>
    </>
  )
}

export function WidAprrovedLeave({ data }) {
  const ApprovedData = data.filter(ele => ele.leaveStatus == "Approved")
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <img src={Approved} width="46px" height="46px" />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Approved Leave</p>
              </Col>
            </Row>
          </div>
          <h6>{ApprovedData.length}</h6>
        </div>
      </div>
    </>
  )
}

export function WidRejected({ data }) {
  const rejectData = data.filter(ele => ele.leaveStatus == "Reject")
  // console.log()
  return (
    <>
      <div className="info_block mb-4 mb-lg-0" style={{ cursor: "pointer" }}>
        <div className="icon_img">
          <img src={Rejected} alt="logo" width="46px" height="46px" />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Rejected Leave</p>
              </Col>
            </Row>
          </div>
          <h6>{rejectData.length}</h6>
        </div>
      </div>
    </>
  )
}

//EMPLOYEE LIST
export function TotleEmployee({ data }) {
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <ServerIcon2 />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Total Employees</p>
              </Col>
            </Row>
          </div>
          <h6>{data}</h6>
        </div>
      </div>
    </>
  )
}
export function ActiveEmployee({ data }) {
  const Active = data.filter(ele => ele.Status == "Active")
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <ServerIcon4 />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Active Employees</p>
              </Col>
            </Row>
          </div>
          <h6>{Active.length}</h6>
        </div>
      </div>
    </>
  )
}
export function InactiveEmployee({ data }) {
  const Inactive = data?.filter(ele => ele.Status == "Inactive")
  return (
    <>
      <div className="info_block mb-4 mb-lg-0">
        <div className="icon_img">
          <Ticket />
        </div>
        <div className="info_content">
          <div className="info_flex">
            <Row className="align-items-center">
              <Col md="12">
                <p>Inactive Employees</p>
              </Col>
            </Row>
          </div>
          <h6>{Inactive?.length}</h6>
        </div>
      </div>
    </>
  )
}
