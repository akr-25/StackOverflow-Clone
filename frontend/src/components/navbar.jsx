import axios from "axios";
import { useRef, useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    history.go(0);
  };
  const [menuActive, setMenuActive] = useState(false);
  const hamburgerRef = useRef();
  const menuRef = useRef();

  const hamburgerHandler = () => {
    hamburgerRef.current.classList.toggle("change");
  };

  var searchResult;
  const search = async (query) => {
    searchResult = await axios.put("/question/search", {
      query: query,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(searchResult);
      if (event.target.value.trim() != "") handler(event.target.value);
    }
  };

  const handler = (query) => {
    //Redirect to another route
    history.push("/question/?query=" + query);
  };

  return (
    <nav className='border-t-4 border-custom-1 shadow-md   md:flex items-center lg:justify-center w-screen justify-evenly bg-white z-20 sticky top-0'>
      <div
        className='lg:max-w-screen-xl flex w-full justify-between lg:flex-1 items-center text-gray-500 text-sm '
        style={{ fontFamily: '"Roboto Mono", monospace' }}
      >
        <div className='flex-intial flex items-center'>
          <button onClick={() => setMenuActive(!menuActive)}>
            <div
              className='container ml-2 inline-block md:hidden'
              onClick={() => hamburgerHandler()}
              ref={hamburgerRef}
            >
              <div className='bar1'></div>
              <div className='bar2'></div>
              <div className='bar3'></div>
            </div>
          </button>
          <img
            className='h-14 cursor-pointer sm:flex hidden'
            src='/img/icon2.png'
            alt='IITG LOGO'
          />
          <img
            className='h-14 p-2 cursor-pointer flex sm:hidden'
            src='/img/1200px-IIT_Guwahati_Logo.png'
            alt='STACKOVERFLOW LOGO'
          />
        </div>
        <div className='flex-1 justify-evenly md:flex hidden'>
          <Link to='/'>
            <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500 py-5 '>
              <span>Home</span>
            </div>
          </Link>
          <Link to='/question/unanswered'>
            <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500 py-5 '>
              <span>Answer</span>
            </div>
          </Link>
          <Link to='/developer'>
            <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500 py-5 '>
              <span>About Developer</span>
            </div>
          </Link>
        </div>
        <div className='flex-1 hidden sm:flex ml-6  relative'>
          <input
            className='border-2 focus:outline-none focus:ring focus:border-blue-300 rounded px-6 w-full py-2'
            placeholder='Search...'
            type='text'
            onKeyDown={handleKeyDown}
            // onChange={(event) => {
            //   if (
            //     document.activeElement === event.target &&
            //     event.target.value.trim() != ""
            //   )
            //     search(event.target.value.trim());
            // }}
          />
          <i className='bi bi-search absolute p-2' />
        </div>
        {user == null ? (
          <div className='flex w-72 md:justify-evenly justify-end mr-3 md:mr-0'>
            <Link to='/register'>
              <button className='flex mr-2 items-center rounded-md btn-sign text-blue-500 px-3 py-2 border border-blue-500 hover:bg-white hover:border-blue-500  transition-all duration-500 ease-in-out'>
                <i className='bi bi-person-plus mr-2' />
                <span>Sign up</span>
              </button>
            </Link>
            <Link to='/login'>
              <button className='flex items-center rounded-md text-white btn-log px-3 py-2 border hover:text-blue-400 hover:bg-white hover:border-blue-500 transition-all duration-500 ease-in-out'>
                <i className='bi bi-person mr-2' />
                <span>Log in</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className='flex w-72 md:justify-evenly justify-end mr-3 md:mr-0'>
            <Link to={"/user/?username=" + user.username}>
              <button className='flex mr-2 items-center rounded-md btn-sign text-blue-500 px-3 py-2 border border-blue-500 hover:bg-white hover:border-blue-500  transition-all duration-500 ease-in-out'>
                <i className='bi bi-person-fill mr-2' />
                <span>{user.username ?? "Profile"}</span>
              </button>
            </Link>
            <button
              className='flex items-center rounded-md text-white btn-log px-3 py-2 border hover:text-blue-400 hover:bg-white hover:border-blue-500 transition-all duration-500 ease-in-out'
              onClick={logoutHandler}
            >
              {/* <i className='bi bi-person-fill mr-2' /> */}
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
      <div className={menuActive ? "flex justify-evenly" : "hidden"}>
        <Link to='/'>
          <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500'>
            <span>Home</span>
          </div>
        </Link>
        <Link to='/question/unanswered'>
          <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500'>
            <span>Answer</span>
          </div>
        </Link>
        <Link to='/developer'>
          <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500'>
            <span>About</span>
          </div>
        </Link>
      </div>
      <div className={menuActive ? "flex justify-around mt-2" : "hidden"}>
        <Link to='/question'>
          <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500'>
            <span>Questions</span>
          </div>
        </Link>
        <Link to='/question/tagged?tag='>
          <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500'>
            <span>Tags</span>
          </div>
        </Link>
        <Link to='/users'>
          <div className='border-b-2 border-white transition-colors duration-500 hover:border-blue-500'>
            <span>Users</span>
          </div>
        </Link>
      </div>
      <input
        className='border-2 focus:outline-none focus:ring focus:border-blue-300 rounded px-6 w-full py-2 md:hidden block'
        placeholder='Search...'
        type='text'
        onKeyDown={handleKeyDown}
        // onChange={(event) => {
        //   if (
        //     document.activeElement === event.target &&
        //     event.target.value.trim() != ""
        //   )
        //     search(event.target.value.trim());
        // }}
      />
    </nav>
  );
};

export default Navbar;
