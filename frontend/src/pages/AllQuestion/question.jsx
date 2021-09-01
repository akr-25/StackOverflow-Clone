import React, { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

class HomePageQuestion extends Component {
  render() {
    return (
      <div className='flex text-sm mt-2 pb-3 border-b-2'>
        <div className='flex flex-col justify-center items-center mr-4 text-gray-400'>
          <span>{this.props.upvotes}</span>
          <span>votes</span>
        </div>
        <div className='flex flex-col justify-center items-center mr-4 text-gray-400'>
          <span>{this.props.answers}</span>
          <span>answers</span>
        </div>
        <div className='flex flex-col justify-around w-full'>
          <Link to={"/question/" + this.props.id}>
            <div className='text-lg text-blue-400'>{this.props.title}</div>
          </Link>
          <div className='md:flex justify-between items-center'>
            <div className='flex'>
              {this.props.tags != null && this.props.tags.map((tag) => {
                return (
                  <Link to={"/question/tagged?tag=" + tag} key={uuidv4()}>
                    <div className='text-blue-500 bg-blue-100 rounded py-1 px-2 text-sm mr-2'>
                      {tag}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className='mr-2'>
              <span className='text-gray-400'>asked by</span>
              <span> </span>
              <Link to={"/user/?username=" + this.props.username}>
                <span className='hover:text-blue-600 hover:underline' href='#'>
                  {this.props.username}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageQuestion;
