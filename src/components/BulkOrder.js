import React, { useContext, useState } from "react"
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input"

import en from "react-phone-number-input/locale/en.json"
import "react-phone-number-input/style.css"
import NavbarCart from "./NavbarCart"
import "../styles/BulkOrder.css"
import success from "../assets/Success Icon.png"
import tick from "../assets/tick-circle.png"
import cards from "../assets/Bank Cards.png"
import ellipse from "../assets/Ellipse.png"
import { v4 as uuidV4 } from "uuid"
import { Button, Form, Input, InputNumber, Select, Card, Checkbox } from "antd"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import { CartContext } from "./CartContext"
const { Option } = Select

const BulkOrder = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  const { addToBulkCart } = useContext(CartContext)
  const [subTotal, setSubTotal] = useState(0)
  const [onFocuseInput, setOnFocuseInput] = useState("")
  const [phoneNumber, setPhoneNumber] = useState()
  const [country, setCountry] = useState("us")

  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select
      {...rest}
      value={value}
      onChange={(event) => {
        onChange(event.target.value || undefined)
      }}
    >
      <option value="">United States +1</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {labels[country]} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  )

  return (
    <>
      <NavbarCart />
      <div className="bulk-main">
        <div className="bulk-division">
          <div className="bulk-div-1">
            <Card className="bulkorder-content">
              <img src={success} alt=""></img>
              <h3>Bulk Prepaid Card</h3>
              <p className="subtitle-bulk-2">
                Buy 5 to 100 Cards in a Single Click.
              </p>
            </Card>
            <div>
              <Card className="benefits-card">
                <div className="benefits-card-content">
                  <img src={ellipse} className="benefits-card-img" alt="" />
                  <img src={cards} className="benefits-card-badge" alt="" />
                  <h5 className="benefits-card-title">Benefits</h5>
                </div>
              </Card>
            </div>

            <div className="bulkorder-content-2">
              <div className="listing-div">
                <span className="listing">
                  <img src={tick} className="tick-class" alt=""></img>
                  <p>Streamlined Process</p>
                </span>
                <div className="listing">
                  <img src={tick} className="tick-class" alt=""></img>
                  <p>Flexible Quantities</p>
                </div>
                <div className="listing">
                  <img src={tick} className="tick-class" alt=""></img>
                  <p>Customization Options</p>
                </div>
                <div className="listing">
                  <img src={tick} className="tick-class" alt=""></img>
                  <p>Competitive Pricing</p>
                </div>
              </div>
              <p className="footer-card2">
                Purchasing bulk prepaid cards and exchanging Bitcoin through
                Prepaid Friend's website offers numerous benefits. Their
                streamlined process ensures quick and hassle-free transactions.
                With flexible quantities, users can meet their specific needs
                without limitations. Customization options allow for
                personalized branding and messaging. Moreover, competitive
                pricing guarantees cost-effectiveness, making it an ideal choice
                for individuals and businesses alike.
              </p>
            </div>
          </div>
          <div className="bulk-div-2">
            <Form
              name="bulk-orders-form"
              form={form}
              layout="vertical"
              autoComplete="off"
              onValuesChange={() => {
                const quantity = form.getFieldValue("card-quantity") || 0;
                const loadAmount = form.getFieldValue("load-amount") || 0;
                const additionalPurchaseQt =
                  form.getFieldValue("additional-purchase-quantity") || 0;

                const isUsedForInternationalTransaction = form.getFieldValue(
                  "international-purchases"
                );

                const calculateTotal =
                  (quantity * loadAmount || 0) +
                  (loadAmount ? quantity * 2.98 : 0) +
                  additionalPurchaseQt * 2 +
                  (isUsedForInternationalTransaction ? 7.5 : 0);

                setSubTotal(calculateTotal);
              }}
              style={{
                margin: "75px 20px 0px 20px",
              }}
              onFinish={(value) => {
                const quantity = form.getFieldValue("card-quantity") || 0;
                const loadAmount = form.getFieldValue("load-amount") || 0;
                const cardType = form.getFieldValue("card-type") || 0;
                const additionalPurchaseQt =
                  form.getFieldValue("additional-purchase-quantity") || 0;

                const isUsedForInternationalTransaction = form.getFieldValue(
                  "international-purchases"
                );

                addToBulkCart({
                  id: uuidV4(),
                  quantity,
                  amount: loadAmount,
                  subTotal,
                  cardType,
                  additionalPurchaseQt,
                  isUsedForInternationalTransaction,
                });

                console.log(value);

                nav("/bulk-checkout", {
                  state: {
                    customerName: value["customer-name"] || "",
                    businessName: value["business-name"] || "",
                    address: value["address"] || "",
                    phoneNumber: value["phone-number"] || "",
                    brokerId: value["broker-id"] || "",
                  },
                });
              }}
            >
              <Form.Item
                name="customer-name"
                label="Customer's Name"
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                rules={[
                  {
                    required: true,
                    message: "Customer Name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="business-name"
                label="Business Name"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
                rules={[
                  {
                    required: true,
                    message: "Business Name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Address is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone-number"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Phone number is required!",
                  },
                ]}
              >
                <span style={{ display: "flex" }}>
                  <CountrySelect
                    className={`border-b-2 bg-none outline-none w-1/4 text-xs countrycode ${
                      onFocuseInput === "country"
                        ? "border-blue-700 "
                        : "border-gray-300"
                    }`}
                    labels={en}
                    value={country}
                    onChange={setCountry}
                    name="countrySelect"
                    onFocus={() => setOnFocuseInput("country")}
                  />
                  <Input
                   
                    type="tel"
                id="phone"
                placeholder="Enter your phone number"
              
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                name="phoneNumber"
                onFocus={() => setOnFocuseInput("phoneNumber")}
                  />
                </span>
              </Form.Item>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item
                  name="card-type"
                  label="Card Type"
                  style={{ display: "inline-block", width: "60%" }}
                  rules={[
                    {
                      required: true,
                      message: "Card type is required!",
                    },
                  ]}
                >
                  <Select defaultValue="Select--" onChange={() => {}}>
                    <Option value="visa">Visa</Option>
                    <Option value="masterCard">MasterCard </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="card-quantity"
                  label="Card Quantity"
                  rules={[
                    {
                      required: true,
                      message: "Card quantity is required!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <InputNumber
                    type="number"
                    width={50}
                    min={5}
                    max={100}
                    defaultValue=""
                    onChange={() => {}}
                    formatter={(value) =>
                      value < 5 ? (5).toString() : value.toString()
                    }
                    parser={(value) =>
                      parseInt(value, 10) < 5 ? 5 : parseInt(value, 10)
                    }
                    style={{ width: "100%", fontWeight:"400" }}
                  />
                </Form.Item>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Item
                  name="load-amount"
                  label="Load Amount"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Load amount is required!",
                    },
                  ]}
                >
                  <Select defaultValue="Select--" style={{ width: "98%" }}>
                    <Option value="25">25</Option>
                    <Option value="50">50 </Option>
                    <Option value="100">100 </Option>
                    <Option value="200">200 </Option>
                    <Option value="300">300 </Option>
                    <Option value="300">400 </Option>
                    <Option value="300">500 </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="broker-id"
                  label="Broker Id"
                  style={{ width: "80%" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <Form.Item
                name="additional-purchases"
                valuePropName="checked"
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues["additional-purchases"] !==
                  currentValues["additional-purchases"]
                }
              >
                <Checkbox>
                  Will cards be used for more than one purchase?
                </Checkbox>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues["additional-purchases"] !==
                  currentValues["additional-purchases"]
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("additional-purchases") === true && (
                    <Form.Item name="additional-purchase-quantity" label="">
                      <InputNumber
                        min={1}
                        defaultValue={1}
                        onChange={() => {}}
                        style={{ width: "50%" }}
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
              <Form.Item name="international-purchases" valuePropName="checked">
                <Checkbox>
                  Will cards be used to make international purchases?
                </Checkbox>
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft: "5px",
                  fontWeight: "bold",
                }}
              >
                <div>
                  <p>Cost Per Card</p>
                </div>
                <div>
                  <p>$2.98</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "2px",
                  marginLeft: "5px",
                  fontWeight: "bold",
                }}
              >
                <div>
                  <p>Subtotal</p>
                </div>
                <div>
                  <p>{subTotal}</p>
                </div>
              </div>
              <Button className="buyNowBtn" htmlType="submit">
                Buy Now
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default BulkOrder;
