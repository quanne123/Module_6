import {useNavigate} from "react-router";
import {useState} from "react";
import {NavLink} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        navigate("/login");
    };

    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    const [foodFilter, setFoodFilter] = useState({
        page: 0,
        name: "",
    });

    return (
        <>
            <div className="hero_area">
                <div className="bg-box">
                    <img src="https://images.pexels.com/photos/3997609/pexels-photo-3997609.jpeg?cs=srgb&dl=pexels-gonzalo-guzman-3997609.jpg&fm=jpg" alt="" />
                </div>
                {/* header section strats */}
                <header className="header_section">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <a className="navbar-brand" href="public/index.html">
                                <span style={{ color: "#d39e00" }}>Lẩu Nướng Nhóp Nhép</span>
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
                                    <li className="nav-item active">
                                        <a className="nav-link" href="Home.html">
                                            Trang chủ <span className="sr-only"></span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="">
                                            Thực đơn
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="">
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="">
                                            Gọi món
                                        </a>
                                    </li>
                                </ul>
                                <div className="user_option">
                                    {
                                        token===null ? <a href="" className="user_link">
                                            <NavLink to={'/login'} className="bi bi-person-fill " aria-hidden="true" />
                                        </a> :
                                            <a href="" className="user_link">
                                            <button onClick={handleLogout} className="bi bi-door-open-fill" aria-hidden="true" />
                                        </a>
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
                                    <a href="" className="order_online" style={{ padding: "6px 13px" }}>
                                        Đặt Bàn
                                    </a>
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
                                                <p>
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
                                                <div className="btn-box">
                                                    <a href="" className="btn1"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item ">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>Nhóp Nhép Lẩu Nướng</h1>
                                                <p>
                                                    1. Thà ăn một miếng nghé non - còn hơn ăn cả một con trâu
                                                    già 2. Đam mê ẩm thực - tích cực giảm cân 3. Yêu là phải
                                                    nói, đói là phải ăn 4. Tình là gì? Là đồ ăn chứ không phải
                                                    anh. 5. Ăn mà ngại - chỉ hại bao tử mà thôi 6. Có công ăn
                                                    uống - có ngày lên cân 7. Độc lập tự do - miếng nào to thì
                                                    gắp 8. Ăn chay sống khỏe - tươi trẻ mỗi ngày 9. Ăn là mê -
                                                    chê không tính tiền 10. Rẻ như bèo, nghèo cũng có tiền mua
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn1"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>Nhóp Nhép Lẩu Nướng</h1>
                                                <p>
                                                    Ăn được, uống được là phúc. Với nhiều người được ăn món mình
                                                    thích, uống nước mà mình yêu là điều tuyệt nhất với họ. Họ
                                                    luôn lạc quan suy nghĩ rằng: "đâu biết ngày mai ra sao mà
                                                    chúng ta phải đau khổ, làm điều mà mình không thích". Không
                                                    nói các bạn cũng biết, sở thích của họ là được ăn uống, được
                                                    đăng những stt về ăn uống lên MXH để lưu lại những kỷ niệm
                                                    quý giá. Và dưới đây là những Slogan về ăn uống, những lời
                                                    hay ý đẹp về ăn uống mà Khánh Linh tìm hiểu được trên
                                                    Internet.
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn1"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <ol className="carousel-indicators">
                                <li
                                    data-target="#customCarousel1"
                                    data-slide-to={0}
                                    className="active"
                                />
                                <li data-target="#customCarousel1" data-slide-to={1} />
                                <li data-target="#customCarousel1" data-slide-to={2} />
                            </ol>
                        </div>
                    </div>
                </section>
                {/* end slider section */}
            </div>
        </>

    );
}
