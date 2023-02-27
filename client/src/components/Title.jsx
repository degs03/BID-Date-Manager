import React from 'react'
import { Link } from 'react-router-dom'

const Title = ({path, text, title}) => {
    return (
        <div className='container d-flex flex-column text-center'>
            <Link to={path} className='btn mt-3' style={{backgroundColor:'#2a78e5',color:'white', width:'150px'}}>{text}</Link>
            <h1 className='text-center'>{title}</h1>
        </div>
    )
}

export default Title;