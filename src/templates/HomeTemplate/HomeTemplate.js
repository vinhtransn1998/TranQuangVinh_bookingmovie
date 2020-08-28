import React, { Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './HomeTemplate.css'


const HomeLayout = (props) => {

    const taiKhoan = useSelector((state) => state.quanLyNguoiDungReducer.taiKhoan)

    console.log('hookselect', taiKhoan);

    const renderLogin = () => {
        if (taiKhoan !== '') {
            return <span className="nav-link" style={{color:"white"}} >Hello ! {taiKhoan}</span>
        }
        return <NavLink className="nav-link" style={{color:"white"}} to="/login">Login</NavLink>
    }

    return (
        <Fragment>

            <nav className="navbar navbar-expand-lg  bg__nav fixed-top">
                <NavLink className="navbar-brand logo color" to="/home">PhimX<span className="logo__after">.com</span></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{color:"white"}} />
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <NavLink className="nav-link color" to="/home">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link color" to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    {renderLogin()}
                                </li>
                            </ul>
                        </div>

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            {props.children}
        </Fragment >
    )

}
export const HomeTemplate = (props) => {
    return <Route path={props.path} {...props.exact} render={(propsComponent) => {
        return (
            <HomeLayout>
                <props.component {...propsComponent} />
            </HomeLayout>
        )
    }} />

}
