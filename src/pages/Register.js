import React, { Component } from 'react'

export default class Register extends Component {

    state = {
        values: {
            hoTen: '',
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDienThoai: ''
        },
        errors: {
            hoTen: '',
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDienThoai: ''
        }

    }

    handleChangeInput = (event) => {
        let { value, name } = event.target;
        let newValues = {
            ...this.state.values,
            [name]: value
        }

        let newErrors = {
            ...this.state.errors,
            [name]: value === '' ? 'Không được bỏ trống!' : ''
        }

        if (name === 'email') {
            let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (value.match(regexEmail)) {
                newErrors.email = '';
            } else {
                newErrors.email = 'Email không hợp lệ !';
            }
        }




        this.setState({ values: newValues, errors: newErrors });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let {values,errors} = this.state;
        let valid = true;
        for(let key in values){
            if(values[key] === ''){
                valid = false;
            }
        }
        for(let key in errors){
            if(errors[key] !== '') {
                valid = false;
            }
        }
        if(!valid){
            alert('Thông tin không hợp lệ!');
            return;
        }
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h3 className="display-4">Đăng ký</h3>
                <div className="form-group">
                    <span style={{color:"white"}}>Họ tên</span>
                    <input className="form-control" name="hoTen" onChange={this.handleChangeInput} />
                    <span className="text-danger">{this.state.errors.hoTen}</span>
                </div>
                <div className="form-group">
                    <span style={{color:"white"}}>Tài khoản</span>
                    <input className="form-control" name="taiKhoan" onChange={this.handleChangeInput} />
                    <span className="text-danger">{this.state.errors.taiKhoan}</span>

                </div>

                <div className="form-group">
                    <span style={{color:"white"}}>Mật khẩu</span>
                    <input type="password" className="form-control" name="matKhau" onChange={this.handleChangeInput} />
                    <span className="text-danger">{this.state.errors.matKhau}</span>

                </div>
                <div className="form-group">
                    <span style={{color:"white"}}>Email</span>
                    <input className="form-control" name="email" onChange={this.handleChangeInput} />
                    <span className="text-danger">{this.state.errors.email}</span>

                </div>
                <div className="form-group">
                    <span style={{color:"white"}}>Số điện thoại</span>
                    <input className="form-control" name="soDienThoai" onChange={this.handleChangeInput} />
                    <span className="text-danger">{this.state.errors.soDienThoai}</span>

                </div>
                <div className="form-group">
                    <button style={{color:"white"}} type="submit" className="btn btn-success">Đăng ký</button>
                </div>
            </form>
        )
    }
}
