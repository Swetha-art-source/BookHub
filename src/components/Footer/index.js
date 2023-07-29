import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-body">
    <ul className="items-card">
      <li key="google-id">
        <button type="button" className="button-icon">
          <FaGoogle className="web-icon" />
        </button>
      </li>
      <li key="twitter-id">
        <button type="button" className="button-icon">
          <FaTwitter className="web-icon" />
        </button>
      </li>
      <li key="instagram-id">
        <button type="button" className="button-icon">
          <FaInstagram className="web-icon" />
        </button>
      </li>
      <li key="you-tube-id">
        <button type="button" className="button-icon">
          <FaYoutube className="web-icon" />
        </button>
      </li>
    </ul>
    <p className="contact">Contact Us</p>
  </div>
)

export default Footer
