import React from "react"
import { Link } from "react-router-dom"
import VerticalLayout from "../components/VerticalLayout/"

//  Pages element
// import Chat from "../pages/Chat/Chat"

// // Dashboard
import Dashboard from "../pages/Employees/EmployeesList"
// import Product from "../pages/Dashboard/Product"
// import Invoice from "../pages/Dashboard/Invoice"
// import Notification from "../pages/Dashboard/Notification"
// import Pages from "../pages/Dashboard/Pages"

//Company
import BranchList from "../pages/Branches/BranchList"
import Department from "../pages/Department/DepartmentList"

//Employee
import EmployeeDashboard from "../pages/Employees/Index"

//AttendanceList
import AttendanceList from "../pages/Attendance/AttendanceList"

//BT Reports
import BtEntryList from "../pages/BT Report/BtEntryList"
import BtSearchList from "../pages/BT Report/BtSearchList"

//Leave List
import LeaveRequestss from "../pages/LeaveRequests/LeaveRequestList"

//Holiday
import HolidayList from "../pages/Holiday/HolidayList"

//Shopify Componants
import AddProduct from "../pages/Shopify/AddProducts"
import DiscountPage from "../pages/Shopify/Discount/discountListPage"
import AddDiscountPage from "../pages/Shopify/Discount/discountPage"
import ProductList from "../pages/Shopify/Product List/ProductList"

//Compnay
import CompanyList from "../pages/Compny management/Compny"
import CityList from "../pages/Compny management/City"

//Module
import ModulesList from "../pages/ModulesList/ModuleList"

//FileLogin
import FileLogin from "../pages/FileLogin/FileLogin"
import AddFileLogin from "../pages/FileLogin/fileLoginForm"

//BillReport
import ReportList from "../pages/Bill Report/ReportList"

// //Server Management
// import ServerManagement from "../pages/Dashboard/ServerManagement"
// import ReinstallWizard1 from "../pages/Dashboard/ReinstallWizard1"
// import ReinstallWizard2 from "../pages/Dashboard/ReinstallWizard2"
// import ReinstallWizard3 from "../pages/Dashboard/ReinstallWizard3"
// import ReinstallWizard4 from "../pages/Dashboard/ReinstallWizard4"
// import ReinstallWizard4v2 from "../pages/Dashboard/ReinstallWizard4v2"

// Pages Calendar
// import Calendar from "../pages/Calendar/index"

// //Ecommerce Pages
// import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index"
// import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail"
// import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index"
// import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index"
// import EcommerceCart from "../pages/Ecommerce/EcommerceCart"
// import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout"
// import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index"
// // import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct"

//Email
// import EmailInbox from "../pages/Email/email-inbox"
// import EmailRead from "../pages/Email/email-read"
// import EmailBasicTemplte from "../pages/Email/email-basic-templte"
// import EmailAlertTemplte from "../pages/Email/email-template-alert"
// import EmailTemplateBilling from "../pages/Email/email-template-billing"

//Invoices
// import InvoicesList from "../pages/Invoices/invoices-list"
// import InvoiceDetail from "../pages/Invoices/invoices-detail"

//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid"
import ContactsList from "../pages/Contacts/ContactList/contacts-list"
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile"

//Pages
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesPricing from "../pages/Utility/pages-pricing"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"
import EditorJS from "../pages/Editor Js Bloks/Editor"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiOffcanvas from "../pages/Ui/UiOffcanvas"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiPlaceholders from "../pages/Ui/UiPlaceholders"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiToasts from "../pages/Ui/UiToasts"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRating from "../pages/Ui/UiRating"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"
import UiNotifications from "../pages/Ui/ui-notifications"
import UiImageCropper from "../pages/Ui/ui-image-cropper"

