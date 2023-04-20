import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
} from "react-router-dom";

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormContainer = styled.Form`
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

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Container>
      <FormContainer method="post">
        <TitleContainer>
          <Title>Green Works ERP</Title>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
        </TitleContainer>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Login"}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
