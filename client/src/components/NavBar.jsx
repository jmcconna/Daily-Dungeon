import React from 'react';
import { Link } from 'react-router-dom';
import ToggleMusic from './ToggleMusic';


function NavBar() {

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Daily Dungeon</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Donate</a>
                    </li>
                    <li>
                        <ToggleMusic />
                    </li>
                </ul>

            </div>
        </nav>
    );
}

export default NavBar;