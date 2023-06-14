import { React } from "react"
import Navbar from "./navbar"
import Ticker from "./ticker"
import bulkcard from "./assets/bulkcard.png"
import "./BulkOrder.css"
import { Button, Form, Input, Space, InputNumber, Select, Radio } from "antd"
const { Option } = Select

const BulkOrder = () => {
  const [form] = Form.useForm()

  const handleNumberChange = (value) => {
    console.log(value)
  }
  const handleSelectChange = (value) => {
    console.log(value)
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
            >
              <Form.Item
                name="Card Type"
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
                  <Option value="card3">Card 3</Option>
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
                <Input placeholder="$2.98" />
              </Form.Item>
              <Form.Item
                name="Load Amount ($per card)"
                label="Load Amount ($per card)"
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
                name="Add mulitple transactions to cards"
                label="Add mulitple transactions to cards"
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
                >
                  <Radio value="Yes"> Yes </Radio>
                  <Radio value="No"> No </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="Allow international transactions"
                label="Allow international transactions"
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
                <Input placeholder="5.96" />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{borderRadius:"3px", margin:"5px", textAlign:"center"}}>
                Buy Now
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Ticker />
    </>
  )
}
export default BulkOrder
