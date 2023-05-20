import {useNavigate} from "react-router";
import {Images} from "../../assats/images/images";
import {Button} from "../../components/button";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addUpdateUserList} from "../../store/user/user.action";
import { v4 as uuidv4 } from 'uuid';
import {useContext, useMemo, useState} from "react";
import {AllContext} from "../../utils/context";
import axios from "axios";
import Spinner from "react-spinkit"

export const Registration = () => {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, setError, clearErrors } = useForm();
    const userList = useSelector(store => store.userReducer.users)
    const dispatch = useDispatch()
    const {userInfo, setUserInfo} = useContext(AllContext)
    const [showLoader, setShowLoader] = useState(false)

    const onSubmit = (data) => {
        const uId = uuidv4()
        let list = [...userList, {
            id: uId,
            userName: data.name,
            userEmail: data.email,
            password: data.password,
            likesOpinion: [],
            likesMovies: []
        }]
        setUserInfo({
            id: uId,
            userName: data.name
        })
        setShowLoader(true)
        localStorage.setItem("_login", JSON.stringify(userInfo))
        axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/users.json",
            {...list}
        ).then(res => {
            dispatch(addUpdateUserList(res.data))
            navigate("/movies/1")
        })
    }



    const checkText = (type, text) => {
        userList?.map(el => {
            if (el[type] === text){
                setError(type, { type: 'have', message: 'Is Busy' });
            }else{
                clearErrors(type);
            }
        })
    }

    return(
        <div className={"reg flax-center"}>
            <img src={Images.logo} alt="img"/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Registration</h2>
                <input
                    type="text"
                    placeholder={"Enter your name..."}
                    {...register("name", {required: true})}
                    onChange={(e) => checkText("userName", e.target.value)}
                />
                {errors["userName"] && <span className={"err"}>{errors["userName"]?.message}</span>}
                {errors.name && <span className={"err"}>Fill</span>}
                <input
                    type="email"
                    placeholder={"Enter your email address..."}
                    {...register("email", {required: true})}
                    onChange={(e) => checkText("userEmail", e.target.value)}
                />
                {errors["userEmail"] && <span className={"err"}>{errors["userEmail"]?.message}</span>}
                {errors.email && <span className={"err"}>Fill</span>}
                <input
                    type="password"
                    placeholder={"Enter your password..."}
                    {...register("password", {required: true})}
                />
                {errors.password && <span className={"err"}>Fill</span>}
                {showLoader && <Spinner name="ball-beat" />}
                <Button content={"Registration"}/>
            </form>
        </div>
    )
}