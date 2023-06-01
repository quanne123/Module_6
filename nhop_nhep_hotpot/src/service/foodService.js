import request from '../config/request'
const findByName = ({page, name}) => {
    return request.get(`/food?page=${page?page:""}&name=${name}`)
}

const findAll = () => {
    return request.get(`/food/list?page=0`)
}

const findById = (id) => {
    return request.get(`/food/detail/${id}`)
}

const foodService = {
    findByName,
    findById,
    findAll
}

export default foodService