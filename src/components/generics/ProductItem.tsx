import { Link } from 'react-router-dom'

function ProductItem({ children, product }) {
  return (
           <div className="flex items-center flex-col sm:flex-row gap-5 m-3 border border-gray-400 p-3 relative shadow">
                <img
                  className="h-[100px] w-[100px] md:h-[200px] md:w-[200px]"
                  src={product.image_url}
                  alt="product image"
                />
                <div className="flex flex-col my-3 gap-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xl md:text-2xl font-semibold capitalize hover:text-violet-800"
                  >
                    {product.name}
                  </Link>
                  <p>Price Per Unit : { product.price } $</p>
                  <p>Quantity : {product.quantity}</p>
                 
                 {
                  children
                 }
                </div>
              </div>
  )
}

export default ProductItem