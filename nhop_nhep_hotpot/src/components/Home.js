import React, {useEffect, useState} from "react";
import foodService from "../service/foodService";
import {useDispatch} from "react-redux";
import {addCartDetailAction} from "../redux/action/CartDetail/cartDetailsAction";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Field, Form, Formik} from "formik";
import foodTypeService from "../service/foodTypeService";

export default function Home() {
    const [foodList, setFoodList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [isAppend, setIsAppend] = useState(false);
    const [value, setValue] = useState({
        name: '',
        page: 0
    });
    const dispatch = useDispatch();
    const name = localStorage.getItem("name");

    const handleAddCartDetail = (foodId, foodPrice) => {
        dispatch(
            addCartDetailAction(
                {
                    quantity: 1,
                    foodDTO: {id: foodId},
                    total: foodPrice,
                },
                name
            )
        );
    };

    useEffect(() => {
        const findAll = async () => {
            try {
                const res = await foodService.findByName(value);
                if (isAppend) {
                    setFoodList((prev) => [...prev, ...res.data.content]);
                    setIsAppend(false)
                } else {
                    setFoodList(res.data.content);
                }
                setPageCount(res.data.totalPages);
                // document.getElementById("list-empty").innerHTML = "";
                // document.getElementById("load-more").style.display = "block";
            } catch (error) {
                console.warn(error);
                // setFoodList(error.response.data.content);
                // document.getElementById("list-empty").innerHTML =
                //     "Không tìm thấy kết quả";
                // document.getElementById("load-more").style.display = "none";
            }
        };

        findAll();
    }, [value])
    const handlePageClick = () => {
        setValue((prev) => ({...prev, page: prev.page + 1}));
        setIsAppend(true);
    };

    return (
        <>
            <>
                <section className="offer_section layout_padding-bottom">
                    <div className="offer_container">
                        <div className="container ">
                        </div>
                    </div>
                </section>
                <section className="food_section layout_padding-bottom">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Thực đơn hôm nay</h2>
                        </div>
                        <Formik
                            initialValues={{
                                name: "",
                            }}
                            onSubmit={(value) => {
                                setValue((prev) => {
                                    return {...prev, ...value, page: 0};
                                });
                            }}
                        >
                            <Form>
                                <div className="d-flex mb-5 justify-content-end gap-2">
                                    <div id="search-autocomplete" className="form-outline">
                                        <Field
                                            type="search"
                                            id="form1"
                                            className="form-control"
                                            placeholder="Tìm kiếm ..."
                                            name="name"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </Form>
                        </Formik>

                        <div className="filters-content">
                            <div className="row grid">
                                {
                                    foodList.map((element, index) => (
                                        <div className="col-sm-6 col-lg-4 all pizza" key={index}>
                                            <div className="box">
                                                <div>
                                                    <div className="img-box">
                                                        <img
                                                            src={element.foodImgDTOS[0].url}
                                                            alt=""
                                                            style={{ width: '120%', height: '120%', objectPosition: 'fill' }}
                                                        />
                                                    </div>
                                                    <div className="detail-box">
                                                        <h5>{element.name}</h5>
                                                        <div className="options">
                                                            <h6>{element.price.toLocaleString("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            })}</h6>
                                                                <Link to={`/food-detail/${element.id}` }>
                                                                    <i className="bi bi-info-square"></i>
                                                                </Link>
                                                            <button className="btn btn-outline-warning custom-button" onClick={() => handleAddCartDetail(element.id, element.price)}>
                                                                <span className="bi bi-cart4"></span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>
                        </div>
                        {value.page + 1 === pageCount ? (
                            <div className="text-center mt-3" id="load-more"></div>
                        ) : (
                            <div className="text-center mt-3" id="load-more">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handlePageClick()}
                                >
                                    Xem thêm
                                </button>
                            </div>)}

                    </div>
                </section>
                {/* end food section */}
                {/* about section */}
                <section className="about_section layout_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="img-box">
                                    <img src="https://www.cet.edu.vn/wp-content/uploads/2018/01/BBQ-la-gi.jpg" alt="" style={{ width: "100%", height: "auto" }} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="detail-box">
                                    <div className="heading_container">
                                        <h2>Giới thiệu</h2>
                                    </div>
                                    <p>
                                        Món ăn như thế nào là món ăn ngon? Có người nghĩ, một món ăn ngon đầu tiên là phải đẹp, chỉ khi
                                        đẹp mới cảm thấy thích, mới có ham muốn ăn món ăn đó. Nhưng với người khác, một món ăn ngon là ở
                                        tấm lòng người nấu ăn và cả cách người dùng thưởng thức nó. Tình cảm yêu thương đặt vào món ăn như
                                        một gia vị giúp món ăn thêm đậm đà. Vì thế, khi biết trân trọng công sức người nấu ăn, chúng ta sẽ
                                        thấy ngon miệng hơn. "Lời nói chẳng mất tiền mua", vậy tại sao chúng ta không dành một lời kích lệ
                                        cho người nấu ăn để họ vui hơn và dốc sức nấu ăn ngon hơn phải không?
                                    </p>
                                    <a href="">Tìm Hiểu Thêm</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* end about section */}
                {/* book section */}
                <ToastContainer/>
            </>

        </>

    );
}


