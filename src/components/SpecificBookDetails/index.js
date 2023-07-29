import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificBookDetails extends Component {
  state = {bookDetails: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.callSpecificBookApi()
  }

  updateBookDetails = books => {
    const newBookDetails = {
      id: books.id,
      authorName: books.author_name,
      coverPic: books.cover_pic,
      aboutBook: books.about_book,
      rating: books.rating,
      readStatus: books.read_status,
      title: books.title,
      aboutAuthor: books.about_author,
    }
    this.setState({
      bookDetails: newBookDetails,
      apiStatus: apiConstants.success,
    })
  }

  callSpecificBookApi = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.updateBookDetails(data.book_details)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  specificBooksDetails = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails

    return (
      <>
        <div className="book-details-card">
          <div className="book-details-item">
            <img src={coverPic} className="book-image" alt={title} />
            <div className="details-item">
              <h1 className="specific-book-title">{title}</h1>
              <p className="specific-author-name">{authorName}</p>
              <p className="book-rating">
                Avg rating <BsFillStarFill className="book-start-icon" />{' '}
                {rating}
              </p>
              <p className="book-status">Status: {readStatus}</p>
            </div>
          </div>
          <h1 className="about-author-heading">About Author</h1>
          <p className="about-author-para">{aboutAuthor}</p>
          <h1 className="about-book-heading">About Book</h1>
          <p className="about-book-para">{aboutBook}</p>
        </div>
        <Footer />
      </>
    )
  }

  getFailureView = () => <FailureView callApi={this.callSpecificBookApi} />

  loadLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  getBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.specificBooksDetails()
      case apiConstants.failure:
        return this.getFailureView()
      case apiConstants.progress:
        return this.loadLoader()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="specific-book-container">
        <Header />
        <div className="book-body">{this.getBookDetails()}</div>
      </div>
    )
  }
}

export default SpecificBookDetails
