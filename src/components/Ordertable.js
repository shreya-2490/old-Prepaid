import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
const columns = [
  {
    title: "Order Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    key: "payment_method",
  },
  {
    title: "Sub Total",
    dataIndex: "order_subtotal",
    key: "order_subtotal",
  },
  {
    title: "Transaction Fee",
    key: "transaction_fee",
    dataIndex: "transaction_fee",
  },
  {
    title: "Order Total",
    key: "order_total",
    dataIndex: "order_total",
  },
  {
    title: "Order Status",
    key: "order_status",
    dataIndex: "order_status",
  },
  {
    title: "Date",
    key: "created_at",
    dataIndex: "created_at",
    render: (value) => {
      return <p>{dayjs(value)?.format()}</p>;
    },
  },
  {
    title: "Actions",
    key: "action",
    render: (_, record) => <Button type="link">Show Items</Button>,
  },
];

const OrderTable = () => {
  const [cookies] = useCookies(["pfAuthToken"]);
  const [isLoading, setIsLoading] = useState("");
  const [individualOrders, setIndividualOrders] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      ?.get("/my-order-individual-api", {
        headers: {
          Authorization: `Bearer ${cookies?.pfAuthToken}`,
        },
      })
      ?.then((res) => setIndividualOrders(res?.data?.rows))
      ?.catch((err) => console?.error(err));

    axios
      ?.get("/get-order-bulk-api", {
        headers: {
          Authorization: `Bearer ${cookies?.pfAuthToken}`,
        },
      })
      ?.then((res) => setBulkOrders(res?.data?.rows))
      ?.catch((err) => console?.error(err))
      ?.finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h6>Individual Orders</h6>
      <Table
        columns={columns}
        dataSource={individualOrders}
        pagination={false}
        scroll={{ x: "100%" }}
        className="mb-5"
        loading={isLoading}
      />

      <h6>Bulk Orders</h6>
      <Table
        columns={columns}
        dataSource={bulkOrders}
        pagination={false}
        scroll={{ x: "100%" }}
        loading={isLoading}
      />
    </div>
  );
};
export default OrderTable;
