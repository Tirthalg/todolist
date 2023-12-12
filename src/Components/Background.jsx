import React from 'react'
import dark from './Assets/dark.png'
import light from './Assets/light.jpg'

export const Background = ({theme}) => {
    return (
        <div className='absolute top-0 left-0 -z-10'>
            <img src={theme ? dark : light} alt="BG" className='h-72 object-cover w-screen  transition duration-300' />
        </div>
    ) 
}
