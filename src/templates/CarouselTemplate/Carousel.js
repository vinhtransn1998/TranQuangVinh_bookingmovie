import React, { useState, useEffect } from 'react'
import { qlPhimService } from '../../services/QuanLyPhimService';

import '../../css/Carousel.css';


const Carousel = (props) => {
    let [danhSachPhim, setDanhSachPhim] = useState([]);
    const renderCarousel = () => {
        return danhSachPhim.slice(0, 9).map((phim, index) => {
            return (
                <div key={index} className={index == 0 ? "carousel-item active" :"carousel-item"} >
                    <img src={phim.hinhAnh} className="d-block w-100 carousel__img" alt={phim.tenPhim} />
                </div>
            )
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
        <div id="carouselExampleControls" className="carousel slide" style={{marginTop: "85px"}} data-ride="carousel">
            <div className="carousel-inner">
                {renderCarousel()}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>

    )
}


export default Carousel;