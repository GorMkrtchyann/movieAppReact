import {useDispatch, useSelector} from "react-redux";
import {addOpinion} from "../store/opinion/opinion.action";
import {useCallback, useContext, useMemo, useRef, useState} from "react";
import axios from "axios";
import {AllContext} from "../utils/context";
import {addUpdateUserList} from "../store/user/user.action";
import React from "react";

export const OpinionItem = ({id, name, paragraph, likes}) => {
    const handleDragStart = (e) => e.preventDefault();
    const opinions = useSelector(store => store.opinionReducer.opinions)
    let userList = useSelector(store => store.userReducer.users)
    const {userInfo, checkLogin} = useContext(AllContext)
    const dispatch = useDispatch()
    const ref = useRef()

    useMemo(() => {userList = [...userList]}, [userList])

    const Liking = useCallback((id) => {
        if (ref.current.classList[1] !== "active"){
            opinions.map(i => {
                if (i.id === id){
                    i.likes += 1
                }
            })
            dispatch(addOpinion([...opinions]))
            ref.current.classList.add("active")
            axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/opinion.json", {
                ...opinions
            }).catch(err => alert(err))

            userList.map(i => {
                if (i.userName === userInfo.userName){
                    let arr = i?.likesOpinion
                    i.likesOpinion = arr ? [...arr, id] : [id]
                }
            })
            dispatch(addUpdateUserList([...userList]))
            addBase()
        }
    }, [])

    const addBase = () => {
        axios.patch("https://filmex-movies-app-default-rtdb.firebaseio.com/users.json",
            {...userList}
        ).then(res => res.status === 200)
    }
    useMemo(() => addBase, [userList])

    const wasLiked = () => {
        let finding = userList?.find(el => (el?.userName === userInfo?.userName))?.likesOpinion?.find(el => (el === id))
        return finding ? "active" : ""
    }

    return(
        <div className={"landing__opinion__item"} onDragStart={handleDragStart} role="presentation">
            <h3>{name}</h3>
            <div className={`like ${wasLiked()}`} onClick={() => checkLogin(() => Liking(id))} ref={ref}>
                <span>{likes}</span>
                <i className="fa-solid fa-heart"/>
            </div>
            <p>{paragraph}</p>
        </div>
    )
}