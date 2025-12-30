/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import { Route, Router } from '@solidjs/router'
import Home from './pages/Home.tsx'
import Movies from './pages/Movies.tsx'
import MovieRate from './pages/MovieRate.tsx'

const root = document.getElementById('root')

render(() =>{
    return(
    <Router root={App}>
        <Route path={"/home"} component={Home}/>
        <Route path={"/movie"} component={Movies}/>
        <Route path={"/movier"} component={MovieRate}></Route>
    </Router>
    )
}
, root!)
