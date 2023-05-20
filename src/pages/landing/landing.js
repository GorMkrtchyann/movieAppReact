import {Header} from "./header";
import {LandingSection} from "../../components/landingSection";
import {Images} from "../../assats/images/images";
import {Opinion} from "./opinion";
import {Footer} from "./footer";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AllContext} from "../../utils/context";
import {useNavigate} from "react-router";
import axios from "axios";
import {addOpinion} from "../../store/opinion/opinion.action";
import {Loader} from "../../components/loader";
import {Modal} from "./modal";
import {Button} from "../../components/button";


export const Landing = () => {
    const opinions = useSelector(store => store.opinionReducer.opinions)
    const navigate = useNavigate()
    const {modalShow, checkLogin} = useContext(AllContext)
    const dispatch = useDispatch()
    const [isGet, setIsGet] = useState(false)

    useEffect(() => {
        axios.get("https://filmex-movies-app-default-rtdb.firebaseio.com/opinion.json"
        ).then(res => {
            dispatch(addOpinion(res.data))
            setIsGet(true)
        })
    }, [])

    const watchMovieBtn = () => checkLogin(() => navigate("/movies/1"))

    return(
        isGet ?
            <div className={"landing"}>
                <Modal className={modalShow && true} text={"You are not logged in"} link={"/login"} linkText={"Login"}/>
                <Header/>
                <div className="container">
                    <LandingSection
                        title={"Free Movie Watching"}
                        paragraph={"Watch Movies Free Whit Us"}
                        img={Images.freeImg}
                        position={true}
                    />
                    <LandingSection
                        title={"Watch Everywhere"}
                        paragraph={"Watch Movies On Your Devise Everywhere"}
                        img={Images.everywhereImg}
                        position={false}
                    />
                    <button className={"start-btn"} onClick={watchMovieBtn}>Start Watching <i className="fa-sharp fa-solid fa-ticket"/></button>
                    <Opinion opinions={opinions}/>
                </div>
            <Footer/>
        </div>
            :
            <Loader/>
    )
}