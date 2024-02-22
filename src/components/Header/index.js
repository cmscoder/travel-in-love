import './header.css';
import {Link} from 'react-router-dom'


function Header(){
  return(
    <header>
      <Link className="logo" to="/">Travel In Love</Link>
      <Link className="favorites" to="favorites">My favorite cities</Link>
    </header>
  )
}

export default Header;