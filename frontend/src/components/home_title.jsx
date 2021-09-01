import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomeTitle extends Component {
  // constructor(props){
  //     super(props);
  // }

  render() {
    return (
      <div className='md:flex justify-between mt-6 border-b-2 pb-2'>
        <div className=''>
          <div className='text-3xl'>{this.props.questionTitle}</div>
          <div className='flex text-sm mt-2'>
            <div className='mr-2'>
              <span className='text-gray-400'>Asked</span>
              <span> </span>
              <span>{this.props.age}</span>
            </div>
          </div>
        </div>
        <div>
          <Link to="/ask">
            <button className='flex items-center rounded-md text-white btn-log px-3 py-2 mt-5 md:mt-0 border hover:text-blue-400 hover:bg-white hover:border-blue-500 transition-all duration-500 ease-in-out'>
              <i className='bi bi-question-square mr-2' />
              <span >Ask a Question</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeTitle;
