import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import ListPlayer from './component/ListPlayer';
import AddPlayer from './component/AddPlayer';
import DetailPlayer from './component/DetailPlayer';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<ListPlayer />} />
                    <Route path="/add" element={<AddPlayer />} />
                    <Route path="/detail/:id" element={<DetailPlayer />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;