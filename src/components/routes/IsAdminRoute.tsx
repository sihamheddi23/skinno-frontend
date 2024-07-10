import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store'

function IsAdminRoute() {
   const { user: { role } } = useAppSelector((state) => state.user)
  return (
        role == "admin" ? <Outlet /> : <Navigate to={'/'} />
  )
}

export default IsAdminRoute