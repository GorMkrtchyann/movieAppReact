import PropTypes from "prop-types";


export const Button = ({content, color, func}) => (
    <button
        style={{ background: color ? color : "#e3131b" }}
        onClick={func}
        className={"btn"}
    >{content}</button>
)

Button.propTypes = {
    content: PropTypes.any,
    color: PropTypes.string,
    func: PropTypes.func
}
