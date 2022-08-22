import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '@chakra-ui/react'
import { loginApi } from '../../api/authApi';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('chat-app-user'));
    if (user) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      toast.error("Please fill all the field", toastStyle);
      return;
    }
    //api to login user
    await loginApi(email, password, navigate);
  }

  const handleGuestSubmit = async (e) => {
    const email = "guest@gmail.com";
    const password = "1234";
    await loginApi(email, password, navigate);
  }

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  return (
    <div className="login">
      <div className="login-box">
        <h2>LOGIN</h2>
        <form>
          <div className="user-box">
            <h3>Email</h3>
            <input type="email" name='email' onChange={handleChange} />
          </div>
          <div className="user-box">
            <h3>Password</h3>
            <input type="password" name='password' onChange={handleChange} />
          </div>
          <div className='login-button' style={{marginRight:'1rem'}} onClick={handleSubmit}>
            {
              loading === true ?
                (loading && <Spinner color='white' />) :
                ('Submit')
            }
          </div>
          <div className='login-button' onClick={handleGuestSubmit}>
            {
              loading === true ?
                (loading && <Spinner color='white' />) :
                ('Login as a Guest')
            }
          </div>
        </form>
        <div className='register-link'>
          <p>Create New Account</p>
          <div className="link">
            <Link to="/register">
              <span>REGISTER</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login