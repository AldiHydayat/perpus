import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Nav from '../../Component/Nav';
import { perpusContext } from '../../Context/context';

function Petugas(props) {
  const [dataPetugas, setDataPetugas] = useState([]);
  const { url } = useContext(perpusContext);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();

    axios
      .post(`${url}/petugas`, {
        nama,
        email,
      })
      .then((res) => {
        // let nama = document.querySelector('#nama');
        // let email = document.querySelector('#email');
        // nama.value('');
        // email.value('');
      })
      .catch((err) => {
        if (err.response.status === 400 && err.response.status != undefined) {
          setErrors(err.response.data.error);
        } else if (err.response.status === 403 && err.response.status != undefined) {
          return Swal.fire({
            icon: 'error',
            title: 'Tambah Data Gagal',
            text: err.response.data.message,
          });
        }
      });
  };

  const handleDelete = async (id) => {
    return await Swal.fire({
      title: 'Apa anda yakin?',
      text: 'Data ini akan terhapus permanen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/petugas/${id}`).then((res) => {
          return Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  };

  useEffect(() => {
    axios.get(`${url}/petugas`).then((res) => {
      setDataPetugas([...res.data.data]);
    });
  });

  return (
    <div>
      <Nav />
      <div className="container mx-auto mt-7 flex justify-between mb-4">
        <div id="content" className="inline-block w-8/12">
          <table className="table-auto w-full ">
            <thead>
              <tr className="rounded-lg bg-blue-400">
                <th className="p-2 text-white font-inter">Nama</th>
                <th className="p-2 text-white font-inter">Email</th>
                <th className="p-2 text-white font-inter">Option</th>
              </tr>
            </thead>
            <tbody className="">
              {dataPetugas.map((petugas, i) => {
                return (
                  <tr className="border-b border-blue-700">
                    <td className="text-center font-inter p-2">{petugas.nama}</td>
                    <td className="text-center font-inter p-2">{petugas.email}</td>
                    <td className="text-center font-inter p-2">
                      <span className="p-2 bg-red-400 text-sm rounded-2xl cursor-pointer" onClick={(e) => handleDelete(petugas._id)}>
                        Hapus
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="form" className="w-3/12 rounded-lg shadow-lg p-4 bg-blue-400">
          <h1 className="text-2xl font-inter font-medium text-primary mt-4 mb-6 text-center text-white">Tambah Data</h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.nama != null ? `border-red-500` : null}`}
                placeholder="Masukan Nama"
                onChange={(e) => setNama(e.target.value)}
                id="nama"
              />
            </div>
            <div>
              <input
                type="email"
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.email != null ? `border-red-500` : null}`}
                placeholder="Masukan Email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
            </div>

            <div className="flex justify-center items-center mt-6">
              <button className="rounded-full border-2 border-blue-400 py-1 px-5 hover:border-blue-400 hover:bg-blue-400 hover:text-white duration-150 font-inter text-blue-400 font-medium focus:outline-none bg-white" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Petugas;
