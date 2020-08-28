import axios from 'axios'
import {domain,groupID,userLogin} from '../config/settings';
export class QuanLyPhimService {


    layDanhSachPhim = () => {
        return axios({
            url:`${domain}/quanlyphim/laydanhsachphim?manhom=${groupID}`,
            method:'GET'
        });
    }
    layThongTinPhim = (maPhim) => {
        return axios({
            url:`${domain}/QuanLyRap/LayThongTinLichChieuPhim?maphim=${maPhim}`,
            method:'GET'
        });
    }
    layThongTinPhongVe = (maLichChieu) => {
        return axios({
            url:`${domain}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
            method:'GET'
        })
    }
}



export const qlPhimService = new QuanLyPhimService();