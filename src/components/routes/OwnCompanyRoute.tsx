import { useAppSelector } from '../../store'
import { Navigate, Outlet } from 'react-router-dom'

function OwnCompanyRoute() {
    const { user : { company} } = useAppSelector((state) => state.user)
  return (
    company? <Outlet/> : <Navigate to={'/dashboard/about-company'} />
  )
}

export default OwnCompanyRoute