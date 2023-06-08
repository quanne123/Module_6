import { useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {useIsActive} from "../config/isAction";
import {useDispatch, useSelector} from "react-redux";
import {showUserDetailAction} from "../redux/action/UserDetail/userDetailAction";

export default function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        navigate("/login");
    };
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const userDetail = useSelector((state) => state.userDetail);
    const cartDetails = useSelector((state) => state.cartDetails);
    useEffect(()=>{
        dispatch(showUserDetailAction())
    },[dispatch])

    return (
        <>
            <div className="hero_area">
                <div className="bg-box">
                    <img src="https://images.pexels.com/photos/3997609/pexels-photo-3997609.jpeg?cs=srgb&dl=pexels-gonzalo-guzman-3997609.jpg&fm=jpg" alt="" />
                </div>
                <header className="header_section">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <a className="navbar-brand" href="public/index.html">
                                <span style={{ color: "white" }}>Lẩu Nướng Nhóp Nhép</span>
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className=""> </span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav  mx-auto ">
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link" >
                                            Trang chủ <span className="sr-only"></span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">
                                            Thực đơn
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link  to={'/cart'} className="nav-link">
                                            <i className="bi bi-cart"></i>
                                            <span className="cart-badge">{cartDetails.length}</span>
                                        </Link>
                                    </li>

                                </ul>
                                <div className="user_option">
                                    {
                                        token===null ? <a href="" className="user_link">
                                            <NavLink to={'/login'} className="bi bi-person-fill " aria-hidden="true" />
                                        </a> :
                                            <div className="dropdown nav-item">
                                                <a
                                                    className="dropdown-toggle fs-5 text-center"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    style={{ textDecoration: "none", width: "100px" }}
                                                >
                                                    <img
                                                        src={userDetail?.avatar}
                                                        className="rounded-circle"
                                                        width="40%"
                                                        height="40px"
                                                        alt="avatar"
                                                    />
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <Link to={"/cart-detail"} className="dropdown-item">
                                                            Đơn đã mua
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li>
                                                        <Link to={'/profile'} className="dropdown-item">
                                                            Thông tin cá nhân
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li>
                                                        <a onClick={handleLogout} className="dropdown-item" href="#">
                                                            Đăng xuất
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                    }

                                    <a className="cart_link" href="#">
                                        <svg
                                            version="1.1"
                                            id="Capa_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 456.029 456.029"
                                            style={{ enableBackground: "new 0 0 456.029 456.029" }}
                                            xmlSpace="preserve"
                                        ></svg>
                                    </a>
                                    <form className="form-inline">
                                        <button
                                            className="btn  my-2 my-sm-0 nav_search-btn"
                                            type="submit"
                                        >
                                            <i className="fa fa-search" aria-hidden="true" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                <section className="slider_section ">
                    <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>Lẩu Nướng Nhóp Nhép</h1>
                                                <p style={{ color: "white", fontFamily: "Arial, sans-serif", fontSize: "1.2rem",fontWeight: "bold" }}>
                                                    Món ăn như thế nào là món ăn ngon? Có người nghĩ, một món ăn
                                                    ngon đầu tiên là phải đẹp, chỉ khi đẹp mới cảm thấy thích,
                                                    mới có ham muốn ăn món ăn đó. Nhưng với người khác, một món
                                                    ăn ngon là ở tấm lòng người nấu ăn và cả cách người dùng
                                                    thưởng thức nó. Tình cảm yêu thương đặt vào món ăn như một
                                                    gia vị giúp món ăn thêm đậm đà. Vì thế, khi biết trân trọng
                                                    công sức người nấu ăn, chúng ta sẽ thấy ngon miệng hơn. "Lời
                                                    nói chẳng mất tiền mua", vậy tại sao chúng ta không dành một
                                                    lời kích lệ cho người nấu ăn để họ vui hơn và dốc sức nấu ăn
                                                    ngon hơn phải không?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end slider section */}
            </div>
        </>

    );
}
