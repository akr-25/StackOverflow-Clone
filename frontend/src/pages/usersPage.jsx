import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SideBar from "../components/side_bar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const UsersPage = () => {

  const [users, setUsers] =  useState([]);
  const [query, setQuery] = useState(null);

  useEffect(()=>{
    const fetchUsers = async () => {
      var res;
      if(query===null || query === "")
      res = await axios.get('users/all');
      else
      res = await axios.put('users/search', {
        query: query,
      });
      res = res.data.sort((b, a) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
      setUsers(res);
    };
    fetchUsers();
  },[query])

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex justify-center min-h-screen relative'>
        <section
          className='grid lg:max-w-screen-xl w-full grid-cols-12 '
          style={{ fontFamily: '"Roboto Mono", monospace' }}
        >
          <div className='col-span-2 border-r text-gray-500 text-sm relative w-full hidden md:block'>
            <SideBar page={"users"} />
          </div>
          <div className='col-span-10 font-sans  ml-5'>
            {/* -------------------------------------------- TITLE - ---------------------------- */}
            <div className='flex flex-col items-start justify-start mt-6 border-b-2 pb-2'>
              <div className='text-3xl mb-10'>Users</div>
              <div className='flex relative'>
                <input
                  className='border-2 text-sm focus:outline-none focus:ring focus:border-blue-300 rounded pl-8 pr-6 w-full py-2'
                  placeholder='Filter by user'
                  type='text'
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i className='bi bi-search absolute p-2 ml-1' />
              </div>
            </div>
            {/* ----------------------------------------------------------------------------------------------- */}
            <div className='md:grid grid-cols-3 gap-8 my-10'>
              {users.map((user) => (
                <div
                  key={uuidv4()}
                  className='flex p-4 mb-3 items-center border rounded bg-gray-100 shadow'
                >
                  <Link to={"/user/?userId=" + user._id}>
                    <div className='p-2'>
                      <img
                        src='https://www.nicepng.com/png/full/136-1366211_gray-circle-png.png'
                        //   height="32"
                        width='64'
                        alt='user icon'
                      />
                    </div>
                  </Link>
                  <div className='ml-5'>
                    <Link to={"/user/?userId=" + user._id}>
                      <p className='text-blue-500'>{user.username}</p>
                    </Link>
                    <p>Questions : {user.questions.length}</p>
                    <p>Answers : {user.answers.length}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default UsersPage;
