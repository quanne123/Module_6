// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React, { useEffect } from "react";
// import { Oval } from "react-loader-spinner";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import * as Yup from "yup";
// import {showUserDetailAction} from "../redux/action/UserDetail/userDetailAction";
// import userService from "../service/userService";
//
//
// function UserProfileEdit() {
//     const {
//         url: avatar,
//         onUpload,
//         setUrl: setAvatar,
//         progressPercent,
//     } = useUpload();
//
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const userDetail = useSelector((state) => state.userDetail);
//     const getMinDate = () => {
//         const today = new Date();
//         return new Date(
//             today.getFullYear() - 16,
//             today.getMonth(),
//             today.getDate()
//         );
//     };
//
//     useEffect(() => {
//         dispatch(showUserDetailAction());
//         setAvatar(userDetail.avatar);
//     }, [dispatch, setAvatar, userDetail.avatar]);
//
//     useEffect(() => {
//         document.title = "Chỉnh sửa thông tin cá nhân";
//     }, []);
//
//     return (
//         <div>
//             <div className="row mx-0 p-5">
//                 <div className="container p-5 shadow-cosmetics-1 ">
//                     <div className="row">
//                         <div className="col-3 mt-3">
//                             <div className="d-flex flex-column align-items-center">
//                                 <img
//                                     src={avatar}
//                                     className="border-avatar rounded-circle"
//                                     width="80%"
//                                     height="252px"
//                                     alt="avatar"
//                                 />
//                                 {progressPercent === 100 ? (
//                                     <Oval
//                                         height={80}
//                                         width={80}
//                                         color="#4fa94d"
//                                         wrapperStyle={{}}
//                                         wrapperClassName=""
//                                         visible={true}
//                                         ariaLabel="oval-loading"
//                                         secondaryColor="#4fa94d"
//                                         strokeWidth={2}
//                                         strokeWidthSecondary={2}
//                                     />
//                                 ) : (
//                                     <>
//                                         <label
//                                             htmlFor="avatar"
//                                             className="avatar mt-3 p-1"
//                                             style={{ height: "50px" }}
//                                         >
//                                             <i className="bi bi-images fs-4"></i> Thay đổi avatar
//                                         </label>
//                                         <input
//                                             type="file"
//                                             className="d-none"
//                                             onChange={(e) => onUpload(e.target.files[0])}
//                                             id="avatar"
//                                         />
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="col-9">
//                             <Formik
//                                 enableReinitialize={true}
//                                 initialValues={{
//                                     name: userDetail?.name,
//                                     email: userDetail?.email,
//                                     gender: userDetail?.gender.toString(),
//                                     dateOfBirth: userDetail?.dateOfBirth,
//                                     address: userDetail?.address,
//                                     phoneNumber: userDetail?.phoneNumber,
//                                     avatar: userDetail?.avatar,
//                                 }}
//                                 validationSchema={Yup.object({
//                                     name: Yup.string()
//                                         .required("Trường này bắt buộc nhập")
//                                         .matches(
//                                             "^[A-Z][a-z]+(\\s[A-Z][a-z]+)*$",
//                                             "Tên không được chứa số. Và các kí tự đầu tiên của mỗi từ phải viết hoa"
//                                         ),
//                                     email: Yup.string()
//                                         .required("Trường này bắt buộc nhập")
//                                         .email("Sai format email"),
//                                     phoneNumber: Yup.string()
//                                         .required("Trường này bắt buộc nhập")
//                                         .matches(
//                                             "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$",
//                                             "Số điện thoại phải đúng định dạng 09xxxxxxxx hoặc 09xxxxxxxx hoặc (84)+9xxxxxxxx hoặc (84)+9xxxxxxxx."
//                                         ),
//                                     address: Yup.string().required("Trường này bắt buộc nhập"),
//                                     dateOfBirth: Yup.date()
//                                         .required("Trường này bắt buộc nhập")
//                                         .max(getMinDate(), "Bạn phải từ 16 tuổi trở lên"),
//                                 })}
//                                 onSubmit={(values) => {
//                                     const register = async () => {
//                                         try {
//                                             const newValues = { ...values, avatar };
//                                             await userService.updateUserDetail(newValues);
//                                             Swal.fire({
//                                                 icon: "success",
//                                                 title: "Chỉnh sửa thông tin cá nhân thành công",
//                                                 showConfirmButton: false,
//                                                 timer: 1500,
//                                             });
//                                             document.getElementById("email-err").innerText = "";
//                                             navigate("/profile");
//                                         } catch (error) {
//                                             console.warn(error);
//                                             const err = error.response?.data;
//                                             if (err === "Email đã tồn tại!") {
//                                                 document.getElementById("email-err").innerText =
//                                                     "Email đã tồn tại!";
//                                             }
//                                         }
//                                     };
//                                     register();
//                                 }}
//                             >
//                                 <Form>
//                                     <div className="row ms-3 px-3">
//                                         <h2 className="text-center text-dieucosmetics">
//                                             SỬA THÔNG TIN CÁ NHÂN
//                                         </h2>
//                                         <div className="col-6 px-0">
//                                             <table className="fs-5 font-table text-secondary">
//                                                 <thead>
//                                                 <tr>
//                                                     <th className="th-dieucosmetics">Họ và tên :</th>
//                                                     <td>
//                                                         <Field
//                                                             type="text"
//                                                             id="name"
//                                                             name="name"
//                                                             className="form-control"
//                                                         />
//                                                         <ErrorMessage
//                                                             name="name"
//                                                             component="div"
//                                                             className="text-danger fs-6"
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                 <tr>
//                                                     <th className="th-dieucosmetics">Giới tính :</th>
//                                                     <td>
//                                                         <div className="form-check form-check-inline">
//                                                             <Field
//                                                                 className="form-check-input"
//                                                                 type="radio"
//                                                                 name="gender"
//                                                                 id="female"
//                                                                 value={"true"}
//                                                             />
//                                                             <label
//                                                                 className="form-check-label fs-6"
//                                                                 htmlFor="female"
//                                                             >
//                                                                 Nữ
//                                                             </label>
//                                                         </div>
//                                                         <div className="form-check form-check-inline">
//                                                             <Field
//                                                                 className="form-check-input"
//                                                                 type="radio"
//                                                                 name="gender"
//                                                                 id="male"
//                                                                 value={"false"}
//                                                             />
//                                                             <label
//                                                                 className="form-check-label fs-6"
//                                                                 htmlFor="male"
//                                                             >
//                                                                 Nam
//                                                             </label>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th className="th-dieucosmetics">Ngày sinh :</th>
//                                                     <td>
//                                                         <Field
//                                                             type="date"
//                                                             name="dateOfBirth"
//                                                             id="dateOfBirth"
//                                                             className="form-control"
//                                                         />
//                                                         <ErrorMessage
//                                                             name="dateOfBirth"
//                                                             component="div"
//                                                             className="text-danger fs-6"
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th
//                                                         className="th-dieucosmetics"
//                                                         style={{ width: "220px" }}
//                                                     >
//                                                         Email :
//                                                     </th>
//                                                     <td className="w-50">
//                                                         <Field
//                                                             type="text"
//                                                             id="email"
//                                                             name="email"
//                                                             className="form-control"
//                                                         />
//                                                         <ErrorMessage
//                                                             name="email"
//                                                             component="div"
//                                                             className="text-danger fs-6"
//                                                         />
//                                                         <span
//                                                             id="email-err"
//                                                             className="text-danger"
//                                                         ></span>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th className="th-dieucosmetics">Số điện thoại:</th>
//                                                     <td>
//                                                         <Field
//                                                             type="text"
//                                                             name="phoneNumber"
//                                                             id="phoneNumber"
//                                                             className="form-control"
//                                                         />
//                                                         <ErrorMessage
//                                                             name="phoneNumber"
//                                                             component="div"
//                                                             className="text-danger fs-6"
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         <div className="col-6">
//                                             <table className="fs-5 font-table text-secondary">
//                                                 <thead>
//                                                 <tr>
//                                                     <th
//                                                         className="th-dieucosmetics"
//                                                         style={{ width: "50%" }}
//                                                     >
//                                                         Địa chỉ :
//                                                     </th>
//                                                     <td>
//                                                         <Field
//                                                             as="textarea"
//                                                             id="address"
//                                                             name="address"
//                                                             className="form-control"
//                                                         ></Field>
//                                                         <ErrorMessage
//                                                             name="address"
//                                                             component="div"
//                                                             className="text-danger fs-6"
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                 <tr>
//                                                     <th className="th-dieucosmetics"></th>
//
//                                                     <td>
//                                                         <button
//                                                             type="submit"
//                                                             className="btn btn-outline-primary mt-4"
//                                                         >
//                                                             Lưu thông tin
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </Form>
//                             </Formik>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default UserProfileEdit;
