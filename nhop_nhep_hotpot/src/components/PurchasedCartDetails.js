import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import cartDetailService from "../service/cartDetailService";

function CartDetails() {
    const [cartDetails, setCartDetails] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        pageCount: 0,
        page: 0,
        size: 0,
    });

    let stt = pageInfo.page * pageInfo.size + 1;
    const name = localStorage.getItem("name");

    const handlePageClick = (event) => {
        setPageInfo((prev) => ({ ...prev, page: +event.selected }));
    };

    useEffect(() => {
        const getCartDetails = async () => {
            try {
                const cartDetailsResponse = await cartDetailService.listTotalALL(
                    name,
                    pageInfo.page
                );
                setCartDetails(cartDetailsResponse.data.content);
                setPageInfo((prev) => ({
                    ...prev,
                    pageCount: cartDetailsResponse.data.totalPages,
                    size: cartDetailsResponse.data.size,
                }));
            } catch (error) {
                console.warn(error);
            }
        };
        getCartDetails();
    }, [name, pageInfo.page]);

    useEffect(() => {
        document.title = "Lịch sử mua hàng";
    }, []);

    return (
        <>
            <h2 style={{ color: "#12ac4c", textAlign: "center" }} className="mt-3">
                Danh sách sản phẩm mua hàng
            </h2>
            {cartDetails.length !== 0 ? (
                <div className="container mt-2">
                    <table className="table mt-5">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>Tên hàng</th>
                            <th>Loại hàng</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Thời gian thanh toán</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartDetails?.map((cartDetail, index) => (
                            <tr key={index}>
                                <th className="align-middle">{stt++}</th>
                                <td className="align-middle" style={{ width: "20%" }}>
                                    <img

                                        src={cartDetail.foodDTO?.foodImgDTOS[0].url}
                                        className="img-fluid rounded-3"
                                        alt="..."
                                        width={"25%"}
                                    />
                                </td>
                                <td className="align-middle">{cartDetail.foodDTO?.name}</td>
                                <td className="align-middle">
                                    {cartDetail.foodDTO?.foodTypeDTO.name}
                                </td>
                                <td className="align-middle">{cartDetail?.quantity}</td>
                                <td className="align-middle">
                                    {(
                                        cartDetail.quantity * cartDetail.foodDTO?.price
                                    ).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </td>
                                <td className="align-middle">
                                    {cartDetail.cartDTO.paymentDate}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="d-grid">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageCount={pageInfo.pageCount}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={1}
                            previousLabel="<"
                            containerClassName="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            activeClassName="active"
                            disabledClassName="d-none"
                        />
                    </div>
                </div>
            ) : (
                <div className="container mt-2 text-center vh-100">
                    <h3 className="text-danger">Bạn chưa mua hàng</h3>
                </div>
            )}
        </>
    );
}

export default CartDetails;
