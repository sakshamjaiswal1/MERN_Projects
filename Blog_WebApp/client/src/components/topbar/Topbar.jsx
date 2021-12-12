import React from 'react'
import './topbar.css'
import { Link } from "react-router-dom"


function Topbar() {
    return (
        <div className='top'>
            <div className="topleft">
            <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter">
<ul className="toplist">
    <li className="toplistItem">
        {/* <Link className='link' to='li'>
        HOME
        </Link> */}
    </li>
    <li className="toplistItem" >ABOUT</li>
    <li className="toplistItem" >CONTACT</li>

</ul>
            </div>
        </div>
    )
}

export default Topbar
