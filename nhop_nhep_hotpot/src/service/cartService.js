import request from '../config/request'

const update = (cart) => {
    return request.put(`/cart`, {...cart})
}

const remove = (id) => {
    return request.delete(`cart/${id}`)
}

const cartService = {
    update,
    remove
}

export default cartService