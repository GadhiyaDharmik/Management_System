import React, { useEffect, useMemo, useState } from "react"

//redux

import AddReportModel from "./AddReportModel"

// import Table from "./Componants/NewTable"
import TableContainer from "./Componants/TableContainerCopy"

// Date Picker
import DatePicker from "react-datepicker"
import "bootstrap/dist/css/bootstrap.min.css"

//Export To PDF
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

//Export To CSV
import { CSVLink } from "react-csv"

import {
  Col,
  Badge,
  Row,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap"

import downloadIcon from "./icons/download-svgrepo-com.svg"
import pdfIcon from "./icons/pdf-svgrepo-com.svg"
import docIcon from "./icons/word-svgrepo-com.svg"
import sheetsIcon from "./icons/sheets 123.svg"

import "react-datepicker/dist/react-datepicker.css"

import Select from "react-select"
// import { Actions, Location } from "./CellpropsData"

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
}

const Years = ["2020 - 2021", "2021 - 2022", "2022 - 2023"]

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function ReportList() {
  //Add reports Modal
  const [openModal, setOpenModal] = useState(false)

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
  const ComapnyNames = [
    "HDFC Bank",
    "Kotak Mahindra Bank",
    "ICICI Bank",
    "Axis Bank",
    "Bank of Baroda",
    "State Bank of India",
  ]
  const cityList = [
    "Rajkot",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Bhavnagar",
    "Jamnagar",
    "Gandhinagar",
    "Junagadh",
  ]

  const descriptions = [
    "One of my most productive days was throwing away 1,000 lines of code.",
    "I have always wished for my computer to be as easy to use as my telephone; my wish has come true because I can no longer figure out how to use my telephone.",
    "When in doubt, use brute force.",
    "Talk is cheap. Show me the code.",
    "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
    "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.",
    "Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves.",
    "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris",
    "First learn computer science and all the theory. Next develop a programming style. Then forget all that and just hack.",
  ]

  const statusList = ["Paid", "Unpaid"]

  const data = [...Array(10)].map((_, index) => ({
    id: index + 1,
    date: new Date(
      +new Date() - Math.floor(Math.random() * 10000000000)
    ).toLocaleDateString("en-GB"),
    customerName: names[Math.floor(Math.random() * names.length)],
    companyRefNumber: Math.floor(Math.random() * 10000000000),
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    cityList: cityList[Math.floor(Math.random() * cityList.length)],
    amountList: Math.floor(Math.random() * 10000),
    amountStatus: statusList[Math.floor(Math.random() * statusList.length)],
  }))
  // useState(useSelector(state => state.holiday.holidays))
  const [totalCount, setTotalCount] = useState(50)
  // const [sort]
  // console.log(useSelector(state => state.holiday.holiday))
  const [state, setState] = useState({
    page: 1,
    sizePerPage: 10,
    searchText: "",
    sortOrder: "",
    sortField: "",
  })

  const [reportsList, setReportsList] = useState(data)

  //Dropdown menu
  const [menu, setMenu] = useState(false)

  const [selectedMonth, setSelectedMonth] = useState("")
  const [fromDate, setFromDate] = useState(null)

  const [toDate, setToDate] = useState(null)

  const [optionType, setOptionType] = useState("monthlySelect")

  // const fileNumber = (cell, row) => <FileNumberActions data={row} />

  var totalAmount = reportsList.reduce((acc, item) => acc + item.amountList, 0)

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      style: { width: "100px" },
      sort: true,
      footer: "",
    },
    {
      Header: "Date",
      accessor: "date",
      style: { width: "100px" },
      sort: true,
      footer: "",
    },
    // {
    //   Header: "File Number",
    //   accessor: "fileNumber",
    //   sort: true,
    //   style: { width: "120px", HeaderAlign: "center" },
    //   formatter: fileNumber,
    // },
    {
      Header: "Customer",
      accessor: "customerName",
      sort: true,
      style: { width: "100px" },
      footer: "",
    },
    {
      Header: "Company Referance",
      accessor: "companyRefNumber",
      sort: true,
      style: { width: "100px" },
      footer: "",
    },
    {
      Header: "Property Description",
      accessor: "description",
      sort: true,
      style: { width: "350px" },
      footer: "",
    },
    {
      Header: "City",
      accessor: "cityList",
      sort: true,
      style: { width: "70px" },
      footer: "Total :",
    },
    {
      Header: "Amount",
      accessor: "amountList",
      sort: true,
      style: { width: "100px" },
      footer: totalAmount.toString(),
    },
    {
      Header: "Status",
      accessor: "amountStatus",
      sort: true,
      style: { width: "100px" },
      Cell: cellProps => <StatusShow {...cellProps} />,
    },
  ]

  const headers = [
    {
      label: "Date",
      key: "date",
    },
    {
      label: "Customer",
      key: "customerName",
    },
    {
      label: "Customer Referance",
      key: "companyRefNumber",
    },
    {
      label: "City",
      key: "city",
    },
    {
      label: "Amount",
      key: "amountList",
    },
    {
      label: "Status",
      key: "amountStatus",
    },
  ]
  const opstions = [
    { label: "Date  wise company", value: "date wise company" },
    { label: "Month wise company", value: "month wise company" },
  ]

  function getDate(size, page) {
    const tempData = [...Array(size)].map((_, index) => ({
      id: index + 1,
      date: new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      ).toLocaleDateString("en-GB"),
      customerName: names[Math.floor(Math.random() * names.length)],
      companyRefNumber: Math.floor(Math.random() * 10000000000),
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      cityList: cityList[Math.floor(Math.random() * cityList.length)],
      amountList: Math.floor(Math.random() * 10000),
    }))

    setReportsList(tempData)
  }
  function handleTableChange(type, eventData) {
    console.log(type, eventData)
    setState({
      page: eventData.page,
      sizePerPage: eventData.sizePerPage,
      searchText: "",
      sortOrder: "",
      sortField: "",
    })

    getDate(eventData.sizePerPage, eventData.page)
  }

  function selectedCompany(companyName) {
    setReportsList([...data].filter(item => item.companyName == companyName))
  }

  function selectedYear(year) {
    const startYear = year.substring(0, 4)
    const endYear = year.substring(6, 11)

    let tempData = [...reportsList].map(item =>
      item.date.search(startYear) != -1 ? item : null
    )

    console.log(tempData, endYear.trim())
  }

  //Month Filter
  React.useEffect(() => {
    if (selectedMonth) {
      setReportsList(
        [...data].filter(
          item => parseInt(item.date.substring(3, 5)) == selectedMonth
        )
      )
    }
  }, [selectedMonth])

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardHeader className="bg-transparent">
            <Row>
              <Col>
                <span className="fs-2 fw-bold">Bill Reports</span>
              </Col>
              <Col>
                <div className="d-flex flex-row-reverse">
                  <div>
                    <button
                      className="btn btn-sm btn-primary ps-3 pe-3 font-size-7 rounded-4"
                      onClick={() => {
                        setOpenModal(true)
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <i className="uil-plus"></i>
                      Add New
                    </button>
                  </div>
                  <Dropdown
                    isOpen={menu}
                    toggle={() => setMenu(!menu)}
                    className="d-inline-block"
                  >
                    <DropdownToggle
                      className="btn header-item waves-effect d-flex align-items-center align-items-center rounded-pill"
                      id="page-header-user-dropdown"
                      tag="button"
                    >
                      <img src={downloadIcon} width="30" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu">
                      <DropdownItem
                        tag="button"
                        className="text-center fw-bold"
                        onClick={() => {
                          var doc = new jsPDF()
                          doc.text("Bill Report", 15, 20)

                          autoTable(doc, {
                            body: reportsList,
                            columns: columns.map(ele => {
                              return {
                                header: ele.Header,
                                dataKey: ele.accessor,
                                footer: ele.footer,
                              }
                            }),
                            startY: 25,
                          })
                          doc.save("table.pdf")
                        }}
                      >
                        <img src={pdfIcon} width="100%" />
                        PDF
                      </DropdownItem>
                      <DropdownItem
                        tag="button"
                        className="text-center fw-bold"
                      >
                        <CSVLink
                          data={data}
                          headers={headers}
                          className="text-dark"
                        >
                          <img src={sheetsIcon} width="100%" />
                          CSV
                        </CSVLink>
                      </DropdownItem>
                      <DropdownItem
                        tag="button"
                        className="text-center fw-bold"
                      >
                        <img src={docIcon} width="100%" />
                        DOC
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </CardHeader>
          <form className="app-search bg-transparent">
            <Row className="pt-2 pb-2 ps-4 pe-4">
              <Col md="3" sm="12">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control w-100 ms-2"
                    placeholder="Search Customer..."
                    style={{
                      border: "1px solid hsl(0, 0%, 70%)",
                      borderRadius: "12px",
                    }}

                    // onChange={e => {
                    //   handelFileSearch(e)
                    // }}
                  />
                </div>
              </Col>
            </Row>
            <Row className="p-3 ms-1">
              <Col md="3">
                <div>
                  <Select
                    name="shiftFromType"
                    classNamePrefix="select-v1"
                    styles={customStyles}
                    options={opstions}
                    onChange={e => {
                      setOptionType(e.value)
                    }}
                    placeholder="Search Opations..."
                  />
                </div>
              </Col>
              {/* <Col md="3">
                <div>
                  <Select
                    name="shiftFromType"
                    classNamePrefix="select-v1"
                    styles={customStyles}
                    options={ComapnyNames.map(item => {
                      return { label: item, value: item }
                    })}
                    onChange={e => {
                      selectedCompany(e.value)
                    }}
                    placeholder="Select Company..."
                  />
                </div>
              </Col> */}
              {optionType == "date wise company" ? (
                <>
                  <Col md="3" sm="4">
                    <DatePicker
                      selected={fromDate}
                      onChange={date => setFromDate(date)}
                      placeholderText="Select From Date"
                      style={{
                        borderColor: "transparent",
                      }}
                      className="select-v1__control css-yk16xz-control w-100"
                    />
                  </Col>
                  <Col lg="3">
                    <DatePicker
                      selected={toDate}
                      onChange={date => setToDate(date)}
                      placeholderText="Select From Date"
                      style={{
                        borderColor: "transparent",
                      }}
                      className="select-v1__control css-yk16xz-control w-100"
                    />
                  </Col>
                </>
              ) : optionType == "month wise company" ? (
                <>
                  <Col md="3" sm="12">
                    <div className="position-relative">
                      <Select
                        name="month"
                        classNamePrefix="select-v1"
                        options={monthNames.map(item => {
                          return { label: item, value: item }
                        })}
                        onChange={e => {
                          setSelectedMonth(monthNames.indexOf(e.value) + 1)
                        }}
                        styles={customStyles}
                        placeholder="Select Month"
                      />
                    </div>
                  </Col>
                  <Col md="3" sm="12">
                    <div className="position-relative">
                      <Select
                        name="year"
                        classNamePrefix="select-v1"
                        styles={customStyles}
                        options={Years.map(item => {
                          return { label: item, value: item }
                        })}
                        onChange={e => {
                          selectedYear(e.value)
                        }}
                        placeholder="Select Year"
                      />
                    </div>
                  </Col>
                </>
              ) : (
                ""
              )}
            </Row>
          </form>
        </Card>
        {/* <Card className="p-3"> */}
        <div className="container-fluid">
          <Row>
            <Col xs="12">
              <div className="table_v1">
                <TableContainer
                  tableClassName="product-table table-shadow"
                  columns={columns}
                  data={reportsList}
                  isGlobalFilter={true}
                  isAddCustomer={true}
                  isAddTableBorderStrap={true}
                  footer={totalAmount}
                  // handleCustomerClicks={handleCustomerClicks}
                  getTablePropsC={() => ({
                    className: "product-table",
                  })}
                />
                {/* <Table
                    page={state.page}
                    sizePerPage={state.sizePerPage}
                    totalSize={totalCount}
                    onTableChange={handleTableChange}
                    columns={columns}
                    noDataIndication={"No Data Found"}
                    // loading={isSpinner}
                  /> */}
              </div>
            </Col>
          </Row>
          <AddReportModel
            show={openModal}
            data={data}
            onCloseClick={() => setOpenModal(false)}
          />
        </div>
        {/* </Card> */}
      </div>
    </React.Fragment>
  )
}

