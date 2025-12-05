import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { searchById, edit } from '../service/player'; // Nhớ import hàm edit
import { getAllPosition } from "../service/position.jsx"; // Lấy danh sách vị trí để đổ vào select
import { toast } from "react-toastify";

const DetailPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [player, setPlayer] = useState({
        // Khởi tạo giá trị rỗng để tránh lỗi uncontrolled input
        code: '', name: '', dob: '', price: '', position: ''
    });

    const [positionList, setPositionList] = useState([]);

    // 1. Lấy dữ liệu Cầu thủ + Danh sách vị trí khi trang vừa mở
    useEffect(() => {
        const loadData = async () => {
            try {
                // Gọi song song cả 2 API cho nhanh
                const [playerData, positionsData] = await Promise.all([
                    searchById(id),
                    getAllPosition()
                ]);

                if (playerData) {
                    // Xử lý position: API trả về Object -> Convert sang String JSON để khớp với <option>
                    const formattedPlayer = {
                        ...playerData,
                        position: JSON.stringify(playerData.position)
                    };
                    setPlayer(formattedPlayer);
                    setPositionList(positionsData);
                } else {
                    alert("Không tìm thấy cầu thủ!");
                    navigate('/');
                }
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, [id, navigate]);

    // 2. Validate (Giống hệt bên AddPlayer)
    const validationSchema = Yup.object({
        code: Yup.string().required("Mã không được để trống").matches(/^MCT-\d{3}$/, "Mã sai định dạng"),
        name: Yup.string().required("Tên không được để trống").min(3, "Tên quá ngắn"),
        dob: Yup.date().required("Ngày sinh là bắt buộc"),
        price: Yup.number().required("Giá phải nhập").min(1, "Giá phải > 0"),
        position: Yup.string().required("Vui lòng chọn vị trí")
    });

    // 3. Xử lý Submit (Lưu thay đổi)
    const handleSubmit = async (values) => {
        try {
            const playerToUpdate = {
                ...values,
                id: +id, // Đảm bảo ID là số
                price: +values.price,
                position: JSON.parse(values.position) // Parse lại thành Object trước khi gửi đi
            };

            const isSuccess = await edit(playerToUpdate);

            if (isSuccess) {
                toast.success("Cập nhật thành công!");
                navigate('/');
            } else {
                toast.error("Cập nhật thất bại!");
            }
        } catch (e) {
            toast.error("Lỗi hệ thống!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        Hồ sơ cầu thủ
                    </h4>
                    <Link to="/" className="btn btn-sm btn-light text-dark fw-bold">
                        <i className="fa-solid fa-arrow-left me-1"></i> Quay lại
                    </Link>
                </div>

                <div className="card-body p-4">
                    {/* QUAN TRỌNG: enableReinitialize={true} giúp Formik nhận data mới từ API */}
                    <Formik
                        initialValues={player}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="row g-3">
                                {/* Cột Trái: Ảnh đại diện (Trang trí) */}
                                <div className="col-md-4 text-center">
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm mb-3"
                                         style={{ width: '150px', height: '150px' }}>
                                        <i className="fa-solid fa-user-pen fa-5x text-secondary"></i>
                                    </div>
                                    <div className="alert alert-info py-2 small">
                                        Đang chỉnh sửa ID: <strong>{id}</strong>
                                    </div>
                                </div>

                                {/* Cột Phải: Các ô Input */}
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Mã cầu thủ</label>
                                        <Field name="code" className="form-control" />
                                        <ErrorMessage name="code" component="div" className="text-danger small" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Họ và tên</label>
                                        <Field name="name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger small" />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold">Ngày sinh</label>
                                            <Field name="dob" type="date" className="form-control" />
                                            <ErrorMessage name="dob" component="div" className="text-danger small" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold">Vị trí</label>
                                            <Field as="select" name="position" className="form-select">
                                                <option value="">-- Chọn vị trí --</option>
                                                {positionList.map(pos => (
                                                    <option key={pos.id} value={JSON.stringify(pos)}>
                                                        {pos.label}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="position" component="div" className="text-danger small" />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Giá chuyển nhượng ($)</label>
                                        <Field name="price" type="number" className="form-control" />
                                        <ErrorMessage name="price" component="div" className="text-danger small" />
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div className="text-end">
                                <Link to="/" className="btn btn-secondary me-2">Hủy bỏ</Link>
                                <button type="submit" className="btn btn-warning fw-bold px-4">
                                    <i className="fa-solid fa-check me-2"></i> Hoàn tất & Lưu
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default DetailPlayer;