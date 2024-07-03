import { useAppSelector } from '../../store'
import { Navigate, Outlet } from 'react-router-dom'

function IsAuthRoute() {
    const { user } = useAppSelector((state) => state.user)
  return (
    user? <Outlet/> : <Navigate to={'/login'} />
  )
}

export default IsAuthRoute