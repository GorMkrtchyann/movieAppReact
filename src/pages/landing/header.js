import {Images} from "../../assats/images/images";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AllContext} from "../../utils/context";
import {Button} from "../../components/button";
import {useNavigate} from "react-router";

export const Header = () => {
    const {userInfo, setUserInfo} = useContext(AllContext)
    const navigate = useNavigate()

    const logOut = () => {
        setUserInfo({})
        localStorage.setItem("_login", "{}")
        navigate(0)
    }

    return(
        <div className={"landing__header"} id={"start"}>
            <div className="container">
                <div className={"landing__header__top"}>
                    <img src={Images.logo} alt=""/>
                    {
                        userInfo.userName === "admin" ?
                            <div className={"flax-center"}>
                                <Link to={"/movies/1"} className={"btn"}>Movies</Link>
                                <Link to={"/movies-settings"} className={"btn"} style={{marginRight: 15}}>Movies Settings</Link>
                                <Button
                                    content={<i className="fa-solid fa-arrow-right-from-bracket"/>}
                                    func={logOut}
                                />
                            </div>
                        :
                            !userInfo.id ?
                            <div>
                                <Link to={"/registration"} className={"btn"}>Registration</Link>
                                <Link to={"/login"} className={"btn"}>Login</Link>
                            </div>
                                :
                                <div>
                                    <Link to={"/movies/1"} className={"btn"}>Movies</Link>
                                    <Button
                                    content={<i className="fa-solid fa-arrow-right-from-bracket"/>}
                                    func={logOut}
                                    />
                                </div>
                    }
                </div>
                <div className={"landing__header__main flax-center"}>
                    <h1>Best Movies Hare</h1>
                    <p>Watch anywhere. Cancel anytime.</p>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  width="512" height="512" x="0" y="0" viewBox="0 0 128 128">
                        <g><path d="M64 104a3.988 3.988 0 0 1-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0L64 94.344l37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40A3.988 3.988 0 0 1 64 104zm2.828-33.172 40-40c1.563-1.563 1.563-4.094 0-5.656s-4.094-1.563-5.656 0L64 62.344 26.828 25.172c-1.563-1.563-4.094-1.563-5.656 0s-1.563 4.094 0 5.656l40 40C61.953 71.609 62.977 72 64 72s2.047-.391 2.828-1.172z" fill="#e3131b" className=""/></g>
                    </svg>
                </div>
            </div>
        </div>
    )
}