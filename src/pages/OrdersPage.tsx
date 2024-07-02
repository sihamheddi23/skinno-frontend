import Sidebar from '../components/admin/Sidebar'
import Header from '../components/admin/Header'
import OrderManager from '../components/admin/Orders/OrderManager'
import { useAppSelector } from '../store'

function OrdersPage() {
  const themeState = useAppSelector((state) => state.theme)
  return (
    <div className="flex">
      <Sidebar />
      <div className={themeState.theme === "light" ? "flex flex-col flex-grow bg-slate-100" : "flex flex-col flex-grow text-white bg-gray-800"}>
        <Header />
        <OrderManager  />
      </div>
    </div>
  )
}

export default OrdersPage