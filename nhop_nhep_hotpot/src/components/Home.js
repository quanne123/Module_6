import React, {useEffect, useState} from "react";
import foodService from "../service/foodService";

export default function Home() {
    const [foodList, setFoodList] = useState([]);
    const [value,setValue]=useState({
        name:'',
        page:0
    })
    useEffect(() => {
        const findAll = async () => {
            try {
                const res = await foodService.findByName(value);
                setFoodList(res.data.content)
            } catch (e) {
                console.log(e)
            }
        }
        findAll();
    }, [])
    return (
        <>
            <>
                <section className="offer_section layout_padding-bottom">
                    <div className="offer_container">
                        <div className="container ">
                            <div className="row">
                                <div className="col-md-6  ">
                                    <div className="box ">
                                        <div className="img-box">
                                            <img src="asset/images/o1.jpg" alt=""/>
                                        </div>
                                        <div className="detail-box">
                                            <h5>Các món bán chạy</h5>
                                            <h6>
                                                <span>20%</span> Off
                                            </h6>
                                            <a href="">
                                                Chọn món
                                                <svg
                                                    version="1.1"
                                                    id="Capa_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 456.029 456.029"
                                                    style={{enableBackground: "new 0 0 456.029 456.029"}}
                                                    xmlSpace="preserve"
                                                >
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
               c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6  ">
                                    <div className="box ">
                                        <div className="img-box">
                                            <img src="/src/asset/images/o2.jpg" alt=""/>
                                        </div>
                                        <div className="detail-box">
                                            <h5>Đặc sản</h5>
                                            <h6>
                                                <span>15%</span> Off
                                            </h6>
                                            <a href="">
                                                Chọn món
                                                <svg
                                                    version="1.1"
                                                    id="Capa_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 456.029 456.029"
                                                    style={{enableBackground: "new 0 0 456.029 456.029"}}
                                                    xmlSpace="preserve"
                                                ></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="food_section layout_padding-bottom">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Our Menu</h2>
                        </div>
                        <ul className="filters_menu">
                            <li className="active" data-filter="*">
                                All
                            </li>
                            <li data-filter=".burger">Đồ Nướng</li>
                            <li data-filter=".pizza">Đồ Chiên xào</li>
                            <li data-filter=".pasta">Lẩu</li>
                            <li data-filter=".fries">Đồ Uống</li>
                        </ul>
                        <div className="filters-content">
                            <div className="row grid">
                                {
                                    foodList.map((element, index) => (
                                        <div className="col-sm-6 col-lg-4 all pizza" key={index}>
                                            <div className="box">
                                                <div>
                                                    <div className="img-box">
                                                        <img
                                                            src={''}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="detail-box">
                                                        <h5>{element.name}</h5>
                                                        <div className="options">
                                                            <h6>{element.price}</h6>
                                                            <a href="">
                                                                <svg
                                                                    version="1.1"
                                                                    id="Capa_1"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                    x="0px"
                                                                    y="0px"
                                                                    viewBox="0 0 456.029 456.029"
                                                                    style={{enableBackground: "new 0 0 456.029 456.029"}}
                                                                    xmlSpace="preserve"
                                                                ></svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>
                        </div>
                        <div className="btn-box">
                            <a href="">View More</a>
                        </div>
                    </div>
                </section>
                {/* end food section */}
                {/* about section */}
                <section className="about_section layout_padding">
                    <div className="container  ">
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="img-box">
                                    <img src="asset/images/about-img.png" alt=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="detail-box">
                                    <div className="heading_container">
                                        <h2>Giới thiệu</h2>
                                    </div>
                                    <p>
                                        Món ăn như thế nào là món ăn ngon? Có người nghĩ, một món ăn ngon đầu tiên là
                                        phải đẹp, chỉ khi đẹp mới cảm thấy thích, mới có ham muốn ăn món ăn đó. Nhưng
                                        với người khác, một món ăn ngon là ở tấm lòng người nấu ăn và cả cách người dùng
                                        thưởng thức nó. Tình cảm yêu thương đặt vào món ăn như một gia vị giúp món ăn
                                        thêm đậm đà. Vì thế, khi biết trân trọng công sức người nấu ăn, chúng ta sẽ thấy
                                        ngon miệng hơn. "Lời nói chẳng mất tiền mua", vậy tại sao chúng ta không dành
                                        một lời kích lệ cho người nấu ăn để họ vui hơn và dốc sức nấu ăn ngon hơn phải
                                        không?
                                    </p>
                                    <a href="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end about section */}
                {/* book section */}
                <section className="book_section layout_padding">
                    <div className="container">
                        <div className="heading_container">
                            <h2>Book A Table</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form_container">
                                    <form action="">
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Your Email"
                                            />
                                        </div>
                                        <div>
                                            <select className="form-control nice-select wide">
                                                <option value="" disabled="" selected="">
                                                    How many persons?
                                                </option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                                <option value="">4</option>
                                                <option value="">5</option>
                                            </select>
                                        </div>
                                        <div>
                                            <input type="date" className="form-control"/>
                                        </div>
                                        <div className="btn_box">
                                            <button>Đặt Bàn</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="map_container ">
                                    <div id="googleMap"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>

        </>

    );
}


