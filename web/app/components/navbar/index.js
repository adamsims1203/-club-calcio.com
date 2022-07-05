import { NavLink } from "@remix-run/react";
import { FaTwitter, FaInstagram } from "react-icons/fa";

import styles from "./navbar.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const StyledNavLink = ({ children, ...props }) => (
  <NavLink
    {...props}
    className={({ isActive }) => (isActive ? "active" : undefined)}
  >
    {children}
  </NavLink>
);

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <div>
          <ul>
            <li>
              <a href="./">
                <img src="/assets/nav-icon.svg" alt="CALCIO! logo" />
              </a>
            </li>
            <li>
              <StyledNavLink to="./">Home</StyledNavLink>
            </li>
            {/* <li>
              <StyledNavLink to="./team">Team</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="./about-us">About Us</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="./archive">Archive</StyledNavLink>
            </li> */}
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <a href="https://twitter.com/calcio_gazetta/">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/calcio_gazetta/">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
