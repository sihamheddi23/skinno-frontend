import Table from "../Table"

function ProdcutManager({ products }: any) {
  return (
    <div className="p-4">
      <div className="flex justify-between mx-4 my-2">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <button className="bg-violet-950 text-white p-2 rounded">Add Product</button>
       </div>
      <div className="overflow-x-auto">
        <Table />
      </div>
    </div>  )
}

export default ProdcutManager