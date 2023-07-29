import React from 'react'

const NavBarContext = React.createContext({
  hamburgerIcon: false,
  activeHome: true,
  activeBooks: false,
  onClickOfHamburger: () => {},
  onClickOfNavHome: () => {},
  onClickOfNavBooks: () => {},
})

export default NavBarContext
