import React, { useEffect, useState, useRef } from 'react';
import { getAll, search, deleteById } from '../service/player';
import { Link } from 'react-router-dom';
import DeleteComponent from './DeleteComponent';


const ListPlayer = () => {
    const [playerList, setPlayerList] = useState([]);
    const [deletePlayer, setDeletePlayer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        setPlayerList(getAll());
    }, []);

    const handleSearch = () => {
        const keyword = searchRef.current.value.trim();
        if (keyword === "") {
            setPlayerList(getAll());
        } else {
            setPlayerList(search(keyword));
        }
    };

    const handleDeleteConfirm = () => {
        deleteById(deletePlayer.id);
        setShowModal(false);
        setPlayerList(getAll());
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">Danh sách cầu thủ</h2>
                <Link to="/add" className="btn btn-success">
                    <i className="fa-solid fa-plus me-2"></i>Thêm cầu thủ
                </Link>
            </div>

            <div className="row mb-3">
                <div className="col-md-4 ms-auto">
                    <div className="input-group">
                        <input ref={searchRef} className="form-control" placeholder="Tìm kiếm..." />
                        <button onClick={handleSearch} className="btn btn-primary">Tìm</button>
                    </div>
                </div>
            </div>

            <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark text-center">
                <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Ngày sinh</th>
                    <th>Vị trí</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {playerList.map((player, index) => (
                    <tr key={player.id}>
                        <td className="text-center">{index + 1}</td>
                        <td>{player.code}</td>
                        <td className="fw-bold">{player.name}</td>
                        <td>{player.dob}</td>
                        <td className="text-center">{player.position}</td>
                        <td className="text-center">
                            <Link to={`/detail/${player.id}`} className="btn btn-info btn-sm me-2 text-white">
                                <i className="fa-solid fa-eye"></i>
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => { setDeletePlayer(player); setShowModal(true); }}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            {showModal && (
                <DeleteComponent
                    showModal={showModal}
                    closeModal={() => setShowModal(false)}
                    deletePlayer={deletePlayer}
                    onReload={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default ListPlayer;