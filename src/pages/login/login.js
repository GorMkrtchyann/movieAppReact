import {useNavigate} from "react-router";
import {Images} from "../../assats/images/images";
import {Button} from "../../components/button";
import { useForm } from "react-hook-form";
import {useSelector} from "react-redux";
import {useContext} from "react";
import {AllContext} from "../../utils/context";

export const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm();
    const userList = useSelector(store => store.userReducer.users)
    const {setUserInfo} = useContext(AllContext)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        data = watch()
        clearErrors("userAcc")
        if (data.email === "admin@admin.com" && data.password === "admin"){
            setUserInfo({
                id: "admin",
                userName: "admin"
            })
            navigate("/movies/1")
        }else{

            let user = userList.find(el => (el.userEmail === data.email && el.password === data.password))
            setUserInfo({
                id: user?.id,
                userName: user?.userName
            })
            localStorage.setItem("_login", JSON.stringify({
                id: user?.id,
                userName: user?.userName
            }))
            user?.id ? navigate("/movies/1") : setError("userAcc", {type: "input",  message: 'Something is wrong'})
        }
    }

    return(
        <div className={"login flax-center"}>
            <img src={Images.logo} alt="login_img"/>
            <form onSubmit={handleSubmit(onSubmit, onSubmit)}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder={"Enter your email address..."}
                    required
                    {...register("email", {required: true})}
                />
                <input
                    type="password"
                    placeholder={"Enter your password..."}
                    required
                    {...register("password",{required: true})}
                />
                {errors.userAcc && <span className={"err"}>{errors.userAcc?.message}</span>}
                <Button content={"Login"}/>
            </form>
        </div>
    )
}