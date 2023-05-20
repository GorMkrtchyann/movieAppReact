import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {PaginatedItems} from "./paginatedItems";
import {RandomMovies} from "./randomMovies";
import {Images} from "../../assats/images/images";
import {useContext, useEffect} from "react";
import {AllContext} from "../../utils/context";
import {Button} from "../../components/button";
import {useNavigate} from "react-router";

export const Movies = () => {
    const movieList = useSelector(store => store.moviesReducer.moviesList)
    const navigate = useNavigate()

    const {userInfo, setUserInfo} = useContext(AllContext)

    useEffect(() => {
        userInfo.userName ? localStorage.setItem("_login", JSON.stringify(userInfo)) : navigate("/")
    }, [])

    const logOut = () => {
        setUserInfo({})
        localStorage.setItem("_login", "{}")
        navigate("/")
    }

    return(
        <div className={"movie"}>
            <div className="container">
                <div className={"movie__top"}>
                    <img src={Images.logo} alt=""/>
                    <div className={"flax-center"}>
                        {
                            userInfo.userName === "admin" ?
                                <div style={{gap: 15}} className={"flax-center"}>
                                    <Link to={"/movies-settings"}>Movie Settings</Link>
                                    <Button
                                        content={<i className="fa-solid fa-arrow-right-from-bracket"/>}
                                        func={logOut}
                                    />
                                </div>
                                :
                                <div className={"user"}>
                                    <p>{userInfo.userName}</p>
                                    <Button
                                        content={<i className="fa-solid fa-arrow-right-from-bracket"/>}
                                        func={logOut}
                                    />
                                </div>
                        }
                        <Link to={"/"}><i className="fa-solid fa-house"/> Home</Link>
                    </div>
                </div>
                <h1>Movies</h1>
                <RandomMovies list={[...movieList]}/>
                <div className={"movie__section"}>
                    <PaginatedItems itemsPerPage={10} items={movieList} />,
                </div>
            </div>
        </div>
    )
}