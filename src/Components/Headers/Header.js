import { Link } from 'react-router-dom';
import logo from '../../Assets/images/logo.png';
const Header = () => {
  return (
    <div className='w-full sticky top-0 h-16 bg-white'>
      <div className='flex items-center p-2'>
        {/* <Link to='/'> */}
          <img className='w-23 h-10 mr-2' src={logo} alt='logo' />
          <h1 className='text-2xl font-bold'>Simplespect</h1>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Header;
