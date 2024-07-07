import { useEffect, useState } from "react";
import Table from "../Table";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { useAppSelector } from "../../../store";
import { BASE_URL } from "../../../api/axiosConfig";
import { alertError } from "../../../utils/toasts";
import { Link } from "react-router-dom";
const CustomButtonComponent = () => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <button className="bg-violet-950 text-white p-2 rounded">Edit</button>
      <button className="bg-red-500 text-white p-2 rounded">Delete</button>
    </div>
  );
};

function ProdcutManager() {
  const userState = useAppSelector((state) => state.user);
  const [products, setProducts] = useState<any[]>([]);

  const columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    { headerName: "Name", field: "name", flex: 2 },
    {
      field: "price",
      valueFormatter: (p) => "$" + Math.floor(p.value).toLocaleString(),
      flex: 1,
    },
    { field: "quantity", flex: 1 },
    { headerName: "Actions", cellRenderer: CustomButtonComponent, flex: 1 },
  ];

  useEffect(() => {
    fetch(BASE_URL + "/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      })
      .catch((err) => {
        alertError(
          "Something went wrong to the server. Please try again later"
        );
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mx-4 my-2">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Link to={"/dashboard/add-product"} className="bg-violet-950 py-3 px-2 text-white rounded">
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table rowData={products} columnDefs={columnDefs} />
      </div>
    </div>
  );
}

export default ProdcutManager;
