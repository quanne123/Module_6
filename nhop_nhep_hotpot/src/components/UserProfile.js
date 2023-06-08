import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import loginService from "../service/loginService";
import {showUserDetailAction} from "../redux/action/UserDetail/userDetailAction";

function UserProfile() {
    // const [showOldPassword, setShowOldPassword] = useState(false);
    // const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showFormChangePassword, setShowFormChangePassword] = useState(false);

    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userDetail);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(showUserDetailAction());
    }, [dispatch]);

    useEffect(() => {
        document.title = "Thông tin cá nhân";
    }, []);

    if (Object.keys(userDetail).length === 0) {
        return null;
    }

    return (
        <>
            <div>
                <div className="row mx-0 p-5">
                    <div className="container p-5 shadow-cosmetics-1 ">
                        <div className="row">
                            <div className="col-3 mt-3">
                                <div className="d-flex flex-column align-items-center">
                                    <img
                                        src={userDetail?.avatar}
                                        className="border-avatar rounded-circle"
                                        width="80%"
                                        height="252px"
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="row ms-3 px-3">
                                    <h2 className="text-center text-dieucosmetics">
                                        THÔNG TIN CÁ NHÂN
                                    </h2>
                                    <div className="col-6 px-0">
                                        <table className="fs-5 font-table text-secondary">
                                            <thead>
                                            <tr>
                                                <th className="th-dieucosmetics">Họ và tên :</th>
                                                <td>{userDetail?.name}</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th className="th-dieucosmetics">Giới tính :</th>
                                                <td>{userDetail?.gender === false ? "Nam" : "Nữ"}</td>
                                            </tr>
                                            <tr>
                                                <th className="th-dieucosmetics">Ngày sinh :</th>
                                                <td>
                                                    {format(
                                                        new Date(userDetail?.dateOfBirth),
                                                        "dd/MM/yyyy"
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th
                                                    className="th-dieucosmetics"
                                                    style={{width: "220px"}}
                                                >
                                                    Email :
                                                </th>
                                                <td className="w-50">{userDetail?.email}</td>
                                            </tr>
                                            <tr>
                                                <th className="th-dieucosmetics">Số điện thoại :</th>
                                                <td>{userDetail?.phoneNumber}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-6">
                                        <Formik
                                            initialValues={{
                                                oldPassword: "",
                                                newPassword: "",
                                                confirmPassword: "",
                                            }}
                                            validationSchema={Yup.object({
                                                oldPassword: Yup.string()
                                                    .required("Trường này bắt buộc nhập")
                                                    .min(5, "Tên phải chứa ít nhất 5 ký tự")
                                                    .max(20, "Tên không được vượt quá 20 ký tự"),
                                                newPassword: Yup.string()
                                                    .required("Trường này bắt buộc nhập")
                                                    .min(5, "Tên phải chứa ít nhất 5 ký tự")
                                                    .max(20, "Tên không được vượt quá 20 ký tự"),
                                                confirmPassword: Yup.string()
                                                    .required("Trường này bắt buộc nhập")
                                                    .min(5, "Tên phải chứa ít nhất 5 ký tự")
                                                    .max(20, "Tên không được vượt quá 20 ký tự"),
                                            })}
                                            onSubmit={(value) => {
                                                const changePassword = async () => {
                                                    try {
                                                        await loginService.changePassword(value);
                                                        localStorage.removeItem("token");
                                                        Swal.fire({
                                                            icon: "success",
                                                            title:
                                                                "Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại",
                                                            showConfirmButton: false,
                                                            timer: 1500,
                                                        });
                                                        document.getElementById(
                                                            "oldPasswordErr"
                                                        ).innerHTML = "";
                                                        document.getElementById(
                                                            "newPasswordErr"
                                                        ).innerHTML = "";
                                                        document.getElementById(
                                                            "confirmPasswordErr"
                                                        ).innerHTML = "";
                                                        navigate("/login");
                                                    } catch (error) {
                                                        const err = error.response.data;
                                                        console.log(err);
                                                        if (
                                                            err.message === "Mật khẩu hiện tại không đúng"
                                                        ) {
                                                            document.getElementById(
                                                                "oldPasswordErr"
                                                            ).innerHTML = "Mật khẩu hiện tại không đúng";
                                                        }

                                                        if (
                                                            err.message ===
                                                            "Mật khẩu mới không được trùng với mật khẩu cũ"
                                                        ) {
                                                            document.getElementById(
                                                                "newPasswordErr"
                                                            ).innerHTML =
                                                                "Mật khẩu mới không được trùng với mật khẩu cũ";
                                                        }

                                                        if (
                                                            err.message ===
                                                            "Mật khẩu xác nhận không trùng khớp"
                                                        ) {
                                                            document.getElementById(
                                                                "confirmPasswordErr"
                                                            ).innerHTML =
                                                                "Mật khẩu xác nhận không trùng khớp";
                                                        }
                                                    }
                                                };
                                                changePassword();
                                            }}
                                        >
                                            <Form>
                                                <table className="fs-5 font-table text-secondary">
                                                    <thead>
                                                    <tr>
                                                        <th
                                                            className="th-dieucosmetics"
                                                            style={{ width: "50%" }}
                                                        >
                                                            Địa chỉ :
                                                        </th>
                                                        <td>{userDetail?.address}</td>
                                                    </tr>
                                                    </thead>
                                                </table>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;
