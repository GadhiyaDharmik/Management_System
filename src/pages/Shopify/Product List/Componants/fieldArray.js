import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import NestedArray from "./nestedFieldArray"
import { Row, Col } from "reactstrap"
import del from "../../../../assets/images/table-delete.svg"

export default function Fields() {
  const { register } = useFormContext()
  const { fields, append, remove, prepend } = useFieldArray({
    name: "options",
    values: [{ value: "" }],
  })
  return (
    <>
      <div className="justify-content-center">
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <Row>
                <Col lg={2} xs={12}>
                  <label>Name</label>
                  <input
                    className="form-control w-100"
                    {...register(`options[${index}].name`)}
                    style={{ marginBottom: "2px" }}
                  />
                </Col>
                <Col lg={10} xs={11}>
                  <div className="d-flex">
                    <NestedArray nestIndex={index} data={item} />
                    <button
                      type="button"
                      style={{
                        cursor: "pointer",
                        border: "none",
                        width: "50px",
                      }}
                      className="btn btn-transparent ms-5"
                      onClick={() => remove(index)}
                    >
                      <img src={del} alt="" />
                    </button>
                  </div>
                </Col>
              </Row>
              <hr />
            </div>
          )
        })}
      </div>

      <section>
        <button
          className="btn pb-3 pt-3 btn-invoice"
          onClick={() => {
            append({ name: "", values: [{ value: "" }] })
          }}
        >
          Add another option
        </button>
      </section>
    </>
  )
}
