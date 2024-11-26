import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/Auth";
import "./Root.css";

export default () => {
    return (
        <div className="root">
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        </div>
    );
}