import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Badge, Row, Col, Button } from "reactstrap"
import Status from "../../../components/CommonForBoth/TopbarDropdown/Status"

import pdf from "../../../assets/images/pdf.svg"
import calender from "../../../assets/images/calender.svg"
import time from "../../../assets/images/time-note.svg"
import eye from "../../../assets/images/eye.svg"

import del from "../../../assets/images/table-delete.svg"
import edit from "../../../assets/images/table-edit.svg"
import ToogleSwitch from "../../../components/Common/ToogleSwitch"
// const formateDate = (date, format) => {
//     const dateFormat = format ? format : "DD MMM Y";
//     const date1 = moment(new Date(date)).format(dateFormat);
//     return date1;
// };
// const toLowerCase1 = str => {
//     return (
//       str === "" || str === undefined ? "" : str.toLowerCase()
//     );
//   };

//Holiday Modal
import HolidayModel from "./HolidayModel"

//Attendance Modal
import {
  AttendanceModal,
  AttendanceChackInModal,
  AttendanceChackOutModal,
  ChangeAttendanceStatus,
} from "../Attendance/AttendanceModel"

//date Icon
import date from "../../../assets/images/calender.svg"

//Leave Modals
import {
  LeaveModal,
  LeaveFromModal,
  LeaveReasonModal,
  ChangeRequestStatus,
} from "../LeaveRequests/LeaveRequestsModal"
import leave from "../../../assets/images/eye-key-look-password-security-see-svgrepo-com.svg"

//DeleteModal
import DeleteModal from "../../../components/Common/DeleteModal"

//Branch Modal
import BranchModal from "../Branches/BranchModel"

// Department
import DepartmentModal from "../Department/DepartmentModel"

//Branch Address
const Address = cell => {
  return (
    <div className="d-flex align-items-center country">
      {cell.row.original.address}
    </div>
  )
}

