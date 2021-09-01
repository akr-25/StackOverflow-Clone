import { useRef , useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { signInUsingEmailandPassword } from "../services/auth";
import {AuthContext} from "../context/authContext";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const loginHandler = (e) => {
    e.preventDefault();
    signInUsingEmailandPassword(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <section className='flex flex-col items-center justify-center bg-custom z-10 flex-1'>
        <img
          className='h-24 cursor-pointer mb-4 sm:flex hidden'
          src='/img/1200px-IIT_Guwahati_Logo.png'
          alt="IITG LOGO"
        />
        <button
          style={{ backgroundColor: "#2F3337" }}
          className='mb-4 text-white rounded w-72 py-2 shadown-sm'
        >
          <i className='bi bi-github' /> Log in with GitHub
        </button>
        <button
          style={{ backgroundColor: "#FFFFFF" }}
          className='mb-4 flex items-center justify-center py-2 rounded w-72 shadown-sm'
        >
          <img
            width={32}
            src='https://www.freepnglogos.com/uploads/logo-outlook/transparent-outlook-icon-2.png'
            className='bg-white'
            alt="Outlook logo"
          />
          <span style={{ color: "#006EC3" }} className='pl-2'>
            Log in with Outlook
          </span>
        </button>
        <form
          className='px-10 py-8 rounded-md bg-white shadow-lg w-72'
          onSubmit={loginHandler}
        >
          <label>
            <span className='font-medium'>Email</span>
            <br />
            <input
              type='email'
              className='mt-2 border-2 focus:outline-none focus:ring focus:border-blue-300 rounded px-6 w-full py-1'
              required
              ref={email}
            />
          </label>
          <br />
          <br />
          <label>
            <span className='font-medium'>Password</span>
            {/* <span
              className='float-right text-sm text-blue-500 hover:text-blue-400'
            >
              {" "}
              Forgot Password?
            </span> */}
            <br />
            <input
              type='password'
              className='mt-2 border-2 focus:outline-none focus:ring focus:border-blue-300 rounded px-6 w-full py-1'
              required
              ref={password}
            />
          </label>
          <br />
          <button
            type='submit'
            className='btn-log w-full py-2 mt-5 text-white rounded'
          >
            Log in
          </button>
        </form>
        <br />
        <br />
        <p>
          Don't have a account?{" "}
          <Link to='/register'>
            <span className='text-blue-500 hover:text-blue-400 hover:underline'>
              Sign up
            </span>
          </Link>
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
