import {Button} from "../../components/button";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AllContext} from "../../utils/context";


export const Modal = ({text, link, linkText, className}) => {
    const {setModalShow} = useContext(AllContext)

    const closeModal = () => setModalShow(false)

    return(
        <div className={`modal ${className && "active"}`}>
            <p>{text}</p>
            <Link to={link}>{linkText}</Link>
            <Button content={"OK"} func={closeModal}/>
        </div>
    )
}