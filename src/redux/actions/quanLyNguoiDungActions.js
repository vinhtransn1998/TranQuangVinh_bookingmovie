import {DANG_NHAP} from '../types/quanLyNguoiDungTypes'


export const dangNhapAction = (taiKhoan) => {
    return {
        type:DANG_NHAP,
        taiKhoan
    }
}

