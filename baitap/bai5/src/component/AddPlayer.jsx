import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { add, positions } from '../service/player';
import { useNavigate, Link } from 'react-router-dom';

const AddPlayer = () => {
    const navigate = useNavigate();

    const initialValues = {
        id: '', code: '', name: '', dob: '', price: '', position: ''
    };

    const validationSchema = Yup.object({
        code: Yup.string().required("Mã không được để trống").matches(/^MCT-\d{3}$/, "Mã phải đúng định dạng MCT-XXX"),
        name: Yup.string().required("Tên không được để trống").min(3, "Tên quá ngắn"),
        dob: Yup.date().required("Ngày sinh là bắt buộc").max(new Date(),"Ngày sinh không được lớn hơn ngày hiện tại"),
        price: Yup.number().required("Giá phải nhập").min(1, "Giá phải lớn hơn 0"),
        position: Yup.string().required("Vui lòng chọn vị trí")
    });

    const handleSubmit = (player) => {
        add({ ...player, id: +player.id, price: +player.price });
        alert("Thêm thành công!");
        navigate('/');
    };

    return (
        <div className="card shadow-sm border-0" style={{ maxWidth: 600, margin: '0 auto' }}>
            <div className="card-header bg-success text-white">
                <h4 className="mb-0">Thêm mới cầu thủ</h4>
            </div>
            <div className="card-body">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form>
                        <div className="mb-3">
                            <label className="form-label fw-bold">ID</label>
                            <Field name="id" type="number" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Mã cầu thủ</label>
                            <Field name="code" className="form-control" placeholder="MCT-..." />
                            <ErrorMessage name="code" component="div" className="text-danger small" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Tên cầu thủ</label>
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
                                <label className="form-label fw-bold">Giá ($)</label>
                                <Field name="price" type="number" className="form-control" />
                                <ErrorMessage name="price" component="div" className="text-danger small" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Vị trí</label>
                            <Field as="select" name="position" className="form-select">
                                <option value="">-- Chọn vị trí --</option>
                                {positions.map(pos => (
                                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="position" component="div" className="text-danger small" />
                        </div>

                        <div className="text-end">
                            <Link to="/" className="btn btn-secondary me-2">Hủy</Link>
                            <button type="submit" className="btn btn-success">Lưu lại</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default AddPlayer;