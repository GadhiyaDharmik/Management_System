import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import FieldArray from "./Componants/fieldArray"
import Variants from "./Componants/Variants"

import { Button, Row, Col, Card, CardBody } from "reactstrap"

const defaultValues = {
  options: [],
}

function ProductList() {
  const formMethods = useForm({
    defaultValues,
  })

  const { handleSubmit, reset } = formMethods
  const onSubmit = data => console.log("data", data)

  return (
    <React.Fragment>
      <div className="page-content">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardBody>
                <div
                  style={{
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  <FieldArray />
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row>
                  <Col lg={12}>
                    <Variants />
                  </Col>
                  <hr />
                  <Col lg={12} className="text-end">
                    <Button
                      type="button"
                      className="btn pb-3 pt-3 me-4 mt-4 btn-invoice"
                      onClick={() => reset(defaultValues)}
                    >
                      Reset
                    </Button>

                    <Button
                      className="btn pb-3 pt-3 btn-invoice mt-4"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </form>
        </FormProvider>
      </div>
    </React.Fragment>
  )
}

export default ProductList
