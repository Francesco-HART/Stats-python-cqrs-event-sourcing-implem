import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthCompanyIsLogged } from "../service/auth/reducer";
import { AppDispatch } from "../service/create-store";
import routesNames from "../navigation/routes";
import {getAuth} from "../service/auth/usecases/auth.usecase.ts";

const ProtectedViewCompany = ({
  component,
}: {
  component: React.ReactElement;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isCompanyAuthenticated = useSelector(selectAuthCompanyIsLogged);

  const verifyCurrentCompanyAuthenticated = async (): Promise<void> => {
    try {
      const company = await dispatch(getAuth()).unwrap();
      if (company) return;
    } catch (err: any) {}
    navigate(routesNames.LOGIN);
  };

  useEffect(() => {
    verifyCurrentCompanyAuthenticated();
  }, [isCompanyAuthenticated, navigate]);
  return component;
};

export { ProtectedViewCompany };