export default ReportList

const StatusShow = cell => {
  const status = cell.row.original.amountStatus
  return (
    <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
      <Row className="g-2">
        <Col lg={6}>
          <Badge
            className={
              "badge badge-pill bg-pill font-size-12 bg-soft-" +
              (status === "Paid"
                ? "success"
                : status === "Unpaid"
                ? "warning"
                : "")
            }
            style={{
              cursor: "pointer",
            }}
          >
            {status}
          </Badge>
        </Col>
      </Row>
    </div>
  )
}

// const FileNumberActions = ({ data }) => {
//   const [open, setOpen] = useState(false)
//   const [openModel, setOpenModel] = useState(false)
//   function tog_backdrop() {
//     setOpen(!open)
//   }
//   return (
//     <div
//       className="fs-bold"
//       style={{ cursor: "pointer" }}
//       onClick={() => setOpen(true)}
//     >
//       <span>{data.fileNumber}</span>
//       <Modal
//         size="lg"
//         isOpen={open}
//         toggle={() => {
//           tog_backdrop()
//         }}
//         scrollable={true}
//       >
//         <div className="modal-header">
//           <h5 className="modal-title" id="staticBackdropLabel">
//             <span className="pe-3" style={{ color: "#9F9EB2" }}>
//               File: {data.fileNumber}
//             </span>
//             <span className="pe-5" style={{ color: "#9F9EB2" }}>
//               Querrys:{" "}
//             </span>
//             <span className="pe-4" style={{ color: "#9F9EB2" }}>
//               Bill: {data.bill}
//             </span>
//             <span className="pe-4" style={{ color: "#9F9EB2" }}>
//               Created By: {data.customerName}
//             </span>
//             <span style={{ color: "#9F9EB2" }}>Year: {data.year}</span>
//           </h5>
//           <button
//             type="button"
//             className="btn-close me-3"
//             onClick={() => {
//               setOpen(false)
//             }}
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="modal-body">
//           <Row>
//             <Col md="12">
//               <Row className="text-center">
//                 <Col md="4">
//                   <span
//                     className="w-100 rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="bx bxs-file-txt pe-2"></i>
//                     TSR OPEN
//                   </span>
//                 </Col>
//                 <Col md="4">
//                   <span
//                     className=" w-100 rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="bx bx-time-five pe-2"></i>
//                     VR OPEN
//                   </span>
//                 </Col>
//                 <Col md="4">
//                   <span
//                     className="rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="uil-edit pe-2"></i>
//                     Edit File
//                   </span>
//                 </Col>
//               </Row>
//             </Col>
//             <Col md="12" className="mt-5">
//               <Row className="text-center">
//                 <Col md="4">
//                   <span
//                     className="w-100 rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="bx bxs-pen pe-2"></i>
//                     Send Outsource
//                   </span>
//                 </Col>
//                 <Col md="4">
//                   <span
//                     className=" w-100 rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     @ TSR Email
//                   </span>
//                 </Col>
//                 <Col md="4">
//                   <span
//                     className="rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="bx bx-book-open pe-2"></i>
//                     TSR Querrys
//                   </span>
//                 </Col>
//               </Row>
//             </Col>
//             <Col md="12" className="mt-5">
//               <Row className="text-center">
//                 <Col md="4">
//                   <span
//                     className="w-100 rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="bx bx-pie-chart-alt-2 pe-2"></i>
//                     File Analysis
//                   </span>
//                 </Col>
//                 <Col md="4">
//                   <span
//                     className=" w-100 rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="bx bxs-file-pdf pe-2"></i>
//                     Email TSR PDF
//                   </span>
//                 </Col>
//                 <Col md="4">
//                   <span
//                     className="rounded-4"
//                     onClick={() => {
//                       setOpenModel(true)
//                     }}
//                     style={{
//                       backgroundColor: "#fff",
//                       padding: "10px",
//                       fontWeight: "600",
//                       fontSize: "16px",
//                       lineHeight: "20px",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       border: "1px solid #9F9EB2",
//                       color: "#9F9EB2",
//                     }}
//                   >
//                     <i className="bx bxl-telegram pe-2"></i>
//                     TSR Handover
//                   </span>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </div>
//       </Modal>
//       <AddReportModel
//         show={openModel}
//         data={data}
//         id={data.id}
//         onCloseClick={() => setOpenModel(false)}
//       />
//       {/* <Modal isOpen={open} toggle={open} centered={true}>
//         <ModalHeader toggle={true}>
//         </ModalHeader>
//         <ModalBody>

//         </ModalBody>
//       </Modal> */}
//     </div>
//   )
// }
