import React, { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/app/store";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    const { token, user } = useSelector((state: RootState) => state.auth);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (!token || !user || user?.role !== "ADMIN") {
                navigate("/login");
            } else {
                setChecked(true);
            }
        };

        checkAuth();
    }, [token, user, navigate]);

    if (!checked) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin" size={32} />
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
