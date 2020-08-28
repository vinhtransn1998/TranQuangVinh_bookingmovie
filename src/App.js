import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import Home from './pages/Home'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Login from './pages/Login'
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate'
import Register from './pages/Register'
import MovieDetail from './pages/MovieDetail'
import Showtime from './pages/Showtime'
import Footer from './templates/FooterTemplate/FooterTemplate'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <Fragment>
          <Switch>
            <HomeTemplate exact path='/login' component={Login} />
            <HomeTemplate exact path="/" component={Home} />
            <HomeTemplate exact path="/home" component={Home} />
            <HomeTemplate exact path="/showtime/:maLichChieu" component={Showtime} />
            <HomeTemplate exact path="/register" component={Register} />
            <HomeTemplate exact path="/moviedetail/:maPhim" component={MovieDetail} />

           
            <AdminTemplate exact path="/admin" component={Home} />
          </Switch>
          <Footer/>
        </Fragment>
      </BrowserRouter>
    )
  }
}
