import {useLocation, Navigate, Outlet} from "react-router-dom"

const RequireAuth = ({allowedRole}) => {
    const location = useLocation();

    return localStorage.getItem("token") ? (
        <Outlet />

    ):(
        <Navigate to="/" state={{from: location}} reolace />

    );
};  

export default RequireAuth;