// import {useEffect, useState} from "react";
// import foodService from "../service/foodService";
// import {Formik} from "formik";
//
// function Food() {
//     const [foods, setfoods] = useState([]);
//     const [pageCount, setPageCount] = useState(0);
//     const [isAppend, setIsAppend] = useState(false);
//     const [foodFilter, setfoodFilter] = useState({
//         page: 0,
//         name: "",
//     });
//
//     const dispatch = useDispatch();
//     const name = localStorage.getItem("name");
//
//     const handleAddCartDetail = (productId, productPrice) => {
//         dispatch(
//             addCartDetailAction(
//                 {
//                     quantity: 1,
//                     productDTO: { id: productId },
//                     total: productPrice,
//                 },
//                 name
//             )
//         );
//     };
//
//     const handlePageClick = () => {
//         setfoodFilter((prev) => ({ ...prev, page: prev.page + 1 }));
//         setIsAppend(true);
//     };
//
//     useEffect(() => {
//         const getfoods = async () => {
//             try {
//                 const foodsResponse = await foodService.findByName(foodFilter);
//                 if (isAppend) {
//                     setfoods((prev) => [...prev, ...foodsResponse.data.content]);
//                     setIsAppend(false);
//                 } else {
//                     setfoods(foodsResponse.data.content);
//                 }
//                 setPageCount(foodsResponse.data.totalPages);
//                 document.getElementById("list-empty").innerHTML = "";
//                 document.getElementById("load-more").style.display = "block";
//             } catch (error) {
//                 console.warn(error);
//                 setfoods(error.response.data.content);
//                 document.getElementById("list-empty").innerHTML =
//                     "Không tìm thấy kết quả";
//                 document.getElementById("load-more").style.display = "none";
//             }
//         };
//         getfoods();
//     }, [foodFilter]);
//
//     useEffect(() => {
//         document.title = "Sản phẩm";
//     }, []);
//     return (
// <>
//     <section className="food_section layout_padding-bottom">
//         <div className="container">
//             <div className="heading_container heading_center">
//                 <h2>Our Menu</h2>
//             </div>
//             <ul className="filters_menu">
//                 <li className="active" data-filter="*">
//                     All
//                 </li>
//                 <li data-filter=".burger">Đồ Nướng</li>
//                 <li data-filter=".pizza">Đồ Chiên xào</li>
//                 <li data-filter=".pasta">Lẩu</li>
//                 <li data-filter=".fries">Đồ Uống</li>
//             </ul>
//             <Formik
//                 initialValues={{
//                 name : "",
//                 }}
//                 onSubmit={(value) => {
//                     setfoodFilter((prev) => {
//                         return { ...prev, ...value, page: 0};
//                     });
//                 }}
//                 >
//             </Formik>
//             <div className="filters-content">
//                 <div className="row grid">
//                     <div className="col-sm-6 col-lg-4 all pizza">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     {foods.map((food,index )=> (
//                                         <div className="box" key={index}>
//                                             <div className="img-box">
//                                             <img
//                                                 src={food.foodImgDTOS[0].url}
//                                                 alt=""
//                                                 width={250}
//                                                 height={250}
//                                             </>
//                                         </div>
//                                     <div className="detail-box"
//                                     <
//
//                                     />
//                                     ))}
//                                     <img
//                                         src="https://gofood.vn//upload/r/tong-hop-tin-tuc/huong-dan-mon-ngon/ba-chi-bo-black-angus.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Ba chỉ bò sốt tiêu</h5>
//                                     <p>
//                                         Với những miếng thịt bò đậm đà thơm ngon, hành tây ngọt và ớt
//                                         xanh giòn được phủ một lớp dầu hào, Bò Sốt Tiêu Đen có sự cân
//                                         bằng thỏa mãn về mùi vị, kết cấu và màu sắc được tạo điểm nhấn
//                                         bởi sức nóng âm ỉ của hạt tiêu nghiền.
//                                     </p>
//                                     <div className="options">
//                                         <h6>$20</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             ></svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all burger">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img
//                                         src="https://nhahangmuarung.com/upload/product/vu-de-nuong-sa-te-chaovu-de-nuong-sa-te-chao-3628.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Vú dê nướng</h5>
//                                     <p>
//                                         Món vú dê nướng là một trong số những món ăn được nhiều người
//                                         yêu thích, đặc biệt là trong những dịp tụ tập ăn uống cùng bạn
//                                         bè, người thân. Sau đây mình sẽ hướng dẫn các bạn cách làm món
//                                         vú dê nướng thơm ngon nhất.
//                                     </p>
//                                     <div className="options">
//                                         <h6>$15</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             ></svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all pizza">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img
//                                         src="https://vietair.com.vn/Media/Images/vietair/Tin-tuc/2023/1/bo-nuong-lac-canh.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Bò Lạc Cảnh</h5>
//                                     <p>
//                                         Cảm giác nóng, cảm giác thịt mềm, cảm giác thơm tho... thật là
//                                         một cảm giác ngon khó tả...Đó là Bò nướng Lạc Cảnh. Những du
//                                         khách đã ghé Nhóp Nhép ăn món Bò nướng Lạc Cảnh một lần, thì
//                                         sau có dịp quay lại Nhóp Nhép thế nào cũng tìm lại để ăn.
//                                     </p>
//                                     <div className="options">
//                                         <h6>$17</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             ></svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all pasta">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img
//                                         src="https://thaiduongfood.vn/upload/images/Bach-tuoc-pho-mai.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Bạch tuột nướng</h5>
//                                     <p>
//                                         Bạch tuộc nướng sa tế luôn là món ăn giòn rụm, cay ngon được
//                                         lòng tất cả mọi người kể cả người khó tính nhất. Tuy nhiên bạn
//                                         có biết món ăn này có rất nhiều cách làm và mỗi cách làm lại
//                                         mang đến một vị rất riêng
//                                     </p>
//                                     <div className="options">
//                                         <h6>$18</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             ></svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all fries">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img src="asset/images/f5.png" alt="" />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Khoai tây chiên</h5>
//                                     <p>
//                                         Khoai tây chiên được coi là một món ăn nhẹ chủ yếu trong các
//                                         hộ gia đình trên cả nước.Họ yêu thích vì kết cấu giòn và hương
//                                         vị mặn, khoai tây là 1 trong những món ăn được yêu thích
//                                     </p>
//                                     <div className="options">
//                                         <h6>$10</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             ></svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all pizza">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img
//                                         src="https://dudoff.com/wp-content/uploads/2019/10/cach-nuong-suon-bang-lo-nuong-2-1.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Sường nướng</h5>
//                                     <p>
//                                         Vị cay của kim chi, từng miếng sườn nướng vàng ươm, vừa độ
//                                         chín, không quá mềm cũng không quá khô, khói than nghi ngút
//                                         hòa quyện với hương thơm, vị đậm đà của gia vị
//                                     </p>
//                                     <div className="options">
//                                         <h6>$15</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             ></svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all burger">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img
//                                         src="https://mycayseouly.vn/Images/image/mycay/Lau-Thai-Thap-Cam.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Lẩu thái</h5>
//                                     <p>
//                                         Đặc trưng của Lẩu Thái không thể thiếu vị cay của ớt, vị thơm
//                                         của gừng, sả cùng lá chanh, kết hợp với vị ngọt của nước hầm
//                                         xương, những nguyên liệu tươi sống của hải sản như cua, mực,
//                                         tôm, sò, cá,…
//                                     </p>
//                                     <div className="options">
//                                         <h6>$12</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             >
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
//                    c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
//                    C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
//                    c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
//                    C457.728,97.71,450.56,86.958,439.296,84.91z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
//                    c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all burger">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img
//                                         src="https://www.thatlangon.com/wp-content/uploads/2022/05/cach-lam-salad-ca-ngu-23515img_62721654598f3-e1651647117409.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Salad Cá ngừ</h5>
//                                     <p>
//                                         là một trong những phương pháp để có một bữa ăn đảm chất lượng
//                                         về dinh dưỡng. Món salad cá ngừ là sự kết hợp tuyệt vời kết
//                                         hợp các gia vị và nguyên liệu để các món rau trở nên hấp dẫn
//                                         và ngon miệng hơn.
//                                     </p>
//                                     <div className="options">
//                                         <h6>$14</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             >
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
//                    c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
//                    C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
//                    c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
//                    C457.728,97.71,450.56,86.958,439.296,84.91z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
//                    c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 col-lg-4 all pasta">
//                         <div className="box">
//                             <div>
//                                 <div className="img-box">
//                                     <img
//                                         src="https://bepnhamo.vn/wp-content/uploads/2022/03/cach-lam-mon-tom-sot-trung-muoi-don-gian.jpg"
//                                         alt=""
//                                     />
//                                 </div>
//                                 <div className="detail-box">
//                                     <h5>Tôm sốt trứng muối</h5>
//                                     <p>
//                                         Tôm chiên sốt trứng muối là món ăn ngon, lạ miệng ai cũng
//                                         thèm. Tôm sốt trứng muối là món ăn có đầy đủ các chất dinh
//                                         dưỡng.Món ăn này rất hợp khẩu vị với mọi người trong gia đình.
//                                     </p>
//                                     <div className="options">
//                                         <h6>$10</h6>
//                                         <a href="">
//                                             <svg
//                                                 version="1.1"
//                                                 id="Capa_1"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                                 x="0px"
//                                                 y="0px"
//                                                 viewBox="0 0 456.029 456.029"
//                                                 style={{ enableBackground: "new 0 0 456.029 456.029" }}
//                                                 xmlSpace="preserve"
//                                             >
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
//                    c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
//                    C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
//                    c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
//                    C457.728,97.71,450.56,86.958,439.296,84.91z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                                 <g>
//                                                     <g>
//                                                         <path
//                                                             d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
//                    c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
//                                                         />
//                                                     </g>
//                                                 </g>
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="btn-box">
//                 <a href="">View More</a>
//             </div>
//         </div>
//     </section>
//
//     </>
//     );
//
// }
// export default Food;