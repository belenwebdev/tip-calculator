function Tip(props) {
    return (
        <div 
            className={`tip-option ${props.selected ? "selected" : ""}`} 
            onClick={props.handleClick}
        >{props.tip}%</div>
    );
}

export default Tip;