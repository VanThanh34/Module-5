import React from 'react';
const DetailPlayerComponent = ({detailPlayer, showDetail, closeDetail})=>{
    return (
        <div
            className={`modal fade ${showDetail ? 'show d-block' : ''}`}
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg"> {/* modal-lg cho nó to rộng */}
                <div className="modal-content">
                    <div className="modal-header bg-info text-white"><br/><br/>
                        <h5 className="modal-title">
                            <i className="fa-solid fa-address-card me-2"></i>
                            Hồ sơ cầu thủ: {detailPlayer.name}
                        </h5>
                    </div>

                    <div className="modal-body">
                        <div className="row g-3">
                            <div className="col-md-4 text-center">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '150px', height: '150px'}}>
                                    <i className="fa-solid fa-user fa-4x text-secondary"></i>
                                </div>
                                <h4 className="mt-3 text-primary">{detailPlayer.code}</h4>
                            </div>

                            <div className="col-md-8">
                                <div className="card border-0">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-4 fw-bold">Họ và tên:</div>
                                            <div className="col-sm-8">{detailPlayer.name}</div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-sm-4 fw-bold">Ngày sinh:</div>
                                            <div className="col-sm-8">{detailPlayer.dob}</div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-sm-4 fw-bold">Vị trí thi đấu:</div>
                                            <div className="col-sm-8">
                                                <span className="badge bg-secondary">{detailPlayer.position}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-sm-4 fw-bold">Giá chuyển nhượng:</div>
                                            <div className="col-sm-8 text-success fw-bold">
                                                {detailPlayer.price} $
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeDetail}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPlayerComponent;