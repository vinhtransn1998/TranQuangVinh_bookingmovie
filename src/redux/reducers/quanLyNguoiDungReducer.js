import { DANG_NHAP } from "../types/quanLyNguoiDungTypes";

let taiKhoan = '';
if (localStorage.getItem('userLogin')) {
    taiKhoan = JSON.parse(localStorage.getItem('userLogin')).taiKhoan;
}


const initialState = {
    taiKhoan: taiKhoan
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DANG_NHAP:
            state.taiKhoan = action.taiKhoan;
            return {...state }
        default:
            return {...state };
    }

}