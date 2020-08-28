import React, { useState, useEffect } from 'react'
import { qlPhimService } from '../services/QuanLyPhimService';
import { NavLink } from 'react-router-dom';


var moment = require('moment');

export default function MovieDetail(props) {

    let [phim, setPhim] = useState({});


    useEffect(() => {
        qlPhimService.layThongTinPhim(props.match.params.maPhim).then(result => {
            setPhim(result.data)
        })
    }, [])

    return (
        <div className="container" style={{ marginTop: "74px" }}>
            <div className="row mt-3">
                <div className="col-4">
                    <img src={phim.hinhAnh} style={{ width: "100%", height: "300px" }} alt={phim.hinhAnh} />
                </div>
                <div className="col-8">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th style={{ width: 100, color: "white" }}>Tên phim</th>
                                <th style={{ color: "white" }}>{phim.tenPhim}</th>
                            </tr>
                            <tr>
                                <th style={{ color: "white" }}>Mô tả</th>
                                <th style={{ color: "white" }}>{phim.moTa}</th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row">
                        <h3 className="col-12" style={{ color: "white" }}>Thông tin lịch chiếu</h3>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    {phim.heThongRapChieu?.map((heThongRap, index) => {
                                        return <a key={index}
                                            className="nav-link"
                                            style={{ color: "white" }}
                                            id="v-pills-home-tab"
                                            data-toggle="pill"
                                            href={`#${heThongRap.maHeThongRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true">
                                            <img src={heThongRap.logo} style={{ width: 30, height: 30 }} alt={heThongRap.logo} /> {heThongRap.tenHeThongRap}
                                        </a>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="tab-content" id="v-pills-tabContent">
                                    {phim.heThongRapChieu?.map((heThongRap, index) => {
                                        return <div key={index} className="tab-pane fade show " id={heThongRap.maHeThongRap} role="tabpanel" aria-labelledby="v-pills-home-tab">
                                            {heThongRap.cumRapChieu?.map((cumRap, index) => {
                                                return <div key={cumRap.maCumRap}>
                                                    <h3 style={{ color: "white" }}>{cumRap.tenCumRap}</h3>
                                                    <div    className="row"
                                                            style={{ color: "white" }}>
                                                                {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                                console.log(cumRap.lichChieuPhim);
                                                                return <NavLink className="col-2" key={lichChieu.maLichChieu} to={`/showtime/${lichChieu.maLichChieu}`}>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}

                                        </div>
                                    })}
                                </div>
                            </div>
                        

                    </div>
                </div>
            </div>
        </div>
    )
}
