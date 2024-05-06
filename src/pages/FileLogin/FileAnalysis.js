import PropTypes from "prop-types"
import React from "react"
import {
  Col,
  Modal,
  ModalBody,
  Table,
  Input,
  Label,
  FormGroup,
  Form,
  FormFeedback,
  ModalHeader,
} from "reactstrap"

// Date Range Picker
import DateRangePicker from "react-bootstrap-daterangepicker"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-daterangepicker/daterangepicker.css"

import { Formik, useFormik } from "formik"
import * as Yup from "yup"

const names = [
  "River Larue",
  "Kenya Woodworth",
  "Thomas Fay",
  "Britton Luu",
  "Keegan Estrada",
  "Stefani Cowart",
  "Giavanna Becerra",
  "Leif Juarez",
  "Paloma Luce",
  "Erica Foss",
  "Tariq Ahrens",
  "Giovanni Baughman",
  "Jerome Hedrick",
  "Brant Cobb",
  "Jesenia Stewart",
  "Evan Petty",
  "Josiah Wade",
  "Dayna Mullen",
  "Jessika Early",
  "Daniella Stull",
  "Brionna Crespo",
  "Malik Keefe",
  "Sahil Littlejohn",
  "Ilana Quigley",
  "Britton Galvez",
  "Cindy Kiser",
  "Santiago Carmona",
  "Dakotah Persaud",
  "Orion Linton",
  "Lars Myles",
  "Cannon Aldridge",
  "Ashton Hundley",
  "Tristan Oliveira",
  "Malik Mundy",
  "Johnson Gaither",
  "Ayleen McCarty",
  "Matteo Moser",
  "Keyshawn Cyr",
  "Jewel Swain",
  "Cristian Morse",
  "Yaquelin Cheatham",
  "Marcos Daniels",
  "Marcelo Lentz",
  "Augustine Torres",
  "Lilly Brenner",
  "Dorien Rodriguez",
  "Domenic Samples",
  "Donnell Jenkins",
  "Johnna Goodrich",
  "Cody Wills",
]

const opations = ["Login", "Modify", "TSRPDF", "Query", "Blocked"]

const FileAnalysis = ({ show, onCloseClick, id }) => {
  const data = [...Array(20)].map((_, index) => ({
    id: index + 1,
    fileNumber: index + 1,
    names: names.at(index),
    date:
      new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      ).toLocaleDateString("en-GB") +
      "  " +
      new Date( Math.round(Math.random()*new Date().getTime())).toLocaleTimeString(),
    note: opations[Math.floor(Math.random() * opations.length)],
  }))
  function tog_backdrop() {
    onCloseClick(!open)
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true} size="lg">
      <ModalHeader
        toggle={() => {
          tog_backdrop()
        }}
      >
        File Analysis
        {/* {id ? "Update Login File" + " " + id : "Login New File"} */}
      </ModalHeader>
      <ModalBody>
        <div className="table-responsive" style={{ maxHeight: "70vh" }}>
          <Table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, index) => (
                <tr key={index}>
                  {/* <th scope="row">{row.names}</th> */}
                  <td>{row.names}</td>
                  <td>{row.date}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </ModalBody>
    </Modal>
  )
}

FileAnalysis.propTypes = {
  onCloseClick: PropTypes.func,
  data: PropTypes.any,
  show: PropTypes.any,
}
export default FileAnalysis
