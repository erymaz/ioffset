import React from 'react';
import Link from 'next/link';
import { logout } from 'store/auth';
import { useDispatch } from 'react-redux';
import './index.scss';

const AccountSubSideBar = props => {
  const dispatch = useDispatch();
  return (
    <div className={`sub-sidebar ${props.view}`}>
      <ul>
        <Link href="/about">
          <a>
            <li>About</li>
          </a>
        </Link>
        <Link href="/faq">
          <a>
            <li>FAQ</li>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <li>Contact Us</li>
          </a>
        </Link>
        <Link href="/privacy-policy">
          <a>
            <li>Privacy Policy</li>
          </a>
        </Link>
        <Link href="/termsofuse">
          <a>
            <li>Terms and Conditions</li>
          </a>
        </Link>
        <li className="logout" onClick={() => dispatch(logout())}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default AccountSubSideBar;
