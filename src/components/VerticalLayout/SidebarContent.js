import PropTypes from "prop-types"
import React, { useCallback, useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
// import MetisMenu from "metismenujs"
// import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
// import { withTranslation } from "react-i18next"
// import overview from "../../assets/images/overview.svg"
// import holiday from "../../assets/images/calender.svg"
// import employeeList from "../../assets/images/services.svg"
// import role from "../../assets/images/profile-user-avatar-man-person-svgrepo-com.svg"
// import invoice from "../../assets/images/invoice.svg"
// import billing from "../../assets/images/billing.svg"
// import Announcements from "../../assets/images/Announcements.svg"
// import support from "../../assets/images/support.svg"
// import sidebar from "../../assets/images/sidebar.svg"
// import department from "../../assets/images/department.svg"

// import branch from "../../assets/images/branch.svg"
import attendance from "../../assets/images/Attendance.svg"
import employeesList from "../../assets/images/employee-svgrepo-com.svg"
import leave from "../../assets/images/logout.svg"
import report from "../../assets/Web/report-file-svgrepo-com.svg"
import btList from "../../assets/images/search-file-svgrepo-com.svg"
import productList from "../../assets/images/products-svgrepo-com.svg"
import addProduct from "../../assets/images/shop-add-svgrepo-com.svg"
import  productDiscount from "../../assets/images/discount-circle-svgrepo-com.svg"
// import btSearchList from "../../assets/images/file-svgrepo-com.svg"
// import companySection from "../../assets/images/organizationmajor-svgrepo-com.svg"
// import city from "../../assets/images/compass-svgrepo-com.svg"

const SidebarContent = props => {
  const ref = useRef()

  // const activateParentDropdown = useCallback(item => {
  //   item.classList.add("active")
  //   const parent = item.parentElement
  //   const parent2El = parent.childNodes[1]
  //   if (parent2El && parent2El.id !== "side-menu") {
  //     parent2El.classList.add("mm-show")
  //   }

  //   if (parent) {
  //     parent.classList.add("mm-active")
  //     const parent2 = parent.parentElement

  //     if (parent2) {
  //       parent2.classList.add("mm-show") // ul tag

  //       const parent3 = parent2.parentElement // li tag

  //       if (parent3) {
  //         parent3.classList.add("mm-active") // li
  //         parent3.childNodes[0].classList.add("mm-active") //a
  //         const parent4 = parent3.parentElement // ul
  //         if (parent4) {
  //           parent4.classList.add("mm-show") // ul
  //           const parent5 = parent4.parentElement
  //           if (parent5) {
  //             parent5.classList.add("mm-show") // li
  //             parent5.childNodes[0].classList.add("mm-active") // a tag
  //           }
  //         }
  //       }
  //     }
  //     scrollElement(item)
  //     return false
  //   }
  //   scrollElement(item)
  //   return false
  // }, [])

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  // useEffect(() => {
  //   const pathName = props.location.pathname

  //   new MetisMenu("#side-menu")
  //   let matchingMenuItem = null
  //   const ul = document.getElementById("side-menu")
  //   const items = ul.getElementsByTagName("a")
  //   for (let i = 0; i < items.length; ++i) {
  //     if (pathName === items[i].pathname) {
  //       matchingMenuItem = items[i]
  //       break
  //     }
  //   }
  //   if (matchingMenuItem) {
  //     activateParentDropdown(matchingMenuItem)
  //   }
  // }, [props.location.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  })

  // function scrollElement(item) {
  //   if (item) {
  //     const currentPosition = item.offsetTop
  //     if (currentPosition > window.innerHeight) {
  //       ref.current.getScrollElement().scrollTop = currentPosition - 300
  //     }
  //   }
  // }

  return (
    <React.Fragment>
      <SimpleBar style={{ height: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link
                to="/dashboard"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={employeesList} alt="" />
                <span>Employees List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/attendance-list"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={attendance} alt="" />
                <span>Attendances</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/holiday" className="waves-effect">
                <img src={holiday} alt=""  style={{height:"40px"}} />
                <span>Holiday</span>
              </Link>
            </li> */}
            <li>
              <Link
                to="/leaveRequests-list"
                className="waves-effect"
                style={{ height: "40px", paddingLeft: "10px" }}
              >
                <img src={leave} alt="" />
                <span>Leaves</span>
              </Link>
            </li>
            <li>
              <Link
                to="/file-login"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={attendance} alt="" />
                <span>FileLogin</span>
              </Link>
            </li>
            <li>
              <Link
                to="/bill-report"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={report} alt="" />
                <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/bt-search-list"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={btList} alt="" />
                <span>BT Search List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/product-list"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={productList} alt="" />
                <span>Products List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-products"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={addProduct} alt="" />
                <span>Add Product</span> 
              </Link>
            </li>
            <li>
              <Link
                to="/discount-page"
                className="waves-effect ps-2"
                style={{ height: "40px" }}
              >
                <img src={productDiscount} alt="" />
                <span>Discount</span> 
              </Link>
            </li>
            {/* <li>
              <Link to="/invoice" className="waves-effect">
                <img src={invoice} alt=""  style={{height:"40px"}} />
                <span>Invoice</span>
              </Link>
            </li>
            <li>
              <Link to="/billing" className="waves-effect">
                <img src={billing} alt=""  style={{height:"40px"}} />
                <span>Billing</span>
              </Link>
            </li> */}
          </ul>
          {/* <div className="sidebar_footer mt-5 px-3 mb-5 pb-5">
            <img src={sidebar} className="w-100" alt=""  style={{height:"40px"}} />
            <div className="footer_content text-center mt-3 mb-5">
              <p className="text-center">
                {" "}
                Evenscript Pvt Ltd. Made With <br />{" "}
                <i className="mdi mdi-heart text-danger"></i> In Melbourne
              </p>
            </div> */}
          {/* </div>  */}
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default SidebarContent
