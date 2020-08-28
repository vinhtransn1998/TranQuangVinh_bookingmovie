import React, { useState, useEffect, Fragment } from 'react'
import { qlPhimService } from '../services/QuanLyPhimService';
import { userLogin } from '../config/settings';
import { Redirect } from 'react-router-dom';
import { qlNguoiDung } from '../services/QuanLyNguoiDungService';

export default function Showtime(props) {

    let [thongTinPhongVe, setThongTinPhongVe] = useState({});
    let [danhSachGheDangDat,setDanhSachGheDangDat] = useState([]);

    useEffect(() => {
        let { maLichChieu } = props.match.params;
        qlPhimService.layThongTinPhongVe(maLichChieu).then(res => {
           
            setThongTinPhongVe(res.data);
        }).catch(err => {
            console.log(err.response.data)
        })
    }, [])

    const renderDanhSachGhe = () => {

        let { danhSachGhe } = thongTinPhongVe;
        console.log(danhSachGhe)
        return danhSachGhe?.map((ghe, index) => {
            return <Fragment key={index}>
                {renderGhe(ghe.daDat, ghe)}
                {(index+1)%16===0 ? <br /> : ''}
            </Fragment>
        })
    }

    const datGhe = (ghe)=>{
        let index = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
        if(index !== -1)
        {
            danhSachGheDangDat.splice(index,1);
        }else {
            danhSachGheDangDat.push(ghe);
        }
        setDanhSachGheDangDat([...danhSachGheDangDat]);
    }

    const renderGhe = (daDat, ghe) => {
        if (daDat) {
            return <button className={'ghe gheDaDat'} disabled >X</button>
        } else {
            let cssGheDangDat = '';
            let index = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
            if(index !== -1)
            {
                cssGheDangDat = 'gheDangDat'
            }
            let cssGheVip = '';
            if(ghe.loaiGhe === 'Vip'){
                cssGheVip = 'gheVip';
            }
            return <button onClick={()=>{
                datGhe(ghe);
            }}  className={`ghe ${cssGheVip} ${cssGheDangDat}`} >{ghe.stt}</button>
        }
    }


    const renderThongTinPhim = () => {

        return <div>
            <h1 style={{ color: "white" }} className="display-4">{thongTinPhongVe.thongTinPhim?.tenPhim}</h1>
            <img style={{ width: 200, height: 300 }} src={thongTinPhongVe.thongTinPhim?.hinhAnh} />
            <h3 style={{ color: "white" }}>{thongTinPhongVe.thongTinPhim?.tenCumRap} - {thongTinPhongVe.thongTinPhim?.tenRap}</h3>
            <p style={{ color: "white" }}>{thongTinPhongVe.thongTinPhim?.diaChi}</p>
            <p style={{ color: "white" }}>Ngày chiếu: {thongTinPhongVe.thongTinPhim?.ngayChieu} - Giờ chiếu: {thongTinPhongVe.thongTinPhim?.gioChieu}</p>
            <div>
                {renderThongTinGheDangDat()}
                <button className="w-100 btn btn-success" onClick={()=>{
                    datVe()
                }}>ĐẶT VÉ</button>
            </div>
        </div>;
        
    }

    const datVe = () => {
        let thongTinDatVe = {
            "maLichChieu": props.match.params.maLichChieu,
            "danhSachVe": danhSachGheDangDat,
            "taiKhoanNguoiDung": JSON.parse(localStorage.getItem('userLogin')).taiKhoan
          }
        qlNguoiDung.datVe(thongTinDatVe).then(res=>{
            console.log(res.data);
            alert('Đặt vé thành công !')
            window.location.reload();
        }).catch(err=>{
            console.log(err.response.data);
        })
    }


    const renderThongTinGheDangDat = () => {
        return <div>
            {danhSachGheDangDat.map((gheDangDat,index)=>{
               return <span key={index}> Ghế {gheDangDat.tenGhe} </span>
            })} - {danhSachGheDangDat.reduce((tongTien,gheDangDat,index)=>{
                return tongTien+= gheDangDat.giaVe;
            },0).toLocaleString()} <span>VNĐ</span>
        </div>
    }

    if(!localStorage.getItem(userLogin)){
        console.log(userLogin, "login")
        alert('Đăng nhập để đặt vé !')
        return <Redirect to='/login' />
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6 text-center">
                    <div className="trapezoid mb-5 mt-5"></div>
                    {renderDanhSachGhe()}
                </div>
                <div className="col-6">
                    {renderThongTinPhim()}
                </div>
            </div>
        </div>
    )
}
