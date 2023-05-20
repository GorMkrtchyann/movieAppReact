import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";

export const RandomMovies = React.memo(({list}) => {
    const [randMovies, setRandMovies] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setRandMovies([...list.sort((a, b) => a.rating < b.rating ? 1 : -1)])
    }, [])

    return(
        <div className={"movie__randomMovies"}>
            <h2>Best Movies / Top 7</h2>
            <div className={"movie__randomMovies__items"}>
                {
                    randMovies?.map((el, i) => {
                        if (i <= 6){
                            return(
                                <div
                                    key={el.id}
                                    className={"movie__randomMovies__item"}
                                    onClick={() => navigate(`/movies-details/${el.id}`)}
                                >
                                    <div className={"movie__randomMovies__item__img flax-center"}>
                                        <img src={el.img} alt=""/>
                                    </div>
                                    <p>{el.name}</p>
                                    <span>{el.genre}</span>
                                    <div className={"likes"}>
                                        <p>{el.rating}</p>
                                        <i className="fa-solid fa-heart"/>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
})