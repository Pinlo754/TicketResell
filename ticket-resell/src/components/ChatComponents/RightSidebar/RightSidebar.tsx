import React from 'react'
import './RightSidebar.css'
import assets from '../../../assets/assetsChat'
import { useNavigate } from 'react-router-dom'
const RightSidebar = () => {
  const navigate = useNavigate()
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.hongle} className='khongchinhdc' alt="" /> 
        <h3>Hồng Lê <img className='dot' src={assets.green_dot}  alt="" /></h3>
        <p>Description</p>
      </div>
        <hr />
        <div className="rs-media">
          <p>Media</p>
          <div>
            <img src={assets.pic1} alt="" />
            <img src={assets.pic2} alt="" />
            <img src={assets.pic3} alt="" />
            <img src={assets.pic4} alt="" />
            <img src={assets.pic1} alt="" />
            <img src={assets.pic3} alt="" />
          </div>
        </div>
          <button onClick={() => navigate('/main')}>Return</button>
    </div>
  )
}

export default RightSidebar
