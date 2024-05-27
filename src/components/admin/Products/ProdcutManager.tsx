
function ProdcutManager({ products }: any) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Price</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product:any) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b border-gray-300">{product.id}</td>
                <td className="py-2 px-4 border-b border-gray-300">{product.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{product.price}</td>
                <td className="py-2 px-4 border-b border-gray-300">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>  )
}

export default ProdcutManager