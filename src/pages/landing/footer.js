import {Images} from "../../assats/images/images";
import {Link} from "react-router-dom";


export const Footer = () => {
    return(
        <div className={"landing__footer"}>
            <div className="container flax-center">
                <img src={Images.twoColorLogo} alt="logo"/>
                <div className="landing__footer__list">
                    <Link to={""}>Login</Link>
                    <Link to={""}>Registration</Link>
                    <Link to={""}>Movies</Link>
                </div>
                <div className="landing__footer__list">
                    <Link to={"#start"}>Start</Link>
                    <Link to={"#info"}>Info</Link>
                    <Link to={"#opinion"}>Opinion</Link>
                </div>
            </div>
        </div>
    )
}