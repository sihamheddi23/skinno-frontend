import { useEffect, useState } from "react";
import Table from "../Table";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { useAppSelector } from "../../../store";
import { BASE_URL } from "../../../api/axiosConfig";
import { alertError, alertSuccess } from "../../../utils/toasts";
import Pagination from "../../generics/Pagination";

enum OrderStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    PAID = "paid",
    UNPAID = "unpaid"
}

const SelectOrderStatus = (props) => {
  const values = Object.values(OrderStatus);
  const userState = useAppSelector((state) => state.user);
  const [status, setStatus] = useState(props.data.status);

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    if (e.target.value !== props.data.status) {
      fetch(`${BASE_URL}/orders/${props.data.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userState.user.token}`,
        },
        body: JSON.stringify({ status: e.target.value }),
      })
        .then((res) => res.json())
        .then((res) => {
          alertSuccess("Status updated successfully");
        })
        .catch((err) => {
          console.log(err);
          alertError("Something went wrong to the server. Please try again later");
        });
    }
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      <select name="status" onChange={onChangeStatus} value={status} id="" className="p-2 border border-gray-700 rounded focus:outline-none focus:border-gray-500">
        {
          values.map((value, index) => {
            return <option key={index} value={value}>{value}</option>
          })
         }
      </select>
    </div>
  );
};

function OrderManager() {
  const API_URL = BASE_URL + "/orders/";
  const userState = useAppSelector((state) => state.user);
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    { headerName: "id", field: "id", flex: 1 },
    {
      field: "address",
      flex: 2,
    },
    { field: "productName", headerName: "Product Name", flex: 2 },
    { headerName: "Status", cellRenderer: SelectOrderStatus, flex: 1 },
  ];

  useEffect(() => {
     getOrders();
  }, [page]);

  const getOrders = async () => {
     await fetch(API_URL+ "?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.user.token}`,
      },
     })
      .then((res) => res.json())
      .then((res) => {
        setOrders(res.ordersOfPage);
        setTotalPages(res.pages);
      })
      .catch((err) => {
        console.log(err);
        alertError("Something went wrong to the server. Please try again later");
      });
   
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mx-4 my-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
      </div>
      <div className="overflow-x-auto">
        <Table rowData={orders} columnDefs={columnDefs} />
      </div>
      {
        totalPages > 1 &&
        <Pagination
          current_page={page}
          pages={totalPages}
          onPageChange={onChangePage}
        />
      }
    </div>
  );
}

export default OrderManager;
