import React from "react"
import { useSelector } from "react-redux"

const shiftList = () => {
  const [shift, setShift] = React.useState(useSelector(state => state.holiday.shift))
  return shift
}
const countryList = () => {
  const [shift, setShift] = React.useState(useSelector(state => state))
  return shift
}

export { shiftList,countryList }
