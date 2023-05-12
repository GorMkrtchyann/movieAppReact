import {Route, Routes} from "react-router";
import {Login} from "./pages/login/login";
import {Movies} from "./pages/movies/movies";
import {MoviesDetails} from "./pages/moviesDetalis/moviesDetalis";
import {CreateMovie} from "./pages/createMovie/createMovie";
import {Images} from "./assats/images/images";
import {useState} from "react";

function App() {
    const [list, setList] = useState([])

    return (
      <Routes>
        <Route path={"/"} element={<Login/>}/>
        <Route path={"/movies"} element={<Movies/>}/>
        <Route path={"/movies-details/:id"} element={<MoviesDetails moviesList={list} func={setList}/>}/>
        <Route path={"/create-movie"} element={<CreateMovie moviesList={list} func={setList}/>}/>
        <Route path={"*"} element={<div>Error</div>}/>
      </Routes>
  );
}

export default App;
