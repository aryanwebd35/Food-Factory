import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Food Factory is your one-stop destination for delicious, freshly prepared meals. We source the finest ingredients to bring you a dining experience that delighted your taste buds, delivered right to your doorstep.</p>
          <div className="footer-social-icons">
            <a href="https://github.com/aryanwebd35" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/aryan-srivastava-223694269/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/ary.sri_35/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>CONTACT ME</h2>
          <ul>
            <li><a href="https://aryan35.vercel.app/" target="_blank" rel="noopener noreferrer">🌐 Contact Me</a></li>
            <li><a href="https://github.com/aryanwebd35" target="_blank" rel="noopener noreferrer">🐙 GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/aryan-srivastava-223694269/" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a></li>
            <li><a href="https://www.instagram.com/ary.sri_35/" target="_blank" rel="noopener noreferrer">📸 Instagram</a></li>
            <li><a href="mailto:aryansri6362@gmail.com">📧 aryansri6362@gmail.com</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li><a href="https://aryan35.vercel.app/" target="_blank" rel="noopener noreferrer">contact@https://aryan35.vercel.app/</a></li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © FoodFactory.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
