import request from '../config/request'

const login = (value) => {
    console.log(value)
    try {
        return request.post('/login', { ...value })
    }catch (e) {
        console.log(e)
    }
}
    const loginService = {
        login
    }
    export default loginService;
