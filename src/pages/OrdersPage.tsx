import Sidebar from '../components/admin/Sidebar'
import Header from '../components/admin/Header'
import OrderManager from '../components/admin/Orders/OrderManager'

function OrdersPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow  bg-slate-100">
        <Header />
        <OrderManager  />
      </div>
    </div>
  )
}

export default OrdersPage