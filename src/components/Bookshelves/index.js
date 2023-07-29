import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import BookItem from '../BookItem'
import FilterGroup from '../FilterGroup'
import FailureView from '../FailureView'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    allBooksList: [],
    filterOption: bookshelvesList[0].value,
    searchText: '',
    apiStatus: apiConstants.initial,
    innerWidth: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.callBookShelvesApi()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({innerWidth: window.innerWidth})
  }

  updateAllBooks = books => {
    const updateAllBooks = books.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      readStatus: eachItem.read_status,
      rating: eachItem.rating,
      authorName: eachItem.author_name,
      coverPic: eachItem.cover_pic,
    }))
    this.setState({
      allBooksList: updateAllBooks,
      apiStatus: apiConstants.success,
    })
  }

  callBookShelvesApi = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const {filterOption, searchText} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${filterOption}&search=${searchText}`
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
      this.updateAllBooks(data.books)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onLabel = value => {
    this.setState({filterOption: value}, this.callBookShelvesApi)
  }

  onChangeOfSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  onClickOfSearchButton = () => {
    this.callBookShelvesApi()
  }

  getStatus = () => {
    const {filterOption} = this.state
    const newValue = bookshelvesList.filter(
      eachItem => eachItem.value === filterOption,
    )

    return newValue[0].label
  }

  getBooks = () => {
    const {
      allBooksList,
      apiStatus,
      filterOption,
      searchText,
      innerWidth,
    } = this.state
    const booksStatus = this.getStatus()

    const responsiveCard = (
      <div className="search-card">
        <input
          placeholder="Search"
          type="search"
          id="search-id"
          className="search-input"
          value={searchText}
          onChange={this.onChangeOfSearchText}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.onClickOfSearchButton}
          testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )

    return (
      <div className="all-book-body">
        {innerWidth <= 767 && responsiveCard}
        <div className="filter-group-card">
          <h1 className="filter-heading">BookShelves</h1>
          <ul className="filter-card">
            {bookshelvesList.map(eachItem => (
              <FilterGroup
                key={eachItem.id}
                itemObject={eachItem}
                isActive={eachItem.value === filterOption}
                onLabel={this.onLabel}
              />
            ))}
          </ul>
        </div>
        <div className="all-book-main-card">
          <div className="book-status-card">
            <h1 className="book-status-heading">{booksStatus} Books</h1>
            {innerWidth >= 768 && responsiveCard}
          </div>
          {allBooksList.length > 0 && (
            <ul className="all-books-card">
              {allBooksList.map(eachItem => (
                <BookItem key={eachItem.id} bookItem={eachItem} />
              ))}
            </ul>
          )}
          {apiStatus === apiConstants.success && allBooksList.length > 0 && (
            <Footer />
          )}
          {allBooksList.length === 0 && apiStatus === apiConstants.success && (
            <div className="no-search-card">
              <img
                src="https://res.cloudinary.com/duws9fktk/image/upload/v1687236834/Mini-Project/no-search-img/Group_ux4ik4.png"
                className="no-search-img"
                alt="no books"
              />
              <p className="no-books-found">
                Your search for {searchText} did not find any matches.
              </p>
            </div>
          )}
          {apiStatus === apiConstants.failure && (
            <FailureView callApi={this.callBookShelvesApi} />
          )}
        </div>
      </div>
    )
  }

  loadLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  getAllBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.getBooks()
      case apiConstants.failure:
        return this.getBooks()
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
      <div className="bookshelves-container">
        <Header />
        {this.getAllBooks()}
      </div>
    )
  }
}

export default Bookshelves
