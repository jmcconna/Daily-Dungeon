import React from 'react';
import { Link } from 'react-router-dom';
import ToggleMusic from './ToggleMusic';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark" style={{ display: 'flex', justifyContent: 'space-between'}}>
      <a style={{color: 'white'}} className="navbar-brand" href="/">
        Daily Dungeon
      </a>
      <div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto" style={{ display: 'flex', gap: '1em'}}>
              <li className="nav-item">
                <a style={{color: 'white'}} className="nav-link" href="#">
                  Donate
                </a>
              </li>
              <li>
                <ToggleMusic />
              </li>
            </ul>
          </div>
      </div>
    </nav>
  );
}

export default NavBar;
