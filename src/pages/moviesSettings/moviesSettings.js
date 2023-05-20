import {Link} from "react-router-dom";


export const MoviesSetting = () => {

    return(
        <div className={"movies_settings flax-center back100vh"} >
            <Link to={"/movies-settings/create"} className={"flax-center"}>
                <span className={"flax-center"}><i className="fa-solid fa-plus"/> Create Movie</span>
            </Link>
            <Link to={"/movies-settings/edit"} className={"flax-center"}>
                <span className={"flax-center"}><i className="fa-solid fa-pen-to-square"/> Edit Movie</span>
            </Link>
        </div>
    )
}