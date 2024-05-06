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

//Holiday Modal
import HolidayModel from "../../Dashboard/Holiday/HolidayModel"

//Attendance Modal
import {
  AttendanceModal,
  AttendanceChackInModal,
  AttendanceChackOutModal,
} from "../../Dashboard/Attendance/AttendanceModel"

//DeleteModal
import DeleteModal from "../../../components/Common/DeleteModal"

//Branch Modal
import BranchModal from "../../Dashboard/Branches/BranchModel"

// Department
import DepartmentModal from "../../Dashboard/Department/DepartmentModel"

/************************** Branch Actions ******************************************/

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
//Branch Name
const BranchName = cell => {
  return (
    <div className="d-flex align-items-center country">
      {cell.row.original.address}
    </div>
  )
}
 
/************************** Department Actions ******************************************/

//Department Modals
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

/************************** Employee Actions ******************************************/
const EmployeeName = cell => {
  return (
    <Link
      to={`/employee-management/${cell.row.original.id}`}
      className="text-body fw-bold"
    >
      <h5>{cell.row.original.employeName}</h5>
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
              : "danger" && cell.value === "Deactive"
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

/**************************All Holiday Actions******************************************/
const Actions = cell => {
  const [openModal, setOpenEditModal] = useState(false)
  const [openAttendanceEdit, setOpenAttendanceEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  //Edit
  const handleEditEmployee = () => {
    console.log(cell.row.original)
    setOpenEditModal(true)
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
          <button className="btn btn-transparent" onClick={handleEditEmployee}>
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
      <HolidayModel
        id={cell.row.original.id}
        show={openModal}
        onCloseClick={() => setOpenEditModal(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEmployee}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}


/**************************All Attendance Actions******************************************/

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
    console.log(cell.row.original.id)
    setDeleteModal(false)
  }

  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row>
        <Col>
          <button
            className="btn btn-transparent"
            onClick={handleEditEmployeeAttendance}
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
      <AttendanceModal
        id={cell.row.original.id}
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
        onClick={handleAttendanceEdit}
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
  return (
    <div className="d-flex">
      <div className="status_block">
        <button>
          <Badge
            className={
              "badge badge-pill bg-pill font-size-12 bg-soft-" +
              (cell.value === "Approved"
                ? "success"
                : ("danger" && cell.value === "pending") || "Rejected"
                ? "danger"
                : "")
            }
          >
            {cell.value}
          </Badge>
        </button>{" "}
      </div>
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
}
