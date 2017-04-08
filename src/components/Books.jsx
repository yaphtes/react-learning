import React from 'react';
import { Link } from 'react-router';

import NavLink from './NavLink';

function Books(props) {
    return (
        <section className="content books">
            <div className="mdl-tabs">
                <div className="mdl-tabs__tab-bar">
                    <NavLink to="/books/javascript" className="mdl-tabs__tab">JavaScript</NavLink>
                    <NavLink to="/books/react" className="mdl-tabs__tab">React</NavLink>
                    <NavLink to="/books/angular" className="mdl-tabs__tab">Angular</NavLink>
                </div>

                <div className="mdl-tabs__panel">
                    {props.children}
                </div>
            </div>
        </section>
    );
}

export default Books;