import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {
    render() {
        return (
          <div className='sticky'>
            <Link to="/home">
              <div
                className={
                  this.props.page === "home"
                    ? "border-r-4 border-red-400 font-bold my-6 p-1"
                    : "my-6 p-1"
                }
                style={
                  this.props.page === "home"
                    ? { backgroundColor: "#EFF0F1" }
                    : {}
                }
                id='home'
              >
                HOME
              </div>
            </Link>
            <div className='flex flex-col'>
              <div
                className={
                  // this.props.page === "public"
                  //   ? "border-r-4 border-red-400 font-bold mb-2 p-1":
                    "mb-2 p-1"
                }
                // style={
                //   this.props.page === "public"
                //     ? { backgroundColor: "#EFF0F1" }
                //     : {}
                // }
                // id='public'
              >
                PUBLIC
              </div>
              <div className='flex flex-col '>
                <Link to="/question">
                  <div
                    className={
                      this.props.page === "question"
                        ? "border-r-4 border-red-400 font-bold flex ml-4 p-1"
                        : "flex ml-4 p-1"
                    }
                    style={
                      this.props.page === "question"
                        ? { backgroundColor: "#EFF0F1" }
                        : {}
                    }
                    id='question'
                  >
                    <p className=''>Questions</p>
                  </div>
                </Link>
                <Link to="/question/tagged?tag=">
                <div
                  className={
                    this.props.page === "tags"
                      ? "border-r-4 border-red-400 font-bold ml-4 p-1"
                      : " ml-4 p-1"
                  }
                  style={
                    this.props.page === "tags"
                      ? { backgroundColor: "#EFF0F1" }
                      : {}
                  }
                  id='tags'
                >
                  Tags
                </div>
                </Link>
                <Link to="/users">
                  <div
                    className={
                      this.props.page === "users"
                        ? "border-r-4 border-red-400 font-bold ml-4 p-1"
                        : " ml-4 p-1"
                    }
                    style={
                      this.props.page === "users"
                        ? { backgroundColor: "#EFF0F1" }
                        : {}
                    }
                    id='users'
                  >
                    Users
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
    }
}

export default SideBar;
