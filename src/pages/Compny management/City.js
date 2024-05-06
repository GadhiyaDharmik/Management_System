import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import TableContainer from  "../Compny management/Common/Table"
import * as Yup from "yup"
import { useFormik } from "formik"
import filter from "../../assets/images/filter.svg"
//import components
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { CombineDotVerticle } from "../../components/Common/CommonSvg"
import edit from "../Compny management/Common/imges/table-edit.svg"
import del from "../Compny management/Common/imges/table-delete.svg"

// import {
//   getBranches,
//   initAddBranch,
//   editBranch,
// } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import CityModal from "./cityModal"

import { Card, Col, Row } from "reactstrap"



const data = [
    {
        id: 1,
        name: "Ahemdabad",

    },
    {
        id: 2,
        name: "Rajkot",

    },
    {
        id: 3,
        name: "Surat",

    },
    {
        id: 4,
        name: "Junagadh",

    },
    {
        id: 5,
        name: "porbandar",

    },
    {
        id: 6,
        name: "Mumbi",

    },
    {
        id: 7,
        name: "Hriyana",

    },
    {
        id: 8,
        name: "Palitana",

    },
    {
        id: 9,
        name: "Porbandar",

    },
    {
        id: 10,
        name: "Kolkata",

    },
    {
        id: 11,
        name: " New delhi",

    },
    {
        id: 12,
        name: "Bengaluru",

    },
]

function City() {
    const [totalCount, setTotalCount] = useState(15)
    const [customerList, setCustomerList] = useState([])

    const [modal, setModal] = useState(false)
    const [customer, setCustomer] = useState([])

    const [isEdit, setIsEdit] = useState(false)

    //Add Holiday Modal
    const [openModal, setOpenModal] = useState(false)


    function branchName(cell, row, rowIndex, formatExtraData) {
        return (
            <div>
                <span className="fw-bold fs-5 text-capitalize">{cell.row.original.name}</span>
            </div>
        )
    }

    const toggle = () => {
        if (modal) {
            setModal(false)
        } else {
            setModal(true)
        }
    }
    const editeOpen = (cell, row) => <BranchActions data={row} />

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
                sort: true,

            },
            {
                Header: "City Name",
                accessor: "name",
                Cell: cellProps => {
                    return <div><span className="fw-bold fs-5 text-capitalize">{cellProps.row.original.name}</span></div>
                },

            },
            {
                Header: "Actions",
                accessor: "Actions",
                Cell: editeOpen,

            },
        ],
        []
    )


    const handleCustomerClicks = () => {
        setCustomerList("")
        setIsEdit(false)
        toggle()
    }
    return (
        <React.Fragment>
            <div className="page-content dashboard">
                <div className="container-fluid">

                    <div className="tab_content p-0 bg-transparent manage-tab">
                        <Row className="" >
                            <Col md="10">Branch</Col>
                            <Col md="2">
                                <button

                                    className="btn pb-3 pt-6 p-2.5 btn-invoice"
                                    onClick={() => {
                                        setOpenModal(true)
                                    }}
                                >
                                    <div>
                                        <i className="uil-plus"></i>
                                    </div>
                                    {"  "}Add City
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        {/* <Col xs="12">
                            <div className="table_v1">
                                <Table
                                    data={data}
                                    page={state.page}
                                    sizePerPage={state.sizePerPage}
                                    totalSize={totalCount}
                                    onTableChange={handleTableChange}   
                                    columns={columns}
                                    noDataIndication={"No Data Found"}
                                // loading={isSpinner}
                                />
                            </div>
                        </Col> */}
                        <Col xs="12">
                            <div className="table_v1">
                                <TableContainer
                                    tableClassName="product-table table-shadow"
                                    columns={columns}
                                    data={data}
                                    isGlobalFilter={true}
                                    isAddCustomer={true}
                                    isAddTableBorderStrap={true}
                                    handleCustomerClicks={handleCustomerClicks}
                                    getTablePropsC={() => ({
                                        className: "product-table",
                                    })}
                                />
                            </div>
                        </Col>
                    </Row>

                    <CityModal
                        data={data}
                        show={openModal}
                        onCloseClick={() => setOpenModal(false)}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
City.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
}

export default City


const BranchActions = ({ data }) => {
    const dispatch = useDispatch()
    const [openBranchEdit, setopenBranchEdit] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    //Edit
    const handleEditBranch = () => {
        setopenBranchEdit(true)
    }
    //Delete Model
    const handleDeleteBranch = (data) => {
        console.log("data", data.id)
        setDeleteModal(false)
    }

    return (
        <div className="d-flex align-items-center border-transparent notification_message text-color-v1">
            <Row className="g-2">
                <Col lg={6}>
                    <button
                        className="btn btn-transparent"
                        onClick={handleEditBranch}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={edit} alt="" />
                    </button>
                </Col>
                <Col lg={6}>
                    <button
                        className="btn btn-transparent"
                        onClick={() => setDeleteModal(true)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={del} alt="" />
                    </button>
                </Col>
            </Row>

            <CityModal
                id={data.id}
                show={openBranchEdit}
                onCloseClick={() => setopenBranchEdit(false)}
            />
            {/* <DeleteModal
        id={data.id}
        show={deleteModal}
        onDeleteClick={handleDeleteBranch}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
        </div>
    )
}

//Branch Address

const Address = (cell, row, rowIndex, formatExtraData) => {
    return (
        <div className="d-flex align-items-center country">
            {row.address}
        </div>
    )
}