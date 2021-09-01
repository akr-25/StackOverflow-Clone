import React from 'react';

const Footer = () => {
    return (
      <div
        className='w-screen bg-black text-white p-2'
        style={{ fontFamily: '"Roboto Mono", monospace' }}
      >
        <div className='text-center'>
          Copyright reserved 2021 <br />
          <span className=''>StackOverflow created by Aman Kumar</span>
          <br />
          {/* <span className=''>with Subham , Pranav , Jaswanth and Manu</span> */}
        </div>
      </div>
    );
}

export default Footer;
