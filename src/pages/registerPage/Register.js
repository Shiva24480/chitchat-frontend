import React, { useEffect, useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'
import { registerApi } from '../../api/authApi';
import SelectProfileModal from '../../components/profileModal/SelectProfileModal';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState();

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = user;
        if (!name || !email || !password) {
            toast.error("Please fill all the field", toastStyle);
            return;
        }

        await registerApi(pic, name, email, password, navigate);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('chat-app-user'));
        if (user) {
            navigate('/');
        }
    }, []);

    const toastStyle = {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    return (
        <div className="register">
            <div className="register-box">
                <h2>Register</h2>
                <form>
                    <div className="user-box">
                        <h3>Username</h3>
                        <input type="text" name='name' onChange={handleChange} />
                    </div>
                    <div className="user-box">
                        <h3>Email</h3>
                        <input type="email" name='email' onChange={handleChange} />
                    </div>
                    <div className="user-box">
                        <h3>Password</h3>
                        <input type="password" name='password' onChange={handleChange} />
                    </div>

                    <SelectProfileModal pic={pic} setPic={setPic}/>
                    <div className='register-button' onClick={handleSubmit}>
                        {
                            loading === true ?
                                (loading && <Spinner color='white' />) :
                                ('Submit')
                        }
                    </div>
                </form>
                <div className='login-link'>
                    <p>Already have an Account!</p>
                    <div className="link">
                        <Link to="/login">
                            <span>LOGIN</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register