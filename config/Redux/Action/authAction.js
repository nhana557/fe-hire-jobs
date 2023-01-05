import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export const registerWorker = (data, router) => async(dispatch) =>{
    try {
        const result = await axios.post(`${process.env.API_BACKEND}authWorker/register`, data)

        const user = result.data
        Swal.fire({
            icon: 'success',
            title: user.message
        })
        dispatch({type: 'USER_REGISTER_SUCCESS', payload: user});
        router.push('/Login/worker')
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.response.data.message
        })
    }
}

export const registerRecruiter = (data, router, setLoading) => async(dispatch) =>{
    try {
        const result = await axios.post(`${process.env.API_BACKEND}authRecruiter/register`, data)
        const user = result.data
        Swal.fire({
            icon: "success",
            title: user.message
        })
        dispatch({type: "RECRUITER_SUCCESS_REGISTER", payload: user})
        router.push('/Login/recruiter')
        setLoading(false)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.response.data.message
        })
        setLoading(false)
    }
}
export const loginWorker = (data, route) => async(dispatch) =>{
    try {
        const result = await axios.post(`${process.env.API_BACKEND}authWorker/login`, data, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const user = result.data;
        Cookies.set('token', user.data.token)
        Cookies.set('refreshToken', user.data.refreshToken)
        Cookies.set('id', user.data.id);
        Swal.fire({
            icon: 'success',
            title: user.message
        })
        dispatch({type: "LOGIN_SUCCESS", payload: user})
        route.push('/home');
    } catch (error) {
        console.log(error)
    }
}

export const loginRecruiter = (data, route) => async(dispatch) =>{
    try {
        const result = await axios.post(`${process.env.API_BACKEND}authRecruiter/login`, data, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const user = result.data;
        Cookies.set('token', user.data.token)
        Cookies.set('id', user.data.id)
        Cookies.set('refreshToken', user.data.refreshToken)
        Cookies.set('role', user.data.role)
        Swal.fire({
            icon: 'success',
            title: user.message,
            timer: 5000
        })
        dispatch({type: "RECRUITER_LOGIN_SUCCESS", payload: user})
        route.push('/home')
    } catch (error) {
        Swal.fire(error.message,'', 'error')
        
    }
}