


export const LandingSection = ({title, paragraph, img, position}) => {
    return(
        <div className={"landing__section"} style={{flexDirection: position ? "row" : "row-reverse"}}>
            <div className={"landing__section__text"}>
                <h1>{title}</h1>
                <p>{paragraph}</p>
            </div>
            {img}
        </div>
    )
}