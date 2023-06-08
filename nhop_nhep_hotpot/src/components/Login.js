import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import loginService from "../service/loginService";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import loginStyle from "../loginStyle.module.css";

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
        <section
            className={`${loginStyle.gradientForm}`}
            style={
                showFormEmail || showOtpModal || showFormResetPass
                    ? { opacity: "70%" }
                    : {}
            }
        >
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            validationSchema={Yup.object({
                password: Yup.string()
                    .required("Trường này bắt buộc nhập")
                    .min(5, "Tên phải chứa ít nhất 5 ký tự")
                    .max(20, "Tên không được vượt quá 20 ký tự"),
                username: Yup.string()
                    .required("Trường này bắt buộc nhập")
                    .matches(
                        "^[a-zA-Z0-9]*$",
                        "Tên đăng nhập không được chứa ký tự đặc biệt"
                    )
                    .min(5, "Tên phải chứa ít nhất 5 ký tự")
                    .max(20, "Tên không được vượt quá 20 ký tự"),
            })}
            onSubmit={(value) => {
                const login = async () => {
                    try {
                        const rs = await loginService.login(value);
                        console.log(rs)
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
                        document.getElementById("usernameError").innerText =
                            "";
                        document.getElementById("passwordError").innerText =
                            "";
                        navigate("/");
                    } catch (error) {
                        console.warn(error);
                    }
                };
                login();
            }}
        >
            <Form   style={{
                background:
                    'url("https://st4.depositphotos.com/1118354/19938/i/1600/depositphotos_199385050-stock-photo-background-bbq-cooking-tools-wood.jpg") top center / cover no-repeat',
            }}>
                <div className="container" >

                    <div className="row">
                        <div className="col-md-6 offset-md-3"
                        >
                            <h2 className="text-center text-dark mt-5">Lẩu Nướng Nhóp Nhép</h2>
                            <div className="card my-5">
                                <div className="card-body cardbody-color p-lg-5">
                                    <div className="text-center">
                                        <img alt="profile"
                                             className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                             src="https://www.cet.edu.vn/wp-content/uploads/2018/01/BBQ-la-gi.jpg"
                                             width="200px"/>
                                    </div>
                                    <div className="mb-3">
                                        <Field aria-describedby="emailHelp" className="form-control" name={'username'} id="username"
                                               placeholder="Tên tài khoản"
                                               type="text"/>
                                    </div>
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="text-danger"
                                    />
                                    <div className="mb-3">
                                        <Field className="form-control" id="password" name={'password'} placeholder="Mật khẩu" type="password"/>
                                    </div>
                                     <div className="position-relative">
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                    <div>
                            <span
                                className="text-danger"
                                id="passwordError"
                            ></span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <a
                                                href="#"
                                                onClick={handleShowFromEmail}
                                                className={`text-muted text-body ${loginStyle.bgForgotPassword}`}
                                            >
                                                Quên mật khẩu
                                            </a>
                                        </div>

                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-color px-5 mb-5 w-100" type="submit">Đăng nhập</button>
                                    </div>
                                    <div className="form-text text-center mb-5 text-dark" id="emailHelp">Chưa có tài khoản
                                        <Link to={"/register"} className="text-dark fw-bold"
                                           >
                                            Tạo tài khoản</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
        </section>
        {showFormEmail && (
            <Formik
                initialValues={{
                    email: "",
                }}
                onSubmit={(value, { setSubmitting }) => {
                    const sendEmail = async () => {
                        try {
                            const res = await loginService.forgotPassword(value);
                            setMail(res.data);
                            setShowFormEmail(false);
                            setShowOtpModal(true);
                            setSubmitting(false);
                            setCountdown(60);
                        } catch (error) {
                            setSubmitting(false);
                            if (error.response.data.email === "Không được để trống") {
                                document.getElementById("emailErr").innerHTML =
                                    "Không được để trống";
                            } else if (
                                error.response.data.email ===
                                "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com"
                            ) {
                                document.getElementById("emailErr").innerHTML =
                                    "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com";
                            } else if (
                                error.response.data.message === "Không tìm thấy email"
                            ) {
                                document.getElementById("emailErr").innerHTML =
                                    "Email xác nhận không chính xác";
                            } else {
                                document.getElementById("emailErr").innerHTML = "";
                            }
                        }
                    };
                    sendEmail();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="modal d-block" id="exampleModal" tabIndex={-1}>
                            <div className="modal-dialog">
                                <div className="modal-content" style={{ marginTop: 270 }}>
                                    <div className="modal-header">
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={handleHideEmail}
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <div>
                                            <label htmlFor="email" className="form-label fw-bold">
                                                Xác Nhận Email:
                                            </label>
                                        </div>
                                        <div>
                                            <Field
                                                className="form-control"
                                                name="email"
                                                id="email"
                                                placeholder="Nhập Email xác nhận..."
                                            />
                                        </div>
                                        <div>
                                            <span className="text-danger" id="emailErr"></span>
                                        </div>
                                        <div>
                                            <span className="text-danger" id="emailErr"></span>
                                        </div>
                                    </div>
                                    {isSubmitting ? (
                                        <div className="d-flex justify-content-end me-3 pb-2">
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="30"
                                                visible={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleHideEmail}
                                            >
                                                Hủy
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Xác nhận
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        )}

        {showOtpModal && (
            <Formik
                initialValues={{
                    code: "",
                    email: mail,
                }}
                onSubmit={(value) => {
                    const sendOtp = async () => {
                        try {
                            await loginService.checkOtp(value);
                            setShowOtpModal(false);
                            setShowFormResetPass(true);
                        } catch (error) {
                            console.log(error);
                            if (error.response.data.message === "Mã OTP không chính xác") {
                                document.getElementById("codeErr").innerHTML =
                                    "Mã OTP không chính xác hoặc đã hết hạn";
                            } else if (error.response.data.code === "Không được để trống") {
                                document.getElementById("codeErr").innerHTML =
                                    "Không được để trống";
                            } else if (
                                error.response.data.code ===
                                "Vui lòng nhập đúng định dạng OTP VD:XXXXXX (X là chữ số)"
                            ) {
                                document.getElementById("codeErr").innerHTML =
                                    "Vui lòng nhập đúng định dạng OTP VD:XXXXXX (X là chữ số)";
                            } else {
                                document.getElementById("codeErr").innerHTML = "";
                            }
                        }
                    };
                    sendOtp();
                }}
            >
                <Form>
                    <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div
                                className="modal-content"
                                style={{
                                    marginTop: 270,
                                }}
                            >
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleHideOtp}
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <label htmlFor="code" className="form-label fw-bold">
                                            Xác Nhận Mã OTP:
                                        </label>
                                    </div>
                                    <div>
                                        <Field
                                            className="form-control"
                                            name="code"
                                            placeholder="Nhập mã OTP....."
                                        />
                                    </div>
                                    {submit ? (
                                        <div className="mt-2 d-flex justify-content-end">
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="30"
                                                visible={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mt-2">
                                            <span className="text-danger" id="codeErr"></span>
                                            {countdown === 0 ? (
                                                // eslint-disable-next-line react/jsx-no-comment-textnodes
                                                <div className="mt-2">
                                                    // eslint-disable-next-line
                                                    jsx-a11y/anchor-is-valid, jsx-a11y/anchor-is-valid
                                                    <a
                                                        className="float-end text-black text-decoration-none  bg-forgot-password"
                                                        onClick={handleAgainSendCode}
                                                    >
                                                        Gửi lại mã
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                            <span className="float-end text-muted">
                              {" "}
                                ({countdown}) Gửi lại mã
                            </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleHideOtp}
                                    >
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        )}

        {showFormResetPass && (
            <Formik
                initialValues={{
                    newPassword: "",
                    confirmPassword: "",
                    email: mail,
                }}
                onSubmit={(value) => {
                    const resetPassword = async () => {
                        try {
                            await loginService.resetPassword(value);
                            setShowFormResetPass(false);
                            Swal.fire({
                                icon: "success",
                                title: "Thay đổi mật khẩu thành công",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        } catch (error) {
                            const err = error.response.data;
                            if (err.newPassword === "Không được bỏ trống") {
                                document.getElementById("newPasswordErr").innerHTML =
                                    "Không được bỏ trống";
                            } else if (
                                err.newPassword ===
                                "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                            ) {
                                document.getElementById("newPasswordErr").innerHTML =
                                    "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự";
                            } else {
                                document.getElementById("newPasswordErr").innerHTML = "";
                            }
                            if (err.message === "Mật khẩu xác nhận không trùng khớp") {
                                document.getElementById("confirmPasswordErr").innerHTML =
                                    "Mật khẩu xác nhận không trùng khớp";
                            } else if (err.confirmPassword === "Không được bỏ trống") {
                                document.getElementById("confirmPasswordErr").innerHTML =
                                    "Không được bỏ trống";
                            } else if (
                                err.confirmPassword ===
                                "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                            ) {
                                document.getElementById("confirmPasswordErr").innerHTML =
                                    "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự";
                            } else {
                                document.getElementById("confirmPasswordErr").innerHTML = "";
                            }
                        }
                    };
                    resetPassword();
                }}
            >
                <Form>
                    <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog">
                            <div
                                className="modal-content"
                                style={{
                                    marginTop: 270,
                                }}
                            >
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleHideResetPass}
                                        aria-label="Close"
                                    />
                                </div>

                                <div className="modal-body">
                                    <div className="mt-2">
                                        <label
                                            htmlFor="newPassword"
                                            className="fw-bold form-label"
                                        >
                                            Mật khẩu mới:
                                        </label>
                                    </div>
                                    <div className="position-relative">
                                        <Field
                                            type={showNewPassword ? "text" : "password"}
                                            id="newPassword"
                                            className="form-control"
                                            name="newPassword"
                                            placeholder="Nhập mật khẩu mới"
                                        />
                                        {showNewPassword ? (
                                            <i
                                                type="button"
                                                onClick={() => {
                                                    setShowNewPassword(!showNewPassword);
                                                }}
                                                className={`bi bi-eye-slash-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                            ></i>
                                        ) : (
                                            <i
                                                type="button"
                                                onClick={() => {
                                                    setShowNewPassword(!showNewPassword);
                                                }}
                                                className={`bi bi-eye-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                            ></i>
                                        )}
                                    </div>
                                    <span className="text-danger" id="newPasswordErr"></span>
                                    <div>
                                        <span className="text-danger" id="newPasswordErr"></span>
                                    </div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="fw-bold form-label"
                                        >
                                            Xác nhận mật khẩu:
                                        </label>
                                    </div>
                                    <div className="position-relative">
                                        <Field
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            className="form-control"
                                            name="confirmPassword"
                                            placeholder="Xác nhận mật khẩu mới"
                                        />
                                        {showConfirmPassword ? (
                                            <i
                                                type="button"
                                                onClick={() => {
                                                    setShowConfirmPassword(!showConfirmPassword);
                                                }}
                                                className={`bi bi-eye-slash-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                            ></i>
                                        ) : (
                                            <i
                                                type="button"
                                                onClick={() => {
                                                    setShowConfirmPassword(!showConfirmPassword);
                                                }}
                                                className={`bi bi-eye-fill me-2 position-absolute top-50 translate-middle-y end-0`}
                                            ></i>
                                        )}
                                    </div>
                                    <div>
                      <span
                          className="text-danger"
                          id="confirmPasswordErr"
                      ></span>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleHideResetPass}
                                        >
                                            Hủy
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        )}
    </>
);
}

export default Login;