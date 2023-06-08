import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import { useDispatch } from "react-redux";
import {addCartDetailAction} from "../redux/action/CartDetail/cartDetailsAction";
import foodService from "../service/foodService";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

import SimpleSlider from "../util/SimpleSlider";


export default function FoodDetail() {
const [food,setFood] = useState();
const [foodList,setFoodList] = useState([]);
const [quantity, setQuantity] = useState(0);
const param = useParams();
const dispatch = useDispatch();
const name = localStorage.getItem("name")
    const handleChangeQuantity = (e) => {
    setQuantity(+e.target.value);
    };
const handleAddCartDetail = (foodId, foodPrice) => {
    dispatch(
        addCartDetailAction({
            quantity : quantity,
            foodDTO : {id : foodId},
            total: foodPrice,
        },name)
    );
};
useEffect(() => {
    const getFoods = async () => {
        try {
            const foodsResponse = await foodService.findAll();
            setFoodList(foodsResponse.data.content);
        }catch (error) {
            console.warn(error)

        }
    };
    getFoods();
},[]);

useEffect(() => {
    const getFood = async () => {
        const foodResponse = await foodService.findById(param.id);
        setFood(foodResponse.data);
    };
    getFood();
},[param.id]);
if (!food){
    return null;
}
return (
    <>
        <div className="site mb-5 mt-5" id="page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 pull-left">
                        <div className="row">
                            <div className="col-12 col-md-6 p-0">
                                <SimpleSlider imgList={food.foodImgDTOS} />
                            </div>
                            <div className="col-12 col-md-6 p-0">
                                <h1 style={{ fontSize: "24px", color: "#12ac4c" }}>
                                    {food.name}
                                </h1>
                                <p className="price fs-5">
                                    <b>
                                        {food.price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </b>
                                </p>
                                <div className="description" style={{ textAlign: "justify" }}>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: food.description }}
                                    ></div>
                                    <div className="d-flex align-items-center mb-3 gap-2">
                                        <input
                                            type="number"
                                            style={{ width: 50 }}
                                            min={0}
                                            value={quantity}
                                            onChange={(e) => handleChangeQuantity(e)}
                                        />
                                        <button
                                            className="btn btn-success rounded-pill"
                                            onClick={() =>
                                                handleAddCartDetail(food.id, food.price)
                                            }
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                        {food.quantity <= 10 ? (
                                            <span>
                                             (Còn{" "}
                                                <strong style={{ fontWeight: "bold", color: "red" }}>
                                                {food.quantity}
                                                </strong>{" "}
                                                sản phẩm)
                                              </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <p className="m-0">
                                        <b>Thương hiệu:</b> Lẩu Nướng Nhóp Nhép
                                    </p>
                                    <p>
                                        <b>Xuất xứ:</b> Nha Trang
                                    </p>
                                    <h2 style={{ fontSize: 24, color: "#12ac4c" }}>
                                        Bảo quản sản phẩm
                                    </h2>
                                    <ul style={{ marginLeft: "-32px" }} className="mt-1">
                                        <li>
                                            Tránh ánh nắng mặt trời,bảo quản ở nhiệt độ 12 độ
                                        </li>
                                        <li>Sau khi sử dụng đậy kín, có thể để trong tủ lạnh.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
);

}
