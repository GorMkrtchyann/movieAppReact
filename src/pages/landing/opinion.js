import {OpinionItem} from "../../components/opinionItem";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import {Button} from "../../components/button";
import { useForm } from "react-hook-form";
import {useDispatch} from "react-redux";
import {addOpinion} from "../../store/opinion/opinion.action";
import React, {useContext} from "react";
import axios from "axios";
import {AllContext} from "../../utils/context";

export const Opinion = React.memo(({opinions}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {userInfo} = useContext(AllContext)
    const dispatch = useDispatch()

    const responsive = {
        0: { items: 1 },
        651: { items: 2 },
        980: { items: 3 },
        1250: { items: 4 }
    };

    let items = []

    opinions.map(el => (
        items.push(<OpinionItem id={el.id} paragraph={el.paragraph} likes={el.likes} name={el.name}/>)
    ))

    const onSubmit = (data) => {
        let newList = [...opinions, {
            id: opinions.length + 1,
            name: userInfo.userName ? userInfo.userName :  data.name,
            paragraph: data.message,
            likes: 0
        }]
        dispatch(addOpinion(newList))
        axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/opinion.json", {
            ...newList
        }).catch(err => alert(err))
    }

    return(
        <div className={"landing__opinion"} id={"opinion"}>
            <div className={"landing__opinion__top"}>
                <h1>Opinion</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={"landing__opinion__add"}>
                    <div>
                        <input type="text" placeholder={"Name"} required
                               value={userInfo.userName}
                               {...register("name", {maxLength: 15})}
                        />
                        {errors.name && <span>Max Length 15</span>}
                    </div>
                    <div>
                        <input type="text" placeholder={"Opinion"} required {...register("message", {maxLength: 120})}/>
                        {errors.message && <span>Max Length 120</span>}
                    </div>
                    <Button content={"+"}/>
                </form>
            </div>
            <AliceCarousel mouseTracking items={items.reverse()} responsive={responsive} />
        </div>
    )
})