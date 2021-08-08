import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from '../../Component/Nav';
import { perpusContext } from '../../Context/context';

function EditBuku(props) {
  const { url } = useContext(perpusContext);
  const [judul, setJudul] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [kategori, setKategori] = useState('');
  const [stok, setStok] = useState('');
  const [cover, setCover] = useState(null);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();
    let data = new FormData();

    data.append('judul', judul || props.location.state.judul);
    data.append('penerbit', penerbit || props.location.state.penerbit);
    data.append('kategori', kategori || props.location.state.kategori);
    data.append('stok', stok || props.location.state.stok);
    data.append('cover', cover);

    axios
      .put(`${url}/petugas/buku/${props.location.state._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        history.push('/buku');
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors(err.response.data.error);
        }
      });
  };

  const handlePreview = (e) => {
    if (e.target.files[0]) {
      const imgPreview = document.querySelector('#image-preview');
      imgPreview.src = URL.createObjectURL(e.target.files[0]);
      setCover(e.target.files[0]);
    }
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
                className={`font-inter w-full p-2 text-primary border-2 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 ${errors.judul ? `border-red-500` : null}`}
                placeholder="Masukan Judul"
                defaultValue={props.location.state.judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                placeholder="Masukan Penerbit"
                defaultValue={props.location.state.penerbit}
                onChange={(e) => setPenerbit(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className={`font-inter w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                placeholder="Masukan Kategori"
                defaultValue={props.location.state.kategori}
                onChange={(e) => setKategori(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                className={`font-inter w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                placeholder="Masukan Stok"
                onChange={(e) => setStok(e.target.value)}
                defaultValue={props.location.state.stok}
              />
            </div>
            <div className="">
              <img src={url + '/image/' + props.location.state.cover} alt="cover" className="mx-auto w-2/12 mb-4" id="image-preview" />
            </div>
            <div class="w-full items-center justify-center bg-grey-400">
              <label class="w-full flex flex-col items-center px-2 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
                <svg class="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 font-inter">Change Cover</span>
                <input type="file" class="hidden" onChange={(e) => handlePreview(e)} />
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

export default EditBuku;
