import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import './index.scss';
const NavBar = props => {
  const { noHero, mobile, navState } = props;
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  return (
    <ul
      className={`nav-bar ${noHero ? 'no-background' : ''} ${
        mobile ? 'mobile' : ''
      } ${navState ? 'active' : ''}`}
    >
      <Link href="/projects">
        <a>
          <li>Projects</li>
        </a>
      </Link>

      <Link href="/partners">
        <a>
          <li>Partners</li>
        </a>
      </Link>

      <Link href="/reduce">
        <a>
          <li>Reduce</li>
        </a>
      </Link>

      <Link href="/subscribe">
        <a>
          <li>Offset</li>
        </a>
      </Link>

      <Link href="/share">
        <a>
          <li>Share</li>
        </a>
      </Link>

      <Link href="/press">
        <a>
          <li>Press</li>
        </a>
      </Link>

      {isLoggedIn ? (
        <Link href="/account">
          <a>
            <li>Account</li>
          </a>
        </Link>
      ) : (
        <Link href="/login">
          <a>
            <li>Login</li>
          </a>
        </Link>
      )}
    </ul>
  );
};

export default NavBar;