//Branch Modal
const BranchActions = cell => {
  const [openBranchEdit, setOpenBranchEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeBranch = () => {
    console.log(cell.row.original)
    setOpenBranchEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <button
            className="btn btn-transparent"
            onClick={handleEditEmployeeBranch}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col>
          <button
            className="btn btn-transparent"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>
      <BranchModal
        show={openBranchEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenBranchEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}
//Branch Address
const BranchName = cell => {
  return (
    <div className="d-flex align-items-center country">
      {cell.row.original.address}
    </div>
  )
}

//Branch Modal
const DepartmentActions = cell => {
  const [openBranchEdit, setOpenBranchEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeBranch = () => {
    console.log(cell.row.original)
    setOpenBranchEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <button
            className="btn btn-transparent"
            onClick={handleEditEmployeeBranch}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col>
          <button
            className="btn btn-transparent"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>
      <DepartmentModal
        show={openBranchEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenBranchEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

//Employee
const EmployeeName = cell => {
  return (
    <Link
      to={`/employee-management/${cell.row.original.id}`}
      className="text-body fw-bold"
    >
      <h5 className="fw-bold text-capitalize">
        {cell.row.original.employeName}
      </h5>
      <p className="sub-text fs-5">{cell.row.original.email}</p>
    </Link>
  )
}
const CustomerId = cell => {
  return (
    <Link
      to={`/employee-management/${cell.row.original.id}`}
      className="text-body fw-bold"
    >
      <h5>{cell.row.original.name}</h5>
      <p className="sub-text">{cell.row.original.Email}</p>
    </Link>
  )
}

const Location = cell => {
  return (
    <div className="d-flex align-items-center country">
      <img src={cell.row.original.image2} />
      {cell.row.original.location}
    </div>
  )
}

const NotifiationDate = cell => {
  return (
    <div className="d-flex align-items-center notification_date text-blue font-normal">
      <img src={calender} />
      {cell.row.original.date}
    </div>
  )
}

const Time = cell => {
  return (
    <div className="d-flex align-items-center notification_date text-blue font-normal">
      <img src={time} alt="" />
      {cell.row.original.time}
    </div>
  )
}

const Total = cell => {
  return (
    <div className="d-flex align-items-center country">
      {"$" + cell.row.original.total}
    </div>
  )
}

const Number = cell => {
  return (
    <div className="d-flex align-items-center country">
      {"#" + cell.row.original.invoiceno}
    </div>
  )
}

const CustomerName = cell => {
  return cell.value ? cell.value : ""
}

const Date = cell => {
  return cell.value ? cell.value : ""
}
const TotalHours = cell => {}

const Email = cell => {
  return cell.value ? cell.value : ""
}

const CustomerStatus = cell => {
  return (
    <div className="d-flex">
      <div className="status_block btn">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.value === "Active"
              ? "success"
              : "danger" && cell.value === "Inactive"
              ? "danger"
              : "")
          }
        >
          {cell.value}
        </Badge>
      </div>
      <div className="status_ab">
        <Status />
      </div>
    </div>
  )
}

const InvoiceStatus = cell => {
  return (
    <div className="d-flex">
      <div className="status_block">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.value === "Paid"
              ? "success"
              : "danger" && cell.value === "Unpaid"
              ? "danger"
              : "")
          }
        >
          {cell.value}
        </Badge>{" "}
      </div>
    </div>
  )
}

const PDF = cell => {
  return (
    <>
      <a className="download" href={cell.row.original.pdf}>
        <img src={pdf} alt="" /> PDF
      </a>
    </>
  )
}

const Message = cell => {
  return (
    <div className="d-flex align-items-center notification_message text-color-v1">
      {cell.row.original.messagesubject}
      <img src={eye} alt="" />
    </div>
  )
}

const NullRouted = cell => {
  return (
    <div className="status_block server_block d-flex">
      <div
        className={
          "badge badge-pill bg-pill font-small  bg-soft-" +
          (cell.value === "Unblock"
            ? "success"
            : "danger" && cell.value === "Block"
            ? "danger"
            : "")
        }
      >
        {cell.value}
      </div>
      <ToogleSwitch className="table-switch" />
      <p className="text-color-v1 font-small text-null">Null</p>
    </div>
  )
}

//All Actions
const AttendanceActions = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeAttendance = () => {
    console.log(cell.row.original)
    setOpenAttendanceEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.employee_Id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col lg={12}>
          <button
            className="btn btn-transparent"
            onClick={handleEditEmployeeAttendance}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col lg={12}>
          <button
            className="btn btn-transparent mt-2"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>

      <AttendanceModal
        id={cell.row.original.employee_Id}
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

//Holiday Actions
const Actions = cell => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
   //Edit
   const handleEditHoliday = () => {
    console.log(cell.row.original)
    setOpenEditModal(true)
  }
  //Delete Model
  const handleDeleteHoliday = () => {
    console.log(cell.row.original.holidayId)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col lg={12}>
          <button
            className="btn btn-transparent"
            onClick={handleEditHoliday}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col lg={12}>
          <button
            className="btn btn-transparent mt-2"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>
      <HolidayModel
        id={cell.row.original.holidayId}
        show={openEditModal}
        onCloseClick={() => setOpenEditModal(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteHoliday}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

const ActionCheckIn = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)

  //Edit
  const handleEditEmployee = () => {
    console.log(cell.row.original)
    setOpenEditModal(true)
  }
  //Delete Model
  const handleAttendanceEdit = () => {
    console.log(cell.row.original.id)
    setOpenAttendanceEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleEditEmployee}
      >
        {cell.row.original.checkIn}
      </Badge>
      <AttendanceChackInModal
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
    </div>
  )
}
const ActionCheckOut = cell => {
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  //CheckIn Model
  const handleAttendanceEdit = () => {
    console.log(cell.row.original.id)
    setOpenAttendanceEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleAttendanceEdit}
      >
        {cell.row.original.checkOut}
      </Badge>
      <AttendanceChackOutModal
        show={openAttendanceEdit}
        onCloseClick={() => setOpenAttendanceEdit(false)}
      />
    </div>
  )
}
const AttendanceStatus = cell => {
  const [openStatusModal, setOpenStatusModal] = React.useState(false)
  const handleAttendanceStatus = () => {
    setOpenStatusModal(true)
  }
  return (
    <div className="d-flex">
      <div className="status_block">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.row.original.EmployeeStatus === "Approved"
              ? "success"
              : ("danger" && cell.row.original.EmployeeStatus === "pending") ||
                "Rejected"
              ? "danger"
              : "")
          }
          style={{ cursor: "pointer" }}
          onClick={() => handleAttendanceStatus()}
        >
          {cell.row.original.EmployeeStatus}
        </Badge>
      </div>
      <ChangeAttendanceStatus
        show={openStatusModal}
        onCloseClick={() => setOpenStatusModal(false)}
      />
    </div>
  )
}

