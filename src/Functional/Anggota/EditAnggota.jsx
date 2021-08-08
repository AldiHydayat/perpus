import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../../Component/Nav';
import { perpusContext } from '../../Context/context';

function EditAnggota(props) {
  const { url } = useContext(perpusContext);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();
    let data = {
      nama: nama || props.location.state.nama,
      email: email || props.location.state.email,
      alamat: alamat || props.location.state.alamat,
    };

    axios
      .put(`${url}/petugas/anggota/${props.location.state._id}`, data)
      .then((res) => {
        history.push('/anggota');
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors(err.response.data.error);
        }
      });
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto">
        <div id="form" className="w-9/12 rounded-lg shadow-lg p-4 bg-blue-400 m-auto">
          <h1 className="text-2xl font-inter font-medium text-primary mt-4 mb-6 text-center text-white">Edit Data</h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.nama ? `border-red-500` : null}`}
                placeholder="Masukan Nama"
                onChange={(e) => setNama(e.target.value)}
                defaultValue={props.location.state.nama}
                id="nama"
              />
            </div>
            <div>
              <input
                type="email"
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.email ? `border-red-500` : null}`}
                placeholder="Masukan Email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={props.location.state.email}
                id="email"
              />
            </div>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.alamat ? `border-red-500` : null}`}
                placeholder="Masukan Alamat"
                onChange={(e) => setAlamat(e.target.value)}
                defaultValue={props.location.state.alamat}
                id="alamat"
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

export default EditAnggota;
