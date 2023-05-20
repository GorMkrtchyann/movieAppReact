import {Images} from "../../assats/images/images";
import {Link} from "react-router-dom";


export const Error = () => (
    <div className={"error flax-center back100vh"}>
        <img src={Images.twoColorLogo} alt="logo"/>
        <h1>Error 404</h1>
        <Link to={"/"} className={"btn"}>Go Home</Link>
    </div>
)