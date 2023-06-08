import { SHOW_DETAIL_ACTION, UPDATE_ACTION } from "../UserDetail/types";
import userService from "../../../service/userService";

export const showUserDetailAction = () => async (dispatch) => {
    try {
        const userDetailResponse = await userService.getUserDetail();
        dispatch({
            type: SHOW_DETAIL_ACTION,
            payload: userDetailResponse.data,
        });
    } catch (error) {
        console.warn(error);
    }
};

export const updateUserDetailAction = (userDetail) => async (dispatch) => {
    try {
        await userService.updateUserDetail(userDetail);
        dispatch({
            type: UPDATE_ACTION,
            payload: userDetail,
        });
    } catch (error) {
        console.warn(error);
    }
};
