import {useParams} from "react-router";
import {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComment, addMovie} from "../../store/movies/movies.action";
import {Link} from "react-router-dom";
import axios from "axios";
import {addUpdateUserList} from "../../store/user/user.action";
import {AllContext} from "../../utils/context";
import {Loader} from "../../components/loader";

export const MoviesDetails = () => {
    const movieList = useSelector((state) => state.moviesReducer.moviesList)
    const userList = useSelector(store => store.userReducer.users)
    const {userInfo, checkLogin} = useContext(AllContext)
    const [comment, setComment] = useState()
    const [playBtnShow, setPlayBtnShow] = useState(true)
    const dispatch = useDispatch()
    const params = useParams()
    const ref = useRef()

    useEffect(() => {
        axios.get("https://filmex-movies-app-default-rtdb.firebaseio.com/movies.json"
        ).then(res => {
            dispatch(addMovie(res.data))
        })
    }, [])

    const findMovies = movieList.find(el => el.id === +params.id)

    const Liking = (id) => {
        if (ref.current.classList[1] !== "active"){
            findMovies.rating++
            dispatch(addMovie([...movieList]))
            ref.current.classList.add("active")
            axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/movies.json", {
                ...movieList
            }).catch(err => alert(err))

            userList.map(i => {
                if (i.userName === userInfo.userName){
                    let arr = i?.likesMovies
                    i.likesMovies = arr ? [...arr, id] : [id]
                }
            })
            dispatch(addUpdateUserList([...userList]))
            addBase()
        }
    }

    const addBase = () => {
        axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/users.json",
            {...userList}
        ).then(res => res.status === 200)
    }

    const wasLiked = () => {
        let finding = userList?.find(el => (el.userName === userInfo.userName))?.likesMovies?.find(el => (el === findMovies?.id))
        return finding ? "active" : ""
    }

    const commentSubmit = (e) => {
        e.preventDefault()
        movieList?.map(el => {
            if (el.id === +params.id){
                let com = el.comment ? el.comment : []
                el.comment = [...com,
                    {
                        userName: userInfo.userName,
                        main: comment
                    }
                ]
            }
            return dispatch(addComment([...movieList]))
        })
        axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/movies.json", {
            ...movieList
        }).catch(err => alert(err))
        setComment('')
    }

    return(
        movieList.length ?
            <div
                className={"movie_details"}
                style={{
                    background: `linear-gradient(45deg, rgba(0, 0, 0, 0.7) 0%, rgba(0,0,0,0.8) 100%), url(${findMovies?.shot})`,
                    backgroundSize: "cover",
                }}
            >
                <div className={"container"}>
                    <div className={"movie_details__top flax-center"}>
                        <h1>Movie Details</h1>
                        <Link className={"flax-center"} to={-1}><i className="fa-solid fa-arrow-left"/></Link>
                    </div>
                    <div className={"movie_details__item"}>
                        {
                            <>
                                <div className={`likes ${wasLiked()}`} onClick={() => checkLogin(() => Liking(findMovies?.id))} ref={ref} >
                                    <p>{findMovies?.rating}</p>
                                    <i className="fa-solid fa-heart"/>
                                </div>
                                <div className={"movie_details__item__img"}>
                                    <img src={findMovies?.img} alt=""/>
                                </div>
                                <div className={"movie_details__item__info"}>
                                    <h3>{findMovies?.name}</h3>
                                    <b>{findMovies?.genre}</b>
                                    <span>{findMovies?.date}</span>
                                    <p>{findMovies?.about}</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className={"movie_details__video"}>
                        <h2>Trailer</h2>
                        <div className={"flax-center"}>
                            {
                                playBtnShow && <i className="fa-solid fa-play"/>
                            }
                            <video src={findMovies?.trailer} controls poster={findMovies?.shot} onPlay={() => setPlayBtnShow(false)}/>
                        </div>
                    </div>
                    <div className={"movie_details__comment"}>
                        <h2>Comments</h2>
                        <form className={"movie_details__comment__add"} onSubmit={commentSubmit}>
                            <input
                                type="text"
                                placeholder={"Enter your comment..."}
                                onChange={(e) => {setComment(e.target.value)}}
                                value={comment}
                                required
                            />
                            <button>Add</button>
                        </form>
                        {
                            findMovies.comment && [...findMovies.comment].reverse().map((el, i) => (
                                <div className={"comment"} key={i}>
                                    <span>{el.userName}</span>
                                    <p>{el.main}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            :
            <Loader/>
    )
}
