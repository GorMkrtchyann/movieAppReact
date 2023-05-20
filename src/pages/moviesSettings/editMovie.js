import { useForm } from "react-hook-form";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addMovie} from "../../store/movies/movies.action";
import {Button} from "../../components/button";
import axios from "axios";
import {useMemo, useState} from "react";
import Spinner from "react-spinkit";


export const EditMovie = () => {
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate()
    const movieList = useSelector((store) => store.moviesReducer.moviesList)
    const [isAdding, setIsAdding] = useState(false)
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        movieList?.map(el => {
            if (el.name === data.movie){
                el.name = data.name ? data.name : el.name
                el.img = data.img ? data.img : el.img
                el.date = data.date ? data.date : el.date
                el.genre = data.genre ? data.genre : el.genre
                el.about = data.about ? data.about : el.about
                el.rating = data.rating ? +data.rating : el.rating
                el.trailer = data.trailer ? data.trailer : el.trailer
                el.shot = data.frame ? data.frame : el.frame
            }
        })
        setIsAdding(true)
        axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/movies.json",
            {...movieList}
        ).then(res => {
            console.log(Object.values(res.data))
            dispatch(addMovie(Object.values(res.data)))
            navigate("/movies/1")
        })
    }


    return(
        <div className={"edit_movie back100vh"}>
            <div className="container">
                <h1>Edit Movie</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={"create_movie__form"}>
                    <select {...register("movie", {required: true})}>
                        <option value="">Movie Name</option>
                        {movieList?.map(el => (
                            <option value={el.name} key={el.id}>{el.name}</option>
                        ))}
                    </select>
                    <input placeholder={"Name"} {...register("name")} />
                    <input placeholder={"Poster (link)"} {...register("img")} />
                    <input placeholder={"Trailer (video link)"} {...register("trailer")} />
                    <input placeholder={"Frame (image link)"} {...register("frame")} />
                    <input type={"date"} {...register("date")} />
                    <div className={"flax-center"}>
                        <input placeholder={"Genre"} {...register("genre")} />
                        <input type={"number"} placeholder={"Rating"} {...register("rating")} />
                    </div>
                    <textarea placeholder={"About"} {...register("about")} />
                    {isAdding && <Spinner name="ball-beat" />}
                    <Button content={"Edit"}/>
                </form>
            </div>
        </div>
    )
}
