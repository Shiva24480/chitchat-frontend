import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}

export async function loginApi(email, password, navigate) {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_END_POINT}/api/users/login`, {
            email,
            password
        }, config
        );
        localStorage.setItem('chat-app-user', JSON.stringify(data));
        if (data) {
            // console.log(data);
            navigate("/");
        }
    } catch (error) {
        toast.error('Invalid username or password', toastStyle);
    }
}

export async function registerApi(pic, name, email, password, navigate) {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_END_POINT}/api/users`, {
            name,
            email,
            password,
            pic,
        }, config
        );
        localStorage.setItem('chat-app-user', JSON.stringify(data));
        if (data) {
            navigate("/");
        }
    } catch (error) {
        toast.error('Something went wrong! Try Again.', toastStyle);
    }
}