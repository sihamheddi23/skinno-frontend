import { useAppSelector } from '../../store'
import { Navigate, Outlet } from 'react-router-dom'

function IsNotAuthRoute() {
const { user } = useAppSelector((state) => state.user)
  return (
    user? user.role === "admin"? <Navigate to={'/dashboard'} />: <Navigate to={'/'} /> : <Outlet/> 
  )

}

export default IsNotAuthRoute