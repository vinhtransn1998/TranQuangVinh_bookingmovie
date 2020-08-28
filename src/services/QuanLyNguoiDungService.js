import axios from 'axios';
import {domain,token,userLogin,groupID} from '../config/settings'
export class QuanLyNguoiDung {
    
    dangNhap = (userLogin) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/DangNhap`,
            method:'post',
            data:userLogin
        })
    }
    datVe = (thongTinDatVe) => {
        return axios({
            url: `${domain}/quanlydatve/datve`,
            method:'post',
            data:thongTinDatVe,
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem(token)
            }
        })
    }
}


export const qlNguoiDung = new QuanLyNguoiDung();