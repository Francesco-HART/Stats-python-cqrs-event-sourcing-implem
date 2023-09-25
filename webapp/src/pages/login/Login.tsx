import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../service/create-store.ts";
import {
  selectAuthCompanyIsLoading,
  selectAuthCompanyIsLogged,
} from "../../service/auth/reducer.ts";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/auth/usecases/auth.usecase.ts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector(selectAuthCompanyIsLoading);
  const isLogged = useSelector(selectAuthCompanyIsLogged);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const isError = email === "";

  return (
    <Grid
      h="100vh"
      w="100%"
      gap={4}
      templateColumns="repeat(12, 1fr)"
      flex={"row"}
      alignItems={"center"}
    >
      <GridItem colSpan={6} colStart={4}>
        <FormControl isInvalid={isError}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
          {!isError ? null : (
            <FormErrorMessage>L'adresse E-mail est requise.</FormErrorMessage>
          )}
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isError ? null : (
            <FormErrorMessage>Le mot de pass est requis.</FormErrorMessage>
          )}
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Connecter
          </Button>
        </FormControl>
      </GridItem>
    </Grid>
  );
};

export default Login;
