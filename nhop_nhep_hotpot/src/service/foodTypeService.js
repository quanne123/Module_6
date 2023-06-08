import request from '../config/request'

const findAllType = () => {
    // const token  = localStorage.getItem('token')
    return request.get(`/foodType`)
}
const foodTypeService = {
    findAllType
}
export default foodTypeService