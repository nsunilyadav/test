import React, { useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { login } from "../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState("");

  const onInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const user = await login(formData);
      Cookies.set("token", user.token);
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            onInputChange(e, "email");
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            onInputChange(e, "password");
          }}
        />
      </Form.Group>

      {error}
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? "Loading…" : "Submit"}
      </Button>
    </Form>
  );
};

export default Login;
