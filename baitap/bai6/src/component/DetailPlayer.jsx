import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { searchById } from '../service/player';

const DetailPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        // Tạo hàm async để gọi API
        const fetchDetail = async () => {
            try {
                const foundPlayer = await searchById(id); // Thêm await
                setPlayer(foundPlayer);
            } catch (error) {
                // Nếu lỗi hoặc không tìm thấy
                alert("Không tìm thấy cầu thủ này!");
                navigate('/');
            }
        };

        fetchDetail();
    }, [id, navigate]);

    if (!player) return <div className="text-center mt-5 text-primary">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                        <i className="fa-solid fa-address-card me-2"></i>
                        Hồ sơ cầu thủ: {player.name}
                    </h4>
                    <Link to="/" className="btn btn-sm btn-light text-info fw-bold">
                        <i className="fa-solid fa-arrow-left me-1"></i> Quay lại
                    </Link>
                </div>

                <div className="card-body p-5">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-4 text-center">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm"
                                 style={{ width: '180px', height: '180px' }}>
                                <i className="fa-solid fa-user fa-6x text-secondary"></i>
                            </div>
                            <h3 className="mt-3 text-primary fw-bold">{player.code}</h3>
                        </div>

                        <div className="col-md-8">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <span className="fw-bold text-muted">Họ và tên:</span>
                                    <span className="fs-5">{player.name}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <span className="fw-bold text-muted">Ngày sinh:</span>
                                    <span className="fs-5">{player.dob}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <span className="fw-bold text-muted">Vị trí thi đấu:</span>
                                    {/* SỬA LỖI Ở ĐÂY: Lấy .label */}
                                    <span className={`badge fs-6 ${
                                        (player.position?.value || player.position) === 'ST' ? 'bg-danger' :
                                            (player.position?.value || player.position) === 'GK' ? 'bg-warning text-dark' : 'bg-success'
                                    }`}>
                                        {player.position?.label || player.position}
                                    </span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <span className="fw-bold text-muted">Giá chuyển nhượng:</span>
                                    {/* Thêm check null cho price */}
                                    <span className="fs-4 text-success fw-bold">
                                        {player.price?.toLocaleString()} $
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card-footer bg-light text-end p-3">
                    <button className="btn btn-warning me-2">
                        <i className="fa-solid fa-pen-to-square me-1"></i> Chỉnh sửa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailPlayer;