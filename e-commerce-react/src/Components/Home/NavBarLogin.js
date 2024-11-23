import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCartAction } from './../../Redux/Actions/CartAction';

const NavBarLogin = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const Logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // جلب حالة السلة من Redux
  const data = useSelector(state => state.Cart);
  const items = data?.data?.data?.cartItems || [];
  const cartCount = items.length;

  useEffect(() => {
    dispatch(GetCartAction());

    // التحقق من وجود المستخدم في localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [dispatch]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a href='/'><img className='navbar-brand' src='https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/logo.png' style={{ width: "60px", height: "60px" }} alt="logo" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item d-flex align-items-center position-relative">
                <img
                  alt="cart"
                  src="https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/cart.png"
                  style={{ width: "28px", height: "28px" }}
                />
                <span
                  className="position-absolute start-85 end-85 translate-middle badge rounded-pill bg-danger"
                  style={{ top: '7px', left: '77px', fontSize: '10px' }}
                >
                  {cartCount}
                </span>
                <a className="nav-link active" aria-current="page" href="/cart">Carts</a>
              </li>

              {user ? (
                <li className="nav-item dropdown">
                  <a style={{ fontSize: '1.22rem' }} className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.name}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {user.role === "admin" ? (
                      <li><a className="dropdown-item" href="/admin/products">Your Profile</a></li>
                    ) : (
                      <li><a className="dropdown-item" href="/user/orders">Your Profile</a></li>
                    )}
                    <li><a onClick={Logout} className="dropdown-item" href="/">Logout</a></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <img src='https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/login.png' style={{ width: "28px", height: "28px" }} alt="login" />
                  <a className="nav-link active" aria-current="page" href="/login">Login</a>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarLogin;
