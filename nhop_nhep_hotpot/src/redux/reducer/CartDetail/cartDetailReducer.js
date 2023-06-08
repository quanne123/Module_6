import {
    SET_CARTS_ACTION,
    DECREASE_QUANTITY_ACTION,
    INCREASE_QUANTITY_ACTION,
    DELETE_ACTION,
    DELETE_PERMANENT_ACTION,
    ADD_ACTION,
} from "../../action/CartDetail/types";

const initialState = [];

const cartDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARTS_ACTION:
            return action.payload;

        case ADD_ACTION:
            return action.payload;

        case DELETE_ACTION: {
            const newCartDetails = state.filter((cartDetail) => {
                return cartDetail.id !== action.payload;
            });

            return newCartDetails;
        }

        case INCREASE_QUANTITY_ACTION: {
            const newCartDetails = state.map((cartDetail) => {
                if (cartDetail.id === action.payload) {
                    return {
                        ...cartDetail,
                        quantity: cartDetail.quantity + 1,
                    };
                }

                return cartDetail;
            });

            return newCartDetails;
        }

        case DECREASE_QUANTITY_ACTION: {
            const newCartDetails = state
                .map((cartDetail) => {
                    if (cartDetail.id === action.payload) {
                        return {
                            ...cartDetail,
                            quantity: cartDetail.quantity - 1,
                        };
                    }

                    return cartDetail;
                })
                .filter((cartDetail) => cartDetail.quantity > 0);

            return newCartDetails;
        }

        case DELETE_PERMANENT_ACTION: {
            const newCartDetails = state.filter((cartDetail) => {
                return cartDetail.cartDTO.id !== action.payload;
            });

            return newCartDetails;
        }

        default:
            return state;
    }
};

export default cartDetailReducer;
