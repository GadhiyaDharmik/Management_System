import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import del from "../../../../assets/images/table-delete.svg"

const NestedArray = ({ nestIndex, appendField }) => {
  const { register } = useFormContext()

  const { fields, remove, append } = useFieldArray({
    name: `options[${nestIndex}].values`,
  })

  return (
    <div className="w-100">
      <label>Value</label>
      {fields.map((item, k) => {
        return (
          <div key={item.id} className="d-flex">
            <input
              className="form-control w-100 mb-2"
              {...register(`options[${nestIndex}].values[${k}].value`)}
            />
            <button
              type="button"
              style={{
                cursor: "pointer",
                border: "none",
              }}
              className="btn btn-transparent"
              onClick={() => {
                remove(k)
              }}
            >
              <img src={del} alt="" />
            </button>
          </div>
        )
      })}

      <button
        type="button"
        className="btn pb-3 pt-3 btn-invoice"
        onClick={() =>
          append({
            value: "",
          })
        }
      >
        Add value
      </button>
    </div>
  )
}

export default NestedArray
