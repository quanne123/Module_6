import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import loginService from "../service/loginService";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { RotatingLines } from "react-loader-spinner";
import {Swal} from "sweetalert2";
import * as Yup from "yup";

function Login() {
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [showFormResetPass, setShowFormResetPass] = useState(false);
    const [showFormEmail, setShowFormEmail] = useState(false);
    const [mail, setMail] = useState("");
    const [submit, setSubmit] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate()
    useEffect(()=> {
        document.title = "Đăng nhập";
    }, []);

    const handleShowFromEmail = () => {
        setShowFormEmail(true);
    };
    const handleHideEmail = () => {
        setShowFormEmail(false);
    };

    const handleHideOtp = () => {
        setShowOtpModal(false);
    };

    const handleHideResetPass = () => {
        setShowFormResetPass(false);
    };

    const handleAgainSendCode = async () => {
        setSubmit(true);
        try {
            await loginService.forgotPassword({ email: mail });
            setSubmit(false);
            setCountdown(60);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown((countdown) => countdown - 1);
        }, 1000);
        if (countdown === 0) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [countdown]);
return (
    <>
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            // validationSchema={Yup.object({
            //     password: Yup.string()
            //         .required("Trường này bắt buộc nhập")
            //         .min(5, "Tên phải chứa ít nhất 5 ký tự")
            //         .max(20, "Tên không được vượt quá 20 ký tự"),
            //     username: Yup.string()
            //         .required("Trường này bắt buộc nhập")
            //         .matches(
            //             "^[a-zA-Z0-9]*$",
            //             "Tên đăng nhập không được chứa ký tự đặc biệt"
            //         )
            //         .min(5, "Tên phải chứa ít nhất 5 ký tự")
            //         .max(20, "Tên không được vượt quá 20 ký tự"),
            // })}
            onSubmit={(value) => {
                const login = async () => {
                    try {
                        const rs = await loginService.login(value);
                        navigate("/");
                        localStorage.setItem("token", rs.data.token);
                        localStorage.setItem("name", rs.data.name);
                        localStorage.setItem(
                            "roles",
                            rs.data.roles[0].authority
                        );
                        Swal.fire({
                            icon: "success",
                            title: "Đăng nhập thành công",
                            showConfirmButton: false,
                            timer: 1500,
                        });


                    } catch (error) {
                        console.log(error);
                    //     const err = error.response.data;
                    //     if (
                    //         err.message === "Tên người dùng không tồn tại"
                    //     ) {
                    //         document.getElementById(
                    //             "usernameError"
                    //         ).innerText = "Tên người dùng không tồn tại";
                    //     }
                    //     if (err === "" || err.status === 403) {
                    //         document.getElementById(
                    //             "passwordError"
                    //         ).innerText = "Mật khẩu không chính xác";
                    //     }
                    }
                };
                login();
            }}
        >
            <Form>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h2 className="text-center text-dark mt-5">Lẩu Nướng Nhóp Nhép</h2>
                            <div className="text-center mb-5 text-dark">Đăng Nhập</div>
                            <div className="card my-5">
                                <div className="card-body cardbody-color p-lg-5">
                                    <div className="text-center">
                                        <img alt="profile"
                                             className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                             src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                                             width="200px"/>
                                    </div>
                                    <div className="mb-3">
                                        <Field aria-describedby="emailHelp" className="form-control" name={'username'} id="username"
                                               placeholder="Tên tài khoản"
                                               type="text"/>
                                    </div>
                                    <div className="mb-3">
                                        <Field className="form-control" id="password" name={'password'} placeholder="Mật khẩu" type="password"/>
                                    </div>

                                    <div className="text-center">
                                        <button className="btn btn-color px-5 mb-5 w-100" type="submit">Đăng nhập</button>
                                    </div>
                                    <div className="form-text text-center mb-5 text-dark" id="emailHelp">Chưa có tài khoản
                                        <a className="text-dark fw-bold"
                                           href="#">
                                            Tạo tài khoản</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>

    </>
);
}

export default Login;