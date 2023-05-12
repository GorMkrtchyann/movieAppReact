import LoginImg from "../../assats/images/login-img.png"
import {useState} from "react";
import {useNavigate} from "react-router";

export const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email === "admin@admin.com" && password === "admin"){
            navigate("/movies")
        }else{
            alert("Error")
        }
    }

    return(
        <div className={"login flax-center"}>
            <img src={LoginImg} alt="loginimg"/>
            <form className={""} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder={"Enter your email address..."}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder={"Enter your password..."}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input type="submit" value={"login"} className={"btn"}/>
                <p>Forgot password</p>
            </form>
        </div>
    )
}