//Leave
const ActionLeaveFrom = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)

  //Edit
  const handleEditEmployee = () => {
    console.log(cell.row.original.leaveFrom)
    setOpenEditModal(true)
  }
  //Delete Model
  const handleLeaveRequestsEdit = () => {
    console.log(cell.row.original.id)
    setOpenLeaveRequestsEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleLeaveRequestsEdit}
      >
        {cell.row.original.leaveFrom}
      </Badge>
      <LeaveFromModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
    </div>
  )
}
const ActionLeaveTo = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)
  //Edit Modal
  const handleLeaveRequestsEdit = () => {
    console.log(cell.row.original.id)
    setOpenLeaveRequestsEdit(true)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Badge
        className="badge badge-pill bg-pill font-size-12 bg-soft-success"
        style={{ cursor: "pointer" }}
        onClick={handleLeaveRequestsEdit}
      >
        {cell.row.original.leaveTo}
      </Badge>
      <LeaveFromModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
    </div>
  )
}
const LeaveRequestsStatus = cell => {
  const [openLeaveRequestsStatusEdit, setOpenLeaveRequestsStatusEdit] =
    useState(false)

  //Edit
  const handleEditEmployeeLeaveRequestsStatus = () => {
    console.log(cell.row.original)
    setOpenLeaveRequestsStatusEdit(true)
  }
  return (
    <div className="d-flex">
      <div className="status_block">
        <Badge
          className={
            "badge badge-pill bg-pill font-size-12 bg-soft-" +
            (cell.value === "Approved"
              ? "success"
              : ("danger" && cell.value === "Pending") || "Reject"
              ? "danger"
              : "")
          }
          style={{ cursor: "pointer" }}
          onClick={handleEditEmployeeLeaveRequestsStatus}
        >
          {cell.value}
        </Badge>{" "}
      </div>
      <ChangeRequestStatus
        show={openLeaveRequestsStatusEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsStatusEdit(false)}
      />
    </div>
  )
}
const LeaveReason = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)

  //Edit
  const handleEditEmployeeLeaveRequests = () => {
    console.log(cell.row.original)
    setOpenLeaveRequestsEdit(true)
  }
  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <img
            src={leave}
            alt=""
            onClick={handleEditEmployeeLeaveRequests}
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
      <LeaveReasonModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
    </div>
  )
}
const LeaveRequestsActions = cell => {
  const [openLeaveRequestsEdit, setOpenLeaveRequestsEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployeeLeaveRequests = () => {
    console.log(cell.row.original)
    setOpenLeaveRequestsEdit(true)
  }
  //Delete Model
  const handleDeleteEmployee = () => {
    console.log(cell.row.original.employee_Id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <button
            className="btn text-light"
            onClick={handleEditEmployeeLeaveRequests}
          >
            <img src={edit} alt="" />
          </button>
        </Col>
        <Col>
          <button
            className="btn text-light"
            onClick={() => setDeleteModal(true)}
          >
            <img src={del} alt="" />
          </button>
        </Col>
      </Row>
      <LeaveModal
        show={openLeaveRequestsEdit}
        id={cell.row.original.employee_Id}
        onCloseClick={() => setOpenLeaveRequestsEdit(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

export {
  EmployeeName,
  CustomerId,
  CustomerName,
  Date,
  Email,
  CustomerStatus,
  Location,
  Total,
  Number,
  InvoiceStatus,
  PDF,
  NotifiationDate,
  Time,
  Message,
  NullRouted,
  Actions,
  AttendanceActions,
  AttendanceStatus,
  ActionCheckIn,
  ActionCheckOut,
  TotalHours,
  Address,
  BranchActions,
  DepartmentActions,
  BranchName,
  ActionLeaveTo,
  ActionLeaveFrom,
  LeaveRequestsStatus,
  LeaveReason,
  LeaveRequestsActions,
}
