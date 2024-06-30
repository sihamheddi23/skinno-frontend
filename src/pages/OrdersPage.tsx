import Sidebar from '../components/admin/Sidebar'
import Header from '../components/admin/Header'
import OrderManager from '../components/admin/Products/OrderManager'

function OrdersPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <OrderManager  />
      </div>
    </div>
  )
}

export default OrdersPage