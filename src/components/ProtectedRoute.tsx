import React, {useEffect} from "react";
import {useRecoilState} from "recoil";
import {currentCompanyState} from "../state/companyState";
import {useNavigate} from "react-router";
import {AuthService} from "../service/auth";
import {UnauthorizedError} from "../util/http";
import {toast} from "react-toastify";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const [currentCompany, setCurrentCompany] = useRecoilState(currentCompanyState);

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentCompany) {
            AuthService.current().then(response => {
                if (response) {
                    setCurrentCompany(response.company);
                }
            }).catch(error => {
                if (error instanceof UnauthorizedError) {
                    toast.error("로그인 후 이용 가능한 페이지 입니다.", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        theme: "dark",
                    })
                    navigate("/login");
                    return;
                }

                console.error("현재 회사 정보를 가져오는 데 실패했습니다:", error.message);
                navigate("/");
            });
        }
    }, []);
    return <>{children}</>;
};

export default ProtectedRoute;
