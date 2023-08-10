import React from "react"
import { Space, Table, Tag } from "antd"
const columns = [
  {
    title: "Order Id",
    dataIndex: "Order Id",
        key: "Order Id",
        width: 150,
  },
  {
    title: "Payment Method",
    dataIndex: "Payment Method",
      key: "Payment Method",
      width: 150,
  },
  {
    title: "Sub Total",
    dataIndex: "Sub Total",
      key: "Sub Total",
      width: 150,
  },
  {
    title: "Transaction Fee",
    key: "Transaction Fee",
      dataIndex: "Transaction Fee",
      width: 150,
  },
  {
    title: "Order Total",
    key: "Order Total",
      dataIndex: "Order Total",
      width: 150,
  },
  {
    title: "Order Status",
    key: "Order Status",
      dataIndex: "Order Status",
      width: 150,
  },
  {
    title: "Date",
    key: "Date",
      dataIndex: "Date",
      width: 150,
  },
  {
    title: "Action",
      key: "action",
      width: 150,
    // render: (_, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //     <a>Delete</a>
    //   </Space>
    // ),
  },
]
const data = [
  {
    key: "",
    name: "",
    age: "",
    address: "",
    tags: "",
  },
]
const Ordertable = () => (
  <div>
    <h6>Individual Orders</h6>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: "100%" }}
    />

    <h6>Bulk Orders</h6>
        <Table columns={columns} dataSource={data} pagination={false}
     scroll={{ x: '100%' }}    />
  </div>
)
export default Ordertable
