import React, { useState } from 'react'
import { qlNguoiDung } from '../services/QuanLyNguoiDungService';
import { userLogin, token } from '../config/settings';
import {useDispatch} from 'react-redux'
import { dangNhapAction } from '../redux/actions/quanLyNguoiDungActions';
const Login = (props) => {

    const dispatch = useDispatch();
    let [state, setState] = useState({
        values: {
            taiKhoan: '',
            matKhau: ''
        },
        errors: {
            taiKhoan: '',
            matKhau: ''
        }
    });
    let [ab,cv] = useState('a');
    console.log(ab)
    let [result,setResult] = useState('Chưa submit');
    const handleChangeInput = (event) => {
        let { value, name } = event.target;

        
        let newValues = {
            ...state.values,
            [name]: value
        }
        
        let newErrors = {
            ...state.errors,
            [name]: value === '' ? 'Không được bỏ trống!' : ''
        }
        
        setState({ values: newValues, errors: newErrors });
    }

    const handleSubmit = (event) => {
        cv("vb")
        event.preventDefault();
        qlNguoiDung.dangNhap(state.values).then(res=>{
            localStorage.setItem(userLogin,JSON.stringify(res.data));

            localStorage.setItem(token,res.data.accessToken);
            dispatch(dangNhapAction(res.data.taiKhoan));
            //
            props.history.push('/home')
            
        }).catch(error => {
            console.log(error.response.data);
        })
       
    }

    return (
        <form onSubmit={handleSubmit} className="container">
            <h1>{result}</h1>
            <h3 className="display-4">Đăng nhập</h3>
            <div className="form-group">
                <span>Tài khoản</span>
                <input name="taiKhoan" className="form-control" onChange={handleChangeInput} />
                <span className="text-danger">{state.errors.taiKhoan}</span>
            </div>
            <div className="form-group">
                <span>Mật khẩu</span>
                <input name="matKhau" type="password" className="form-control" onChange={handleChangeInput} />
                <span className="text-danger">{state.errors.matKhau}</span>
            </div>
            <div className="form-group">
                <button className="btn btn-success">Đăng nhập</button>
            </div>
        </form>

    )
}

export default Login;