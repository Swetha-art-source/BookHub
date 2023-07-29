import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {bookItem} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookItem

  return (
    <Link to={`/books/${id}`} className="book-link">
      <li className="book-item">
        <img src={coverPic} className="cover-image" alt={title} />
        <div className="details-card">
          <h1 className="book-title">{title}</h1>
          <p className="author-name">{authorName}</p>
          <p className="rating">
            Avg rating <BsFillStarFill className="start-icon" /> {rating}
          </p>
          <p className="status">
            Status: <span className="status-styel">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
