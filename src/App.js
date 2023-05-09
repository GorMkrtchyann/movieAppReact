import {Route, Routes} from "react-router";
import {Login} from "./pages/login/login";
import {Movies} from "./pages/movies/movies";
import {MoviesDetails} from "./pages/moviesDetalis/moviesDetalis";
import {CreateMovie} from "./pages/createMovie/createMovie";
import {Images} from "./assats/images/images";
import {useState} from "react";

let moviesList = [
    {id: Math.floor(Math.random() * 1000), name: "Avatar", img: Images.Avatar, date: "09:07:1999", genre: "Fantasy", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "Ghost Rider", img: Images.GhostRider, date: "09:07:1999", genre: "Fantasy", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "Countdown", img: Images.Countdown, date: "09:07:1999", genre: "Horror", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "IT", img: Images.IT, date: "09:07:1999", genre: "Horror", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "House of Wax", img: Images.HouseOfWax, date: "09:07:1999", genre: "Horror", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "Demonic", img: Images.Demonic, date: "09:07:1999", genre: "Horror", about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "Doctor Strange in the Multiverse of Madness", img: Images.DoctorStrange, date: "09:07:1999", genre: "Fantasy", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "Brahms: The Boy", img: Images.Brahms, date: "09:07:1999", genre: "Horror", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "Dead Silence", img: Images.DeadSilence, date: "09:07:1999", genre: "Horror", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
    {id: Math.floor(Math.random() * 1000), name: "Brahms: The Boy II", img: Images.Brahms2, date: "09:07:1999", genre: "Horror", comment: [], about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}
]

function App() {
    const [list, setList] = useState(moviesList)

    return (
      <Routes>
        <Route path={"/"} element={<Login/>}/>
        <Route path={"/movies"} element={<Movies moviesList={list}/>}/>
        <Route path={"/movies-details/:id"} element={<MoviesDetails moviesList={list} func={setList}/>}/>
        <Route path={"/create-movie"} element={<CreateMovie moviesList={list} func={setList}/>}/>
        <Route path={"*"} element={<div>Error</div>}/>
      </Routes>
  );
}

export default App;
