import { useForm } from "react-hook-form";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addMovie} from "../../store/movies/movies.action";
import {Button} from "../../components/button";
import axios from "axios";
import {useEffect, useMemo, useState} from "react";
import Spinner from "react-spinkit";


export const CreateMovie = () => {
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate()
    const movieList = useSelector((store) => store.moviesReducer.moviesList)
    const [isAdding, setIsAdding] = useState(false)
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const newList = [...movieList, {
            id: movieList.length + 1,
            name: data.name,
            img: data.img,
            date: data.date,
            genre: data.genre,
            about: data.about,
            rating: 0,
            trailer: data.trailer,
            shot: data.frame
        }]

        setIsAdding(true)
        axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/movies.json",
            {...newList}
        ).then(res => {
            dispatch(addMovie(res.data))
            navigate("/movies/1")
        })
    }

    return(
        <div className={"create_movie back100vh"}>
            <div className="container">
                <h1>Create Movie</h1>

                <form onSubmit={handleSubmit(onSubmit)} className={"create_movie__form"}>
                    <input placeholder={"Name"} {...register("name", { required: true })} />
                    <input placeholder={"Poster (link)"} {...register("img", { required: true })} />
                    <input placeholder={"Trailer (video link)"} {...register("trailer", { required: true })} />
                    <input placeholder={"Frame (image link)"} {...register("frame", { required: true })} />
                    <input type={"date"} {...register("date", { required: true })} />
                    <input placeholder={"Genre"} {...register("genre", { required: true })} />
                    <textarea placeholder={"About"} {...register("about", { required: true })} />
                    {isAdding && <Spinner name="ball-beat" />}
                    <Button content={"Create"}/>
                </form>
            </div>
        </div>
    )
}
