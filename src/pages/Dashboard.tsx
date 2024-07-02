import Sidebar from '../components/admin/Sidebar'
import Header from '../components/admin/Header'
import MainContent from '../components/admin/Dashboard/MainContent'

export default function Dashboard() {
  return (
     <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-slate-100">
        <Header />
        <MainContent />
      </div>
    </div>
  )
}
