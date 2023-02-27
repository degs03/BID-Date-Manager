import React from 'react'
import { Link } from 'react-router-dom'
import DateList from '../components/DateList'
import Title from '../components/Title'

const Home = () => {

    return (
        <>
            <div className='container'>
                <Title path='/register/login' text='LOGOUT' title='Project Manager'/>
                <DateList />
                <Link className='btn mt-3' style={{ color: 'black', backgroundColor: '#9ec5f8' }} to='/date/new'>
                    <button className='m-1' style={
                        {
                            borderRadius: '100%',
                            backgroundColor: 'black',
                            color: '#9ec5f8',
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }
                    }>+</button>
                    Add New Project
                </Link>
            </div>
        </>
    )
}

export default Home