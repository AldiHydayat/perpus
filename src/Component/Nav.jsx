import React from 'react';

function Nav(props) {
  return (
    <nav className="h-auto p-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-inter font-bold text-xl">Perpus</h1>
        <ul className="flex">
          <li className="mx-4">
            <a href="/" className="font-inter border-b-2 border-blue-400 p-1 hover:border-blue-700 duration-150">
              Home
            </a>
          </li>
          <li className="mx-4">
            <a href="/buku" className="font-inter border-b-2 border-blue-400 p-1 hover:border-blue-700 duration-150">
              Buku
            </a>
          </li>
          <li className="mx-4">
            <a href="/anggota" className="font-inter border-b-2 border-blue-400 p-1 hover:border-blue-700 duration-150">
              Anggota
            </a>
          </li>
          <li className="mx-4">
            <a href="/petugas" className="font-inter border-b-2 border-blue-400 p-1 hover:border-blue-700 duration-150">
              Petugas
            </a>
          </li>
          <li className="mx-4">
            <a href="/peminjaman" className="font-inter border-b-2 border-blue-400 p-1 hover:border-blue-700 duration-150">
              Peminjaman
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
