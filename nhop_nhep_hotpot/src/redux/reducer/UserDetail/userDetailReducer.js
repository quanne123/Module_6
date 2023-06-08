import {
    SHOW_DETAIL_ACTION,
    UPDATE_ACTION,
} from "../../action/UserDetail/types";

const initialState = {};

const userDetailReducer = (userDetail = initialState, action) => {
    switch (action.type) {
        case SHOW_DETAIL_ACTION:
            return action.payload;

        case UPDATE_ACTION:
            return { ...userDetail, ...action.payload };

        default:
            return userDetail;
    }
};

export default userDetailReducer;
