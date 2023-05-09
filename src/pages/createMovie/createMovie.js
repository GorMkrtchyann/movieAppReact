import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router";


export const CreateMovie = ({ moviesList, func }) => {
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        func([...moviesList, {
            id: Math.floor(Math.random() * 1000),
            name: data.name,
            img: data.img,
            date: data.date,
            genre: data.genre,
            comment: [],
            about: data.about
        }])
        navigate("/movies")
    }

    return(
        <div className={"create_movie container"}>
            <h1>Create Movie</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={"create_movie__form"}>
                <input placeholder={"Name"} {...register("name", { required: true })} />
                <input placeholder={"Poster"} {...register("img", { required: true })} />
                <input type={"date"} placeholder={"Date"} {...register("date", { required: true })} />
                <input placeholder={"Genre"} {...register("genre", { required: true })} />
                <textarea placeholder={"About"} {...register("about", { required: true })} />
                <button>Create</button>
            </form>
        </div>
    )
}

CreateMovie.propTypes = {
    moviesList: PropTypes.array,
    func: PropTypes.func
}