import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../stores/slices/user.slice";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import bg_login from "../../../assets/bg_login.png";
import "./login.scss";

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const schema = yup
  .object({
    email: yup
      .string()
      .required("Vui lòng nhập đúng Email!")
      .matches(emailRegex),
    password: yup
      .string()
      .min(5, "Mật khẩu phải ít nhất 5 kí tự!")
      .required("Password is required"),
  })
  .required();

export default function Login() {
  const userInfo = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  if (userInfo.data) {
    navigate(`/`);
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  const onFinish = (values) => {
    dispatch(loginAction(values));
  };

  return (
    <>
      <div className="login-page">
        
        <div className="img">
          <img src={bg_login} alt="Login" width="400" />
        </div>
        <div className='form__login'>
                <h2> Login </h2>
                <Form
                    className='form'
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={handleSubmit(onFinish, (err) => console.log(errors))}
                    onFinishFailed={() => { }}
                    autoComplete="off"
                >
                    <Controller
                        control={control}
                        name='email'
                        render={({ field: { onChange, value, name, ref } }) => (
                            <Form.Item
                                validateStatus={errors.email && "error"}
                                help={errors?.email?.message}
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: '400px' }}
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    placeholder="Email"
                                    ref={ref}
                                />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange, value, name, ref } }) => (
                            <Form.Item
                                validateStatus={errors.password && "error"}
                                help={errors?.password?.message}
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    style={{ width: '400px' }}
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    placeholder="Password"
                                    ref={ref}
                                />
                            </Form.Item>
                        )}
                    />

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                        
                    </Form.Item>
                </Form>
                <span className='link__register'>
                    Click here to create an account!
                    <span className='modal__register'>
                        <NavLink to={'/register'}>
                            Register
                        </NavLink>
                    </span>
                </span>

            </div >
        </div>
    </>
  );
}
