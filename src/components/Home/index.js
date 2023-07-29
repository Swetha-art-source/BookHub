import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import NavBarContext from '../../context/NavBarContext'
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

class Home extends Component {
  state = {
    topRatedList: '',
    apiStatus: apiConstants.initial,
    innerWidth: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.callRatedBookApi()
    console.log('hi')
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({innerWidth: window.innerWidth})
  }

  updateRatedList = books => {
    const updateNewList = books.map(eachItem => ({
      id: eachItem.id,
      authorName: eachItem.author_name,
      coverPic: eachItem.cover_pic,
      title: eachItem.title,
    }))
    this.setState({
      topRatedList: updateNewList,
      apiStatus: apiConstants.success,
    })
  }

  callRatedBookApi = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.updateRatedList(data.books)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getRatedList = () => {
    const {topRatedList, apiStatus, innerWidth} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
    }
    const mobileSettings = {
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: false,
    }
    const AddSettings = innerWidth >= 768 ? settings : mobileSettings
    const {history} = this.props
    return (
      <NavBarContext.Consumer>
        {value => {
          const {onClickOfNavBooks} = value
          const onFindButton = () => {
            history.replace('/shelf')
            onClickOfNavBooks()
          }

          return (
            <>
              <h1 className="rated-book-heading">
                Find Your Next Favorite Books?
              </h1>
              <p className="rated-book-para">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <div className="top-rated-card">
                <div className="top-rated-header">
                  <h1 className="rated-header-heading">Top Rated Books</h1>
                  <button
                    type="button"
                    className="find-books-button"
                    onClick={onFindButton}
                  >
                    Find Books
                  </button>
                </div>

                {apiStatus !== apiConstants.failure ? (
                  <ul className="slick-container slick-item">
                    <Slider {...AddSettings}>
                      {topRatedList.map(eachBook => (
                        <Link
                          to={`/books/${eachBook.id}`}
                          className="book-link"
                          key={eachBook.id}
                        >
                          <li className="each-rated-card">
                            <img
                              src={eachBook.coverPic}
                              className="rated-book-image"
                              alt={eachBook.title}
                            />
                            <h1 className="rated-book-title">
                              {eachBook.title}
                            </h1>
                            <p className="rated-book-author">
                              {eachBook.authorName}
                            </p>
                          </li>
                        </Link>
                      ))}
                    </Slider>
                  </ul>
                ) : (
                  <FailureView callApi={this.callRatedBookApi} />
                )}
              </div>
              <Footer />
            </>
          )
        }}
      </NavBarContext.Consumer>
    )
  }

  loadLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  getTopRatedBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.getRatedList()
      case apiConstants.failure:
        return this.getRatedList()
      case apiConstants.progress:
        return this.loadLoader()
      default:
        return null
    }
  }

  render() {
    const {hamburgerIcon} = this.state
    return (
      <div className="home-container">
        <Header
          hamburgerIcon={hamburgerIcon}
          onClickOfHamburger={this.onClickOfHamburger}
        />
        <div className="home-body">{this.getTopRatedBooks()}</div>
      </div>
    )
  }
}

export default Home
