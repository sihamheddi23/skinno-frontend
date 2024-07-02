import Sidebar from '../components/admin/Sidebar'
import Header from '../components/admin/Header'
import MainContent from '../components/admin/Dashboard/MainContent'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../store'

export default function Dashboard() {
  const themeState = useAppSelector((state) => state.theme)
  return (
     <div className="flex">
      <Sidebar />
      <div className={themeState.theme === "light" ? "flex flex-col flex-grow bg-slate-100" : "flex flex-col flex-grow text-white bg-gray-800"}>
        <Header />
        <MainContent />
      </div>
    </div>
  )
}