// Forms
// import BasicElements from "../pages/Forms/BasicElements"
// import FormLayouts from "../pages/Forms/FormLayouts"
// import FormAdvanced from "../pages/Forms/FormAdvanced"
// import FormEditors from "../pages/Forms/FormEditors"
// import FormValidations from "../pages/Forms/FormValidations"
// import FormMask from "../pages/Forms/FormMask"
// import FormRepeater from "../pages/Forms/FormRepeater"
// import FormUpload from "../pages/Forms/FormUpload"
// import FormWizard from "../pages/Forms/FormWizard"
// import FormXeditable from "../pages/Forms/FormXeditable"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
// import EditableTables from "../pages/Tables/EditableTables"

// Charts
// import ChartApex from "../pages/Charts/Apexcharts"
// import ChartjsChart from "../pages/Charts/ChartjsChart"
// import EChart from "../pages/Charts/EChart"
// import SparklineChart from "../pages/Charts/SparklineChart"
// import ChartsKnob from "../pages/Charts/charts-knob"

//Icons

import IconUnicons from "../pages/Icons/IconUnicons"
import IconBoxicons from "../pages/Icons/IconBoxicons"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import IconFontawesome from "../pages/Icons/IconFontawesome"

// Maps
// import MapsGoogle from "../pages/Maps/MapsGoogle"
// import MapsVector from "../pages/Maps/MapsVector"
// import MapsLeaflet from "../pages/Maps/MapsLeaflet"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Emailverification from "../pages/Authentication/Emailverification"
import ResetPassword from "../pages/Authentication/ResetPassword"
import LoginSuspended from "../pages/Authentication/LoginSuspended"
import StepVerification from "../pages/Authentication/StepVerification"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Profile
import UserProfile from "../pages/Authentication/user-profile"
import ChangePassword from "../pages/Authentication/ChangePassword"
import MyAccount from "../pages/Authentication/MyAccount"
import UserAccountDetail from "../pages/Authentication/UserAccountDetail"
import UserManagement from "../pages/Authentication/UserManagement"
import UserManagementv2 from "../pages/Authentication/UserManagementv2"
import Billing from "../pages/Authentication/Billing"
import Payment from "../pages/Authentication/Payment"
import SecuritySettings from "../pages/Authentication/SecuritySettings"
// import Attendance from "../pages/Dashboard/Attendance/AttendanceList"

