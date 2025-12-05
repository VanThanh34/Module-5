import React, {useEffect, useState, useRef} from 'react';
import {getAll, deleteById} from '../service/player';
import {Link} from 'react-router-dom';
import DeleteComponent from './DeleteComponent';

const ListPlayer = () => {
    const [playerList, setPlayerList] = useState([]);
    const [deletePlayer, setDeletePlayer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const searchRef = useRef(null);

    // Hàm lấy dữ liệu dùng chung (Async)
    const fetchData = async () => {
        const data = await getAll(); // Đợi API trả về
        setPlayerList(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Xử lý tìm kiếm (Lọc trên danh sách lấy từ API)
    const handleSearch = async () => {
        const keyword = searchRef.current.value.trim().toLowerCase();

        // Luôn lấy dữ liệu mới nhất từ API về trước
        const data = await getAll();

        if (keyword === "") {
            setPlayerList(data);
        } else {
            // Tự lọc ở phía client (vì hàm search cũ trong service không dùng được với API)
            const result = data.filter(p => p.name.toLowerCase().includes(keyword));
            setPlayerList(result);
        }
    };

    const handleDeleteConfirm = async () => {
        await deleteById(deletePlayer.id); // Đợi xóa xong trên Server
        setShowModal(false);
        fetchData(); // Gọi lại hàm lấy dữ liệu để cập nhật bảng
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">Danh sách cầu thủ</h2>
                <Link to="/add" className="btn btn-success">
                    <i className="fa-solid fa-plus me-2"></i>Thêm cầu thủ
                </Link>
            </div>

            <div className="row mb-3">
                <div className="col-md-4 ms-auto">
                    <div className="input-group">
                        <input
                            ref={searchRef}
                            className="form-control"
                            placeholder="Tìm kiếm..."
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button onClick={handleSearch} className="btn btn-primary">Tìm</button>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <table className="table table-striped table-hover mb-0 align-middle">
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
                        {playerList && playerList.map((player, index) => (
                            <tr key={player.id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{player.code}</td>
                                <td className="fw-bold text-primary">{player.name}</td>
                                <td className="text-center">{player.dob}</td>
                                <td>
                                    {/* SỬA LẠI: Chấm vào .label để lấy chữ hiển thị */}
                                    <span className={`badge ${
                                            player.position?.value === 'ST' ? 'bg-danger' : 
                                            player.position?.value === 'GK' ? 'bg-warning text-dark' : 'bg-success'
                                    }`}>
                                            {player.position?.label}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="btn-group">
                                        <Link to={`/detail/${player.id}`} className="btn btn-info btn-sm text-white"
                                              title="Xem">
                                            <i className="fa-solid fa-eye"></i>
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            title="Xóa"
                                            onClick={() => {
                                                setDeletePlayer(player);
                                                setShowModal(true);
                                            }}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

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