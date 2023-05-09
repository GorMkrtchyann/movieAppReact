import PropTypes from "prop-types";
import {useParams} from "react-router";
import {useState} from "react";

export const MoviesDetails = ({ moviesList, func }) => {
    const params = useParams()
    const [comment, setComment] = useState()

    const findMovies = moviesList.find(el => el.id === +params.id)

    const commentSubmit = (e) => {
        e.preventDefault()
        moviesList?.map(el => {
            if (el.id === +params.id){
                el.comment = [...el.comment, comment]
            }
            return  func([...moviesList])
        })
    }

    return(
        <div className={"movie_details container"}>
            <h1>Movie Details</h1>
            <div className={"movie_details__item"}>
                {
                    <>
                        <div className={"movie_details__item__img"}>
                            <img src={findMovies.img} alt=""/>
                        </div>
                        <div className={"movie_details__item__info"}>
                            <h3>{findMovies.name}</h3>
                            <b>{findMovies.genre}</b>
                            <span>{findMovies.date}</span>
                            <p>{findMovies.about}</p>
                        </div>
                    </>
                }
            </div>

            <div className={"movie_details__comment"}>
                <h2>Comments</h2>
                <form className={"movie_details__comment__add"} onSubmit={commentSubmit}>
                    <input
                        type="text"
                        placeholder={"Enter your comment..."}
                        onChange={(e) => {setComment(e.target.value)}}
                        required
                    />
                    <button>Add</button>
                </form>
                {
                    findMovies.comment?.map((el, i) => (
                        <p key={i}>{el}</p>
                    ))
                }
            </div>
        </div>
    )
}

MoviesDetails.propTypes = {
    moviesList: PropTypes.array,
    func: PropTypes.func
}