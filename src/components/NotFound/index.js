import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-card">
    <img
      src="https://res.cloudinary.com/duws9fktk/image/upload/v1687252537/Mini-Project/no-search-img/Group_7484_lh3jsk.png"
      className="no-found-img"
      alt="not found"
    />
    <h1 className="not-found-para">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="back-to-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
