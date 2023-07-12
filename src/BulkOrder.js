import React, { useState, useEffect } from "react"
import Navbar from "./navbar"
import Ticker from "./ticker"
import bulkcard from "./assets/bulkcard.png"
import "./BulkOrder.css"
import { Button, Form, Input, Space, InputNumber, Select, Radio } from "antd"
const { Option } = Select

const BulkOrder = () => {
  const [form] = Form.useForm()
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    form.setFieldsValue({
      SubTotal: parseFloat(subTotal).toFixed(2),
    })
  }, [subTotal])

  const handleLoadAmountChange = (value) => {
    const cardQuantity = form.getFieldValue("Card Quantity")
    const calculatedLoadAmount = value

    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        cardQuantity,
        calculatedLoadAmount,
        form.getFieldValue("Will cards be used for more than one purchase?"),
        form.getFieldValue("Will cards be used to make international purchases?")
      ),
    })
  }

  const handleNumberChange = (value) => {
    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        value,
        form.getFieldValue("Load Amount"),
        form.getFieldValue("Will cards be used for more than one purchase?"),
        form.getFieldValue("Will cards be used to make international purchases?")
      ),
    })
  }

  const handleAddMultipleTransactionsChange = (e) => {
    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        form.getFieldValue("Card Quantity"),
        form.getFieldValue("Load Amount"),
        e.target.value,
        form.getFieldValue("Will cards be used to make international purchases?")
      ),
    })
  }

  const handleAllowInternationalTransactionsChange = (e) => {
    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        form.getFieldValue("Card Quantity"),
        form.getFieldValue("Load Amount"),
        form.getFieldValue("Will cards be used for more than one purchase?"),
        e.target.value
      ),
    })
  }

  const handleSelectChange = (value) => {
    console.log(value)
  }

  const calculateSubTotal = (
    cardQuantity,
    loadAmount,
    addMultipleTransactions = "No",
    allowInternationalTransactions = "No"
  ) => {
    const costPerCard = 2.98
    let parsedCardQuantity = parseFloat(cardQuantity)
    if (isNaN(parsedCardQuantity)) {
      parsedCardQuantity = 0
    }
    let sum =
      parsedCardQuantity * costPerCard +
      parseFloat(loadAmount) * parsedCardQuantity
    if (addMultipleTransactions === "Yes") {
      sum += 5
    }
    if (allowInternationalTransactions === "Yes") {
      sum += 8
    }
    setSubTotal(sum.toFixed(2))
    return sum.toFixed(2)
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const {
        CardType,
        "Card Quantity": CardQuantity,
        "Load Amount": LoadAmount,
        "Will cards be used for more than one purchase?": AddMultipleTransactions,
        "Will cards be used to make international purchases?": AllowInternationalTransactions,
      } = values
      const subtotal = calculateSubTotal(
        CardQuantity,
        LoadAmount,
        AddMultipleTransactions,
        AllowInternationalTransactions
      )
      const queryParams = `?cardType=${CardType}&cardQuantity=${CardQuantity}&loadAmount=${LoadAmount}&multipletransaction=${AddMultipleTransactions}&internationaltransaction=${ AllowInternationalTransactions}&subtotal=${subtotal}`
      window.location.href = `/checkout${queryParams}`
    })
  }

  return (
    <>
      <Navbar />
      <div className="bulk-division">
        <div className="bulk-div-1">
          <div className="bulk-inner-div-1">
            <div className="bulk-image">
              <img src={bulkcard}></img>
            </div>
            <div className="bulkorder-content">
              <h1 style={{ fontSize: "30px" }}>Benifits of Bulk Orders</h1>
              <div className="bulk-content-list">
                <ul>
                  <li>Streamlined Process</li>
                  <li>Flexible Quantities</li>
                  <li>Customization Options</li>
                  <li>Competitive Pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bulk-div-2">
          <div>
            <h1 style={{ textAlign: "center", fontSize: "36px" }}>
              Prepaid Card Bulk Order Form
            </h1>
            <Form
              style={{ margin: "20px" }}
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              initialValues={{
                SubTotal: subTotal.toString(),
              }}
            >
              <Form.Item
                name="CardType"
                label="Card Type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select defaultValue="Select--" onChange={handleSelectChange}>
                  <Option value="card1">Visa</Option>
                  <Option value="card2">MasterCard </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Card Quantity"
                label="Card Quantity"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue=""
                    onChange={handleNumberChange}
                    style={{ width: "275%" }}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name="Cost per Card"
                label="Cost per Card"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input placeholder="$2.98" disabled={true} />
              </Form.Item>
              <Form.Item
                name="Load Amount"
                label="Load Amount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue=""
                    onChange={handleLoadAmountChange}
                    style={{ width: "275%" }}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name="Will cards be used for more than one purchase?"
                label="Will cards be used for more than one purchase?"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Radio.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onChange={handleAddMultipleTransactionsChange}
                >
                  <Radio value="Yes"> Yes </Radio>
                  <Radio value="No"> No </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="Will cards be used to make international purchases?"
                label="Will cards be used to make international purchases?"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Radio.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onChange={handleAllowInternationalTransactionsChange}
                >
                  <Radio value="Yes"> Yes </Radio>
                  <Radio value="No"> No </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="SubTotal"
                label="SubTotal"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input value={subTotal.toString()} readOnly />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: "3px",
                  margin: "5px",
                  textAlign: "center",
                }}
                onClick={handleSubmit}
              >
                Buy Now
              </Button>
            </Form>
          </div>
        </div>
      </div>
   
    </>
  )
}
export default BulkOrder
