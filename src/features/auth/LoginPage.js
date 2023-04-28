import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useActionData,
  useSearchParams,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { Spinner } from "../../components/Spinner";
import {loginUser} from './authSlice';
import { clearMessage } from "../messages/messageSlice";

import {
  Container,
  Form,
  Input,
  Button,
  TitleContainer,
  Title,
} from "./LoginPage.style";

const LoginPage = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRequestStatus, setLoginRequestStatus] = useState("idle");

  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  // const canLogin =
  //   [email, password].every(Boolean) && loginRequestStatus === "idle";
  const canLogin = Boolean(email) && Boolean(password) && loginRequestStatus === 'idle'

  const handleLogin = async (event) => {
    event.preventDefault();
    if (canLogin) {
      try {
        setLoginRequestStatus('pending');
        await dispatch(loginUser({ email, password }))
          .unwrap()
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (error) {
        console.error('Failed to login user ', error);
      } finally {
        setLoginRequestStatus('idle');
      }
    }
  };

  // Activate Spinner
  const spinner = loginRequestStatus === 'pending' ? <Spinner size="30px" /> : null

  return (
    <Container>
      <Form method="post" onSubmit={handleLogin}>
        <TitleContainer>
          <Title>Green Works ERP</Title>
          {error && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
        </TitleContainer>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={onEmailChange}
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={onPasswordChange}
          required
        />
        <Button disabled={loginRequestStatus === "pending"} type="submit">
          {loginRequestStatus === "pending" ? "Loading" : "Login"}
        </Button>
        {spinner}
      </Form>
    </Container>
  );
};

export default LoginPage;
