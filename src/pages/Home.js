import React, { useState, useEffect } from 'react'
import { qlPhimService } from '../services/QuanLyPhimService';
import { NavLink } from 'react-router-dom';
import '../css/Home.css';
import Carousel from '../templates/CarouselTemplate/Carousel';
import Footer from '../templates/FooterTemplate/FooterTemplate';


const Home = (props) => {
    let [danhSachPhim, setDanhSachPhim] = useState([]);
    const renderDanhSachPhim = () => {
        return danhSachPhim.slice(0, 9).map((phim, index) => {
            return <div key={index} className="col-4 card__setting">
                <div className="card text-left">
                    <img className="card-img-top home__img" src={phim.hinhAnh} alt={phim.hinhAnh} />
                    <div className="card-body">
                        <h4 className="card-title">{phim.tenPhim.length < 20 ? phim.tenPhim : phim.tenPhim.slice(0, 20) + "..."}</h4>
                        <NavLink to={`/moviedetail/${phim.maPhim}`} className="btn btn-success">Đặt vé</NavLink>
                    </div>
                </div>
            </div>
        })
    }
    
    useEffect(() => {
        qlPhimService.layDanhSachPhim().then(result => {
            console.log(result.data);
            setDanhSachPhim(result.data);
        }).catch(errors => { 
            console.log(errors.response.data);
        })
    }, []); 
    return (
        <div className="container">
            <Carousel/>
            <div className="display-4 home__tittle mg__t10">- Phim mới nhất -</div>
            <div className="row">
                {renderDanhSachPhim()}
            </div>
            
        </div>
    )
}


export default Home