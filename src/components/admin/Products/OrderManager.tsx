import Table from "../Table"

function OrderManager() {
  return (
    <div className="p-4">
      <div className="flex justify-between mx-4 my-2">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
       </div>
      <div className="overflow-x-auto">
        <Table />
      </div>
    </div>  )
}

export default OrderManager