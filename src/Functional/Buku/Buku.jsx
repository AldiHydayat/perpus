import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from '../../Component/Nav';
import { perpusContext } from '../../Context/context';

function Buku(props) {
  const [dataBuku, setDataBuku] = useState([]);
  const { url } = useContext(perpusContext);
  const [judul, setJudul] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [kategori, setKategori] = useState('');
  const [stok, setStok] = useState('');
  const [cover, setCover] = useState(null);
  const [errors, setErrors] = useState({});
  const [reload, setReload] = useState(false); // Trigger untuk refresh data  
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();
    let data = new FormData();

    data.append('judul', judul);
    data.append('penerbit', penerbit);
    data.append('kategori', kategori);
    data.append('stok', stok);
    data.append('cover', cover);

    axios
      .post(`${url}/petugas/buku`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => { setReload(prev => !prev) })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors(err.response.data.error);
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
        axios.delete(`${url}/petugas/buku/${id}`).then((res) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          setReload(prev => !prev);
        });
      }
    });
  };

  useEffect(() => {
    axios.get(`${url}/petugas/buku`).then((res) => {
      const result = res.data.data;
      setDataBuku(result);
    });
  }, [reload]);

  return (
    <div>
      <Nav />
      <div className="container mx-auto mt-7 flex justify-between mb-4">
        <div id="content" className="inline-block w-8/12">
          <table className="table-auto w-full ">
            <thead>
              <tr className="rounded-lg bg-blue-400">
                <th className="p-2 text-white font-inter">Judul</th>
                <th className="p-2 text-white font-inter">Cover</th>
                <th className="p-2 text-white font-inter">Penerbit</th>
                <th className="p-2 text-white font-inter">Kategori</th>
                <th className="p-2 text-white font-inter">Stok</th>
                <th className="p-2 text-white font-inter">Option</th>
              </tr>
            </thead>
            <tbody className="">
              {dataBuku.map((buku, i) => {
                return (
                  <tr className="border-b border-blue-700">
                    <td className="text-center font-inter p-2">{buku.judul}</td>
                    <td className="text-center font-inter p-2">
                      <img src={`${url}/image/${buku.cover}`} alt="cover" className="w-2/12 m-auto" />
                    </td>
                    <td className="text-center font-inter p-2">{buku.penerbit}</td>
                    <td className="text-center font-inter p-2">{buku.kategori}</td>
                    <td className="text-center font-inter p-2">{buku.stok}</td>
                    <td className="text-center font-inter p-2">
                      <span
                        className="p-2 bg-green-400 text-sm rounded-2xl cursor-pointer"
                        onClick={(e) => {
                          history.push({
                            pathname: 'buku/edit',
                            state: buku,
                          });
                        }}
                      >
                        edit
                      </span>
                      <span className="p-2 bg-red-400 text-sm rounded-2xl cursor-pointer" onClick={(e) => handleDelete(buku._id)}>
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
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.judul ? `border-red-500` : null}`}
                placeholder="Masukan Judul"
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.penerbit ? `border-red-500` : null}`}
                placeholder="Masukan Penerbit"
                onChange={(e) => setPenerbit(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.kategori ? `border-red-500` : null}`}
                placeholder="Masukan Kategori"
                onChange={(e) => setKategori(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                className={`font-inter w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.stok ? `border-red-500` : null}`}
                placeholder="Masukan Stok"
                onChange={(e) => setStok(e.target.value)}
              />
            </div>
            <div class="w-full items-center justify-center bg-grey-400">
              <label class="w-full flex flex-col items-center px-2 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
                <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 font-inter">Upload Cover</span>
                <input type="file" class="hidden" onChange={(e) => setCover(e.target.files[0])} />
              </label>
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

export default Buku;
