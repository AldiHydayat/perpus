import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Functional/Home/Home';
import Buku from './Functional/Buku/Buku';
import EditBuku from './Functional/Buku/EditBuku';
import Anggota from './Functional/Anggota/Anggota';
import EditAnggota from './Functional/Anggota/EditAnggota';
import Petugas from './Functional/Petugas/Petugas';
import Peminjaman from './Functional/Peminjaman/Peminjaman';
import { Perpusprovider } from './Context/context';

function App() {
  return (
    <Perpusprovider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/buku" component={Buku} />
          <Route exact path="/buku/edit" component={EditBuku} />
          <Route exact path="/anggota" component={Anggota} />
          <Route exact path="/anggota/edit" component={EditAnggota} />
          <Route exact path="/petugas" component={Petugas} />
          <Route exact path="/peminjaman" component={Peminjaman} />
        </Switch>
      </Router>
    </Perpusprovider>
  );
}

export default App;
