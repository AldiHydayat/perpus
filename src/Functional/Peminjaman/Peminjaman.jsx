import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from '../../Component/Nav';
import { perpusContext } from '../../Context/context';

function Peminjaman(props) {
  const [dataPinjam, setDataPinjam] = useState([]);
  const [dataAnggota, setDataAnggota] = useState([]);
  const [dataBuku, setDataBuku] = useState([]);
  const { url } = useContext(perpusContext);
  const [anggota, setAnggota] = useState('');
  const [buku, setBuku] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();

    axios
      .post(`${url}/petugas/pinjam`, {
        idAnggota: anggota,
        idBuku: buku,
        jumlah,
      })
      .then((res) => {})
      .catch((err) => {
        console.dir(err);

        if (err.response.status === 400) {
          setErrors(err.response.data.error);
        } else if (err.response.status === 403) {
          return Swal.fire({
            icon: 'error',
            title: 'Tambah Data Gagal',
            text: err.response.data.message,
          });
        }
      });
  };

  const handleKembali = async (id) => {
    return await Swal.fire({
      title: 'Apa anda yakin?',
      text: 'Pastikan buku telah diterima',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, lanjutkan',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${url}/petugas/pinjam/${id}`).then((res) => {
          return Swal.fire('Sukses!', 'buku telah dikembalikan.', 'success');
        });
      }
    });
  };

  useEffect(() => {
    axios.get(`${url}/petugas/anggota`).then((res) => {
      setDataAnggota([...res.data.data]);
    });
  }, []);

  useEffect(() => {
    axios.get(`${url}/petugas/buku`).then((res) => {
      setDataBuku([...res.data.data]);
    });
  }, []);

  useEffect(() => {
    axios.get(`${url}/petugas/pinjam`).then((res) => {
      setDataPinjam([...res.data.data]);
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
                <th className="p-2 text-white font-inter">Buku</th>
                <th className="p-2 text-white font-inter">Jumlah</th>
                <th className="p-2 text-white font-inter">Tanggal Pinjam</th>
                <th className="p-2 text-white font-inter">Tanggal Kembali</th>
                <th className="p-2 text-white font-inter">Option</th>
              </tr>
            </thead>
            <tbody className="">
              {dataPinjam.map((pinjam, i) => {
                return (
                  <tr className="border-b border-blue-700">
                    <td className="text-center font-inter p-2">{pinjam.anggota.nama}</td>
                    <td className="text-center font-inter p-2">{pinjam.buku.judul}</td>
                    <td className="text-center font-inter p-2">{pinjam.jumlah}</td>
                    <td className="text-center font-inter p-2">{new Date(pinjam.tanggalPinjam).toLocaleDateString()}</td>
                    <td className="text-center font-inter p-2">{pinjam.tanggalKembali != null ? new Date(pinjam.tanggalKembali).toLocaleDateString() : '-'}</td>
                    <td className="text-center font-inter p-2">
                      {pinjam.tanggalKembali == null ? (
                        <span className="p-2 bg-green-500 text-sm rounded-2xl text-white cursor-pointer" onClick={(e) => handleKembali(pinjam._id)}>
                          Kembalikan
                        </span>
                      ) : (
                        '-'
                      )}
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
              <select
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.idAnggota != null ? `border-red-500` : null}`}
                placeholder="Masukan Nama Anggota"
                onChange={(e) => setAnggota(e.target.value)}
                id="anggota"
              >
                <option value="">-- Nama Anggota --</option>
                {dataAnggota.map((anggota, i) => {
                  return <option value={anggota._id}>{anggota.nama}</option>;
                })}
              </select>
            </div>
            <div>
              <select
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.idBuku != null ? `border-red-500` : null}`}
                placeholder="Masukan Nama Anggota"
                onChange={(e) => setBuku(e.target.value)}
                id="buku"
              >
                <option value="">-- Nama Buku --</option>
                {dataBuku.map((buku, i) => {
                  return <option value={buku._id}>{buku.judul}</option>;
                })}
              </select>
            </div>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.jumlah != null ? `border-red-500` : null}`}
                placeholder="Masukan Jumlah"
                onChange={(e) => setJumlah(e.target.value)}
                id="jumlah"
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

export default Peminjaman;
