import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthCompanyIsLogged } from "../service/auth/reducer";
import { AppDispatch } from "../service/create-store";
import routesNames from "../navigation/routes";
import { getAuth } from "../service/auth/usecases/auth.usecase.ts";

const ProtectedAdminView = ({
  component,
}: {
  component: React.ReactElement;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isCompanyAuthenticated = useSelector(selectAuthCompanyIsLogged);

  const verifyCurrentCompanyAuthenticated = async (): Promise<void> => {
    try {
      const auth = await dispatch(getAuth()).unwrap();
      if (auth && auth.role === "admin") return;
    } catch (err: any) {}
    navigate("/");
  };

  useEffect(() => {
    verifyCurrentCompanyAuthenticated();
  }, [isCompanyAuthenticated, navigate]);
  return component;
};

export { ProtectedAdminView };
