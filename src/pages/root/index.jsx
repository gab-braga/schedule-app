import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/auth";
import "./style.css";

export default () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
}