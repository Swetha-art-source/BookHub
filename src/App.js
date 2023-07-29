import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import NavBarContext from './context/NavBarContext'
import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'

import SpecificBookDetails from './components/SpecificBookDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {hamburgerIcon: false, activeHome: true, activeBooks: false}

  onClickOfHamburger = () => {
    this.setState(prevState => ({hamburgerIcon: !prevState.hamburgerIcon}))
  }

  onClickOfNavHome = () => {
    const {activeHome} = this.state
    if (activeHome === false) {
      this.setState(prevState => ({
        activeHome: !prevState.activeHome,
        activeBooks: false,
      }))
    }
  }

  onClickOfNavBooks = () => {
    const {activeBooks} = this.state
    if (activeBooks === false) {
      this.setState(prevState => ({
        activeHome: false,
        activeBooks: !prevState.activeBooks,
      }))
    }
  }

  render() {
    const {hamburgerIcon, activeHome, activeBooks} = this.state
    return (
      <NavBarContext.Provider
        value={{
          hamburgerIcon,
          activeHome,
          activeBooks,
          onClickOfHamburger: this.onClickOfHamburger,
          onClickOfNavHome: this.onClickOfNavHome,
          onClickOfNavBooks: this.onClickOfNavBooks,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/shelf" component={Bookshelves} />
            <ProtectedRoute
              exact
              path="/books/:id"
              component={SpecificBookDetails}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </>
      </NavBarContext.Provider>
    )
  }
}

export default App