const userRoutes = [
  {
    path: "/dashboard",
    element: (
      <VerticalLayout>
        <Dashboard />
      </VerticalLayout>
    ),
  },
  // { path: "/pages", element:</> Pages },
  // { path: "/product", element:</> Product },
  // { path: "/invoice", element:</> Invoice },
  // { path: "/notification", element:</> Notification },

  // { path: "/calendar", element:</> Calendar },

  //Branch
  {
    path: "/branch-management",
    element: (
      <VerticalLayout>
        <BranchList />
      </VerticalLayout>
    ),
  },

  //Department
  {
    path: "/department-management",
    element: (
      <VerticalLayout>
        <Department />
      </VerticalLayout>
    ),
  },

  //Employee
  // {
  //   path: "/employee-management/",
  //   element: (
  //     <VerticalLayout>
  //       <EmployeeDashboard />
  //     </VerticalLayout>
  //   ),
  // },
  {
    path: "/employee-management/:id",
    element: (
      <VerticalLayout>
        <EmployeeDashboard />
      </VerticalLayout>
    ),
  },
  //AttendanceList
  {
    path: "/attendance-list",
    element: (
      <VerticalLayout>
        <AttendanceList />
      </VerticalLayout>
    ),
  },
  {
    path: "/attendance-list/:id",
    element: (
      <VerticalLayout>
        <AttendanceList />
      </VerticalLayout>
    ),
  },

  //Leave List
  {
    path: "/leaveRequests-list",
    element: (
      <VerticalLayout>
        <LeaveRequestss />
      </VerticalLayout>
    ),
  },

  //Holiday
  {
    path: "/holiday",
    element: (
      <VerticalLayout>
        <HolidayList />
      </VerticalLayout>
    ),
  },

  //Users
  // { path: "/users", element:</> UsersList },

  //Module List
  {
    path: "/module-list",
    element: (
      <VerticalLayout>
        <ModulesList />
      </VerticalLayout>
    ),
  },
  {
    path: "/discount-page",
    element: (
      <VerticalLayout>
        <DiscountPage />
      </VerticalLayout>
    ),
  },
  {
    path: "/add-discount",
    element: (
      <VerticalLayout>
        <AddDiscountPage />
      </VerticalLayout>
    ),
  },
  {
    path: "/add-discount/:id",
    element: (
      <VerticalLayout>
        <AddDiscountPage />
      </VerticalLayout>
    ),
  },
  {
    path: "/add-products",
    element: (
      <VerticalLayout>
        <AddProduct />
      </VerticalLayout>
    ),
  },

  {
    path: "/product-list",
    element: (
      <VerticalLayout>
        <ProductList />
      </VerticalLayout>
    ),
  },

  //Company

  {
    path: "/company",
    element: (
      <VerticalLayout>
        <CompanyList />
      </VerticalLayout>
    ),
  },

  {
    path: "/branch",
    element: (
      <VerticalLayout>
        <CityList />
      </VerticalLayout>
    ),
  },

  //FileLogin
  {
    path: "/file-login",
    element: (
      <VerticalLayout>
        <FileLogin />
      </VerticalLayout>
    ),
  },
  {
    path: "/add-new-file-login",
    element: (
      <VerticalLayout>
        <AddFileLogin />
      </VerticalLayout>
    ),
  },

  //FileLogin Report
  {
    path: "/bill-report",
    element: (
      <VerticalLayout>
        <ReportList />
      </VerticalLayout>
    ),
  },

  //BT Report
  {
    path: "/bt-entry-list",
    element: (
      <VerticalLayout>
        <BtEntryList />
      </VerticalLayout>
    ),
  },
  {
    path: "/bt-search-list",
    element: (
      <VerticalLayout>
        <BtSearchList />
      </VerticalLayout>
    ),
  },

  //Server Management
  // { path: "/server-management", element:</> ServerManagement },
  // { path: "/reinstall-wizard-1", element:</> ReinstallWizard1 },
  // { path: "/reinstall-wizard-2", element:</> ReinstallWizard2 },
  // { path: "/reinstall-wizard-3", element:</> ReinstallWizard3 },
  // { path: "/reinstall-wizard-4", element:</> ReinstallWizard4 },
  // { path: "/reinstall-wizard-4/v2", element:</> ReinstallWizard4v2 },

  //chat
  // { path: "/chat", element:</> Chat },

  //Ecommerce
  // { path: "/ecommerce-products", element:</> EcommerceProducts },
  // { path: "/ecommerce-product-detail", element:</> EcommerceProductDetail },
  // { path: "/ecommerce-products/:id", element:</> EcommerceProductDetail },
  // { path: "/ecommerce-orders", element:</> EcommerceOrders },
  // { path: "/ecommerce-customers", element:</> EcommerceCustomers },
  // { path: "/ecommerce-cart", element:</> EcommerceCart },
  // { path: "/ecommerce-checkout", element:</> EcommerceCheckout },
  // { path: "/ecommerce-shops", element:</> EcommerceShops },
  // { path: "/ecommerce-add-products", element:</> EcommerceAddProduct },

  //Email
  // { path: "/email-inbox", element:</> EmailInbox },
  // { path: "/email-read", element:</> EmailRead },
  // { path: "/email-template-basic", element:</> EmailBasicTemplte },
  // { path: "/email-template-alert", element:</> EmailAlertTemplte },
  // { path: "/email-template-billing", element:</> EmailTemplateBilling },

  //Invoices
  // { path: "/invoices-list", element:</> InvoicesList },
  // { path: "/invoices-detail", element:</> InvoiceDetail },
  // { path: "/invoices-detail/:id", element:</> InvoiceDetail },

  // Contacts
  // { path: "/contacts-grid", element:</> ContactsGrid },
  {
    path: "/contacts-list",
    element: (
      <VerticalLayout>
        <ContactsList />
      </VerticalLayout>
    ),
  },
  // { path: "/contacts-profile", element:</> ContactsProfile },

  //Utility
  {
    path: "/pages-starter",
    element: (
      <VerticalLayout>
        <PagesStarter />
      </VerticalLayout>
    ),
  },
  {
    path: "/pages-timeline",
    element: (
      <VerticalLayout>
        <PagesTimeline />
      </VerticalLayout>
    ),
  },
  {
    path: "/editor-js",
    element: (
      <VerticalLayout>
        <EditorJS />
      </VerticalLayout>
    ),
  },
  {
    path: "/pages-faqs",
    element: (
      <VerticalLayout>
        <PagesFaqs />
      </VerticalLayout>
    ),
  },
  {
    path: "/pages-pricing",
    element: (
      <VerticalLayout>
        <PagesPricing />
      </VerticalLayout>
    ),
  },

  // Ui
  {
    path: "/ui-alerts",
    element: (
      <VerticalLayout>
        <UiAlert />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-buttons",
    element: (
      <VerticalLayout>
        <UiButtons />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-cards",
    element: (
      <VerticalLayout>
        <UiCards />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-carousel",
    element: (
      <VerticalLayout>
        <UiCarousel />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-colors",
    element: (
      <VerticalLayout>
        <UiColors />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-dropdowns",
    element: (
      <VerticalLayout>
        <UiDropdown />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-general",
    element: (
      <VerticalLayout>
        <UiGeneral />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-grid",
    element: (
      <VerticalLayout>
        <UiGrid />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-images",
    element: (
      <VerticalLayout>
        <UiImages />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-lightbox",
    element: (
      <VerticalLayout>
        <UiLightbox />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-modals",
    element: (
      <VerticalLayout>
        <UiModal />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-offcanvas",
    element: (
      <VerticalLayout>
        <UiOffcanvas />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-progressbars",
    element: (
      <VerticalLayout>
        <UiProgressbar />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-placeholders",
    element: (
      <VerticalLayout>
        <UiPlaceholders />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-tabs-accordions",
    element: (
      <VerticalLayout>
        <UiTabsAccordions />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-typography",
    element: (
      <VerticalLayout>
        <UiTypography />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-toasts",
    element: (
      <VerticalLayout>
        <UiToasts />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-video",
    element: (
      <VerticalLayout>
        <UiVideo />
      </VerticalLayout>
    ),
  },
  // { path: "/ui-session-timeout", element:</> UiSessionTimeout },
  {
    path: "/ui-rating",
    element: (
      <VerticalLayout>
        <UiRating />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-rangeslider",
    element: (
      <VerticalLayout>
        <UiRangeSlider />
      </VerticalLayout>
    ),
  },
  {
    path: "/ui-notifications",
    element: (
      <VerticalLayout>
        <UiNotifications />
      </VerticalLayout>
    ),
  },
  // { path: "/ui-image-cropper", element:</> UiImageCropper },

  // Forms
  // { path: "/basic-elements", element:</> BasicElements },
  // { path: "/form-layouts", element:</> FormLayouts },
  // { path: "/form-advanced", element:</> FormAdvanced },
  // { path: "/form-editors", element:</> FormEditors },
  // { path: "/form-mask", element:</> FormMask },
  // { path: "/form-repeater", element:</> FormRepeater },
  // { path: "/form-uploads", element:</> FormUpload },
  // { path: "/form-wizard", element:</> FormWizard },
  // { path: "/form-validation", element:</> FormValidations },
  // { path: "/form-xeditable", element:</> FormXeditable },

  // Tables
  {
    path: "/tables-basic",
    element: (
      <VerticalLayout>
        <BasicTables />
      </VerticalLayout>
    ),
  },
  {
    path: "/tables-datatable",
    element: (
      <VerticalLayout>
        <DatatableTables />
      </VerticalLayout>
    ),
  },
  {
    path: "/tables-responsive",
    element: (
      <VerticalLayout>
        <ResponsiveTables />
      </VerticalLayout>
    ),
  },
  // { path: "/tables-editable", element:</> EditableTables },

  //Charts
  // { path: "/apex-charts", element:</> ChartApex },
  // { path: "/chartjs-charts",  element:</> ChartjsChart },
  // { path: "/e-charts", element:</> EChart },
  // { path: "/sparkline-charts", element:</> SparklineChart },
  // { path: "/charts-knob", element:</> ChartsKnob },

  // Icons
  {
    path: "/icons-unicons",
    element: (
      <VerticalLayout>
        <IconUnicons />
      </VerticalLayout>
    ),
  },
  {
    path: "/icons-boxicons",
    element: (
      <VerticalLayout>
        <IconBoxicons />
      </VerticalLayout>
    ),
  },
  {
    path: "/icons-dripicons",
    element: (
      <VerticalLayout>
        <IconDripicons />
      </VerticalLayout>
    ),
  },
  {
    path: "/icons-materialdesign",
    element: (
      <VerticalLayout>
        <IconMaterialdesign />
      </VerticalLayout>
    ),
  },
  {
    path: "/icons-fontawesome",
    element: (
      <VerticalLayout>
        <IconFontawesome />
      </VerticalLayout>
    ),
  },

  // Maps
  // { path: "/maps-google", element:</> MapsGoogle },
  // { path: "/maps-vector", element:</> MapsVector },
  // { path: "/maps-leaflet", element:</> MapsLeaflet },

  {
    path: "/profile",
    element: (
      <VerticalLayout>
        <UserProfile />
      </VerticalLayout>
    ),
  },
  // //profile - done pages
  {
    path: "/change-password",
    element: (
      <VerticalLayout>
        <ChangePassword />
      </VerticalLayout>
    ),
  },
  {
    path: "/change-password/:id",
    element: (
      <VerticalLayout>
        <ChangePassword />
      </VerticalLayout>
    ),
  },
  {
    path: "/my-account",
    element: (
      <VerticalLayout>
        <MyAccount />
      </VerticalLayout>
    ),
  },
  {
    path: "/my-account/:id",
    element: (
      <VerticalLayout>
        <MyAccount />
      </VerticalLayout>
    ),
  },
  {
    path: "/user-account-detail",
    element: (
      <VerticalLayout>
        <UserAccountDetail />
      </VerticalLayout>
    ),
  },

  {
    path: "/role-management",
    element: (
      <VerticalLayout>
        <UserManagement />
      </VerticalLayout>
    ),
  },
  // { path: "/user-management", element:</> UserManagement },
  {
    path: "/user-management/v2",
    element: (
      <VerticalLayout>
        <UserManagementv2 />
      </VerticalLayout>
    ),
  },
  {
    path: "/billing",
    element: (
      <VerticalLayout>
        <Billing />
      </VerticalLayout>
    ),
  },
  {
    path: "/payment",
    element: (
      <VerticalLayout>
        <Payment />
      </VerticalLayout>
    ),
  },
  {
    path: "/security-settings",
    element: (
      <VerticalLayout>
        <SecuritySettings />
      </VerticalLayout>
    ),
  },

  // this route should be at the end of all other routes
  {
    path: "/",
    element: (
      <VerticalLayout>
        <Dashboard />
      </VerticalLayout>
    ),
  },
]

const authRoutes = [
  // { path: "/", element:</> Login },

  // done pages
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/forgot-password",
    element: <ForgetPwd />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/email-verify",
    element: <Emailverification />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/login-suspended",
    element: <LoginSuspended />,
  },
  {
    path: "/Verification",
    element: <StepVerification />,
  },

  {
    path: "/pages-maintenance",
    element: <PagesMaintenance />,
  },
  {
    path: "/pages-comingsoon",
    element: <PagesComingsoon />,
  },
  {
    path: "/pages-404",
    element: <Pages404 />,
  },
  {
    path: "/pages-500",
    element: <Pages500 />,
  },

  // Authentication Inner
  {
    path: "/pages-login",
    element: <Login1 />,
  },
  {
    path: "/pages-register",
    element: <Register1 />,
  },
  {
    path: "/page-recoverpw",
    element: <Recoverpw />,
  },
  {
    path: "/auth-lock-screen",
    element: <LockScreen />,
  },
]

export { userRoutes, authRoutes }
