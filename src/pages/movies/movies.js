import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";

export const Movies = ({moviesList}) => {
    const navigate = useNavigate()
    const movieList = useSelector((state) => state.moviesReducer.moviesList)

    return(
        <div className={"movie container"}>
            <h1>Movies</h1>
            <Link to={"/create-movie"} className={"create"}>Create Movie</Link>
            <div className={"movie__section"}>
                {
                    movieList?.map(el => {
                        return(
                            <div
                                key={el.id}
                                className={"movie__section__item"}
                                onClick={() => navigate(`/movies-details/${el.id}`)}
                            >
                                <div className={"movie__section__item__img"}>
                                    <img src={el.img} alt="k"/>
                                </div>
                                <p>{el.name}</p>
                                <b>{el.genre}</b>
                                <span>{el.date}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

Movies.propTypes = {
    moviesList: PropTypes.array
}