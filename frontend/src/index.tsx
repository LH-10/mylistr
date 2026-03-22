/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";
import { Route, Router } from "@solidjs/router";
import Home from "./pages/Home.tsx";
import Movies from "./pages/Movies.tsx";
import MovieRate from "./pages/MovieRate.tsx";
import AdminHome from "./adminpages/AdminHome.tsx";
import AdminGames from "./pages/Admin/AdminGames.tsx";
import AddAdminGames from "./pages/Admin/AdminAddGame.tsx";
import "solid-devtools";
const root = document.getElementById("root");

render(() => {
  return (
    <>
      {/* <AdminHome /> */}
      <Router>
        <Route path={"/"} component={AdminHome} />
        <Route path={"/home"} component={Home} />
        <Route path={"/movie"} component={Movies} />
        <Route path={"/games"}>
          <Route path={"/"} component={AdminGames} />
          <Route path={"/addnew"} component={AddAdminGames} />
        </Route>
        <Route path={"/movier"} component={MovieRate}></Route>
      </Router>
    </>
  );
}, root!);
