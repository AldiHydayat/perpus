import React from 'react';
import Nav from '../../Component/Nav';

const handleLoginButton = () => {
  window.location.href = '/login';
};

function Home(props) {
  return (
    <div className="body">
      <Nav />
      <div className="content">
        <div className="container mx-auto px-7 flex">
          <div className="desc w-3/6 flex flex-col justify-center">
            <h1 className="font-inter text-4xl font-bold">Web Pengelolaan Data Perpustakaan</h1>
            <p className="font-inter text-xl my-5">Website untuk mengelola data perpustakaan SMK Nowhere City.</p>
          </div>
          <img className="w-3/6" src={process.env.PUBLIC_URL + '/book.png'} alt="read book image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
