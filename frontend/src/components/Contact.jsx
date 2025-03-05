const Contact = (props) =>{
    const {id, name, number} = props.info
    
    return (
        <span>
            {name}: {number}
        </span>
    )
}

export default Contact