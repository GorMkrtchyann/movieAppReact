import {Route, Routes} from "react-router";
import {Login} from "./pages/login/login";
import {Movies} from "./pages/movies/movies";
import {MoviesDetails} from "./pages/moviesDetalis/moviesDetalis";
import {CreateMovie} from "./pages/moviesSettings/createMovie";
import {Landing} from "./pages/landing/landing";
import {Registration} from "./pages/registration/registration";
import {useDispatch} from "react-redux";
import {addUpdateUserList} from "./store/user/user.action";
import {useContext, useEffect} from "react";
import {AllContext} from "./utils/context";
import axios from "axios";
import {addMovie} from "./store/movies/movies.action";
import {MoviesSetting} from "./pages/moviesSettings/moviesSettings";
import {EditMovie} from "./pages/moviesSettings/editMovie";
import {Error} from "./pages/error/error";

function App() {
    const {userInfo, setUserInfo} = useContext(AllContext)
    const dispatch = useDispatch()

    !localStorage.getItem("_login") &&
    localStorage.setItem("_login", JSON.stringify(userInfo))


    useEffect(() => {
        let loginInfo = JSON.parse(localStorage.getItem("_login"))
        setUserInfo({
            id: loginInfo?.id,
            userName: loginInfo?.userName
        })

        const getUser = async() => {
            await axios.get("https://filmex-movies-app-default-rtdb.firebaseio.com/users.json"
            ).then(res => {
                dispatch(addUpdateUserList(res.data))
            })
        }
        getUser().then(getMovie)
    }, [])

    const getMovie = () => {
        axios.get("https://filmex-movies-app-default-rtdb.firebaseio.com/movies.json"
        ).then(res => {
            dispatch(addMovie(res.data))
        }).catch(err => console.log(err))
    }

    return (
      <Routes>
        <Route path={"/"} element={<Landing/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/registration"} element={<Registration/>}/>
        <Route path={"/movies/:page"} element={<Movies/>}/>
        <Route path={"/movies-details/:id"} element={<MoviesDetails/>}/>
          {
              userInfo?.userName === "admin" &&
                  <>
                      <Route path={"/movies-settings"} element={<MoviesSetting/>}/>
                      <Route path={"/movies-settings/create"} element={<CreateMovie/>}/>
                      <Route path={"/movies-settings/edit"} element={<EditMovie/>}/>
                  </>
          }
        <Route path={"*"} element={<Error/>}/>
      </Routes>
  );
}

export default App;
