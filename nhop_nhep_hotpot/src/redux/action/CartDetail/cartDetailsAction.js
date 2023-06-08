import {
    SET_CARTS_ACTION,
    DECREASE_QUANTITY_ACTION,
    INCREASE_QUANTITY_ACTION,
    DELETE_ACTION,
    DELETE_PERMANENT_ACTION,
    ADD_ACTION
} from "./types";
import cartService from "../../../service/cartService"
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import cartDetailService from "../../../service/cartDetailService";

export const setCartsAction = (name) => async (dispatch) => {
    try {
        const response = await cartDetailService.findAll(name);
        dispatch({
            type: SET_CARTS_ACTION,
            payload: response.data || [],
        });
    } catch (error) {
        console.warn(error);
    }
};

export const decreaseQuantityCartAction = (id) => async (dispatch) => {
    try {
        await cartDetailService.update(id, -1);
        dispatch({
            type: DECREASE_QUANTITY_ACTION,
            payload: id,
        });
    } catch (error) {
        console.warn(error);
    }
};

export const increaseQuantityCartAction = (id) => async (dispatch) => {
    try {
        await cartDetailService.update(id, 1);
        dispatch({
            type: INCREASE_QUANTITY_ACTION,
            payload: id,
        });
    } catch (error) {
        console.warn(error);
        const errMsg = error.response?.data;
        if (errMsg === "Số lượng không đủ") {
            toast.warn("Số lượng sản phẩm không đủ");
        }
    }
};

export const deleteCartDetailAction = (id) => async (dispatch) => {
    try {
        await cartDetailService.remove(id);
        dispatch({
            type: DELETE_ACTION,
            payload: id,
        });
    } catch (error) {
        console.warn(error);
        Swal.fire({
            icon: "error",
            title: "Xóa thât bại",
            showConfirmButton: false,
            timer: 1500,
        });
    }
};

export const addCartDetailAction = (cartDetail, name) => async (dispatch) => {
    try {
        await cartDetailService.save(cartDetail, name);
        const response = await cartDetailService.findAll(name);
        toast.success("Thêm vào giỏ thành công");
        dispatch({
            type: ADD_ACTION,
            payload: response.data,
        });
    } catch (error) {
        console.warn(error);
        const errMsg = error.response?.data;
        if (errMsg === "Số lượng không đủ") {
            toast.warn("Số lượng sản phẩm không đủ");
        }
    }
};

export const deletePermanentCartDetailAction = (id) => async (dispatch) => {
    try {
        await cartService.remove(id);
        dispatch({
            type: DELETE_PERMANENT_ACTION,
            payload: id,
        });
    } catch (error) {
        console.warn(error);
    }
};