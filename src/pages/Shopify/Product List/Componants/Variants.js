import { useFormContext, useWatch, useFieldArray } from "react-hook-form"
import React, { useMemo, useEffect, useState } from "react"
import { Table, Card, Row, Col, Label, Alert } from "reactstrap"
import { Link } from "react-router-dom" //For File Uploa  d
import Dropzone from "react-dropzone"
import avatar from "../../../../assets/images/image-svgrepo-com.svg"

import dragDrop from "../../../../assets/images/arrow-top-down-svgrepo-com.svg"
import edit from "../../../../assets/images/table-edit.svg"
import del from "../../../../assets/images/table-delete.svg"

import { result } from "lodash"

import ProducrListModel from "./UpdateVariantModel"

let temp = []
const Variants = () => {
  const { register, setValue } = useFormContext()
  const [open, setOpen] = useState(false)
  const [editField, setEditField] = useState([])
  const [editFieldId, setEditFieldId] = useState([])
  const watchOptions = useWatch({ name: "options" })

  const { fields, remove } = useFieldArray(
    {
      name: "variants",
    }
  )
  const watchVariants = useWatch({ name: "variants", defaultValue: fields })
  // //console.log("watchOptions", watchOptions)
  const cartesianIdx2 = a => {
    // a = array of array
    var i,
      j,
      l,
      m,
      a1,
      o = []
    if (!a || a.length == 0) return a

    a1 = a.splice(0, 1)[0] // the first array of a
    a = cartesianIdx2(a)
    for (i = 0, l = a1.length; i < l; i++) {
      if (a && a.length)
        for (j = 0, m = a.length; j < m; j++) o.push([i].concat(j))
      else o.push([i])
    }
    return o
  }

  const variantsIdxs = useMemo(() => {
    const formattedOptions = watchOptions.map(option =>
      option.values.filter(value => !!value.value).map(value => value.value)
    )
    return cartesianIdx2(formattedOptions.filter(opt => !!opt.length))
  }, [watchOptions])

  const isArrayEquals = (arr1, arr2) => {
    return (
      arr1.filter((i, n) => arr2[n] === i).length === arr1.length &&
      arr2.filter((i, n) => arr1[n] === i).length === arr2.length
    )
  }

  const findExistingVariant = (variant, ttttt) => {
    // console.log({ ttttt })
    return ttttt?.find(v => {
      if (v.key.length < variant.length) {
        return v.key.every((k, i) => {
          const res = variant.includes(k)
          const idx = variant.findIndex(v => v === k)
          if (res && idx === i) return true
          return false
        })
      }
      if (v.key.length === variant.length) {
        const result = isArrayEquals(v.key, variant)
        return result
      }
    })
  }

  const getVariantsName = variantIdxs => {
    const nameArray = []
    variantIdxs.forEach((variantIdx, idx) => {
      nameArray.push(watchOptions[idx].values[variantIdx].value)
    })
    return nameArray.join(" / ")
  }

  // Handle all Variants Change Events
  useEffect(() => {
    const variantsValue = []
    //console.log({ watchVariants, watchOptions, variantsIdxs })
    temp = watchVariants
    if (variantsIdxs.length <= watchVariants.length) {
      variantsIdxs.forEach((i, j) => {
        //console.log({ temp })
        if (temp[j]) temp[j].key = i
      })
    }

    variantsIdxs.forEach(variantIdxs => {
      if (!variantIdxs.length) return
      const existingVariant = findExistingVariant(variantIdxs, temp)
      variantsValue.push({
        key: variantIdxs,
        variant: getVariantsName(variantIdxs),
        price: existingVariant?.price || 0,
        quantity: existingVariant?.quantity || 0,
        available: existingVariant?.available || 0,
        sku: existingVariant?.sku || 0,
        barcode: existingVariant?.barcode || 0,
        image: existingVariant?.image || 0,
      })
    })
    setValue("variants", variantsValue)
  }, [variantsIdxs, setValue])

  const onEditClick = (data, id) => {
    setOpen(true)
    setEditField(data)
    setEditFieldId(id)
  }
  function updateData(data, index) {
    setValue(`variants[${index - 1}]`, data)
  }
  return (
    <>
      <label>Product Variants</label>
      <Card>
        <table className="table table-responsive table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Variant</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quint</th>
              <th>Available</th>
              <th>SKU</th>
              <th>Barcode</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              return (
                <tr
                  key={field.id}
                  className="flex space-x-4"
                  style={{ width: "800px", overflow: "scroll" }}
                >
                  <td>
                    <label>{field.variant}</label>
                  </td>
                  <td>
                    <div>
                      <label
                        htmlFor="upload-button"
                        style={{
                          padding: "1px",
                          marginTop: "0px",
                          width: "2rem",
                        }}
                      >
                        {watchVariants[index]?.image ? (
                          <label htmlFor={`upload-button${index}`}>
                            <img
                              src={
                                watchVariants[index]?.image
                                  ? URL.createObjectURL(
                                      watchVariants[index].image[0]
                                    )
                                  : ""
                              }
                              alt="dummy"
                              width="100%"
                              style={{
                                cursor: "pointer",
                                marginTop: "auto",
                              }}
                            />
                          </label>
                        ) : (
                          <>
                            <label htmlFor={`upload-button${index}`}>
                              <img
                                src={avatar}
                                alt="dummy"
                                width="100%"
                                style={{
                                  cursor: "pointer",
                                  marginTop: "auto",
                                }}
                              />
                            </label>
                          </>
                        )}
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id={`upload-button${index}`}
                          {...register(`variants[${index}].image`)}
                        />
                      </label>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control w-100"
                      {...register(`variants[${index}].price`)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control w-100"
                      style={{ marginRight: "25px" }}
                      {...register(`variants[${index}].quantity`)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control w-100"
                      style={{ marginRight: "25px" }}
                      {...register(`variants[${index}].available`)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control w-100"
                      style={{ marginRight: "25px" }}
                      {...register(`variants[${index}].sku`)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control w-100"
                      style={{ marginRight: "25px" }}
                      {...register(`variants[${index}].barcode`)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      style={{
                        cursor: "pointer",
                        border: "none",
                      }}
                      className="btn btn-transparent"
                      onClick={() =>
                        onEditClick(watchVariants[index], index + 1)
                      }
                    >
                      <img src={edit} alt="" />
                    </button>
                    <button
                      type="button"
                      style={{
                        cursor: "pointer",
                        border: "none",
                      }}
                      className="btn btn-transparent"
                      onClick={() => remove(index)}
                    >
                      <img src={del} alt="" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <ProducrListModel
          show={open}
          data={editField}
          id={editFieldId}
          onCloseClick={() => {
            setOpen(false)
            setEditField([])
            setEditFieldId([])
          }}
          updateData={(data, index) => updateData(data, index)}
        />
      </Card>
    </>
  )
}

export default Variants
