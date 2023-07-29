import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import NavBarContext from '../../context/NavBarContext'

import './index.css'

const Header = props => (
  <NavBarContext.Consumer>
    {value => {
      const {
        hamburgerIcon,
        activeHome,
        activeBooks,
        onClickOfNavHome,
        onClickOfNavBooks,
        onClickOfHamburger,
      } = value
      const addActiveHomeStyle = activeHome ? 'home' : ''
      const addActiveBookStyle = activeBooks ? 'book' : ''
      console.log(activeHome)
      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')

        history.replace('/login')
      }

      return (
        <>
          <div className="Header-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/duws9fktk/image/upload/v1687154074/Mini-Project/Login-page/Group_7731_gx5isg.png"
                className="header-logo"
                alt="website logo"
              />
            </Link>
            <ul className="desk-card">
              <Link to="/" className="link" onClick={onClickOfNavHome}>
                <li className={`home-nav ${addActiveHomeStyle}`}>Home</li>
              </Link>

              <Link to="/shelf" className="link" onClick={onClickOfNavBooks}>
                <li className={`books-nav ${addActiveBookStyle}`}>
                  BookShelves
                </li>
              </Link>
              <button
                type="button"
                className="Logout-button"
                onClick={onLogout}
              >
                Logout
              </button>
            </ul>
            <button
              type="button"
              className="hamburger-button"
              onClick={onClickOfHamburger}
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>
          {hamburgerIcon && (
            <ul className="mobile-card">
              <Link to="/" className="link" onClick={onClickOfNavHome}>
                <li className={`home-nav ${addActiveHomeStyle}`}>Home</li>
              </Link>

              <Link to="/shelf" className="link" onClick={onClickOfNavBooks}>
                <li className={`books-nav ${addActiveBookStyle}`}>
                  Bookshelves
                </li>
              </Link>
              <button
                type="button"
                className="Logout-button"
                onClick={onLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="close-button"
                onClick={onClickOfHamburger}
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </ul>
          )}
        </>
      )
    }}
  </NavBarContext.Consumer>
)

export default withRouter(Header)
