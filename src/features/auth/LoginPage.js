import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useActionData,
  useSearchParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { login } from "../store/slices/auth";
import { clearMessage } from "../../store/slices/message";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  width: 300px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  margin: 0.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const LoginPage = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // console.log('The email is ' + event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // console.log('This is the password ' + event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Form method="post" onSubmit={handleLogin}>
        <TitleContainer>
          <Title>Green Works ERP</Title>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </TitleContainer>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleEmailChange}
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          required
        />
        <Button disabled={loading} type="submit">
          {loading ? "Loading" : "Login"}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
