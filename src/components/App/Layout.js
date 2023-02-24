import planetImg from '../../assets/images/circus-tent_1f3aa 3.png'

const Layout = ({children}) => {
  return <>
    <header className="App-header">
      <img className="App-header__img" src={planetImg} alt="planet" />
      <span>OVERVIEW</span>
    </header>
    <div className="App-main">
      {children}
    </div>
  </>
}

export default Layout
