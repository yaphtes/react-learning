import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute,
    IndexRedirect
} from 'react-router';

import books from './data/books';

import App from './App';
import About from './components/About';
import Books from './components/Books';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Shelf from './components/Shelf';
import Book from './components/Book';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="books" component={Books}>
                <IndexRedirect to="javascript" />
                <Route path=":topic">
                    <IndexRoute  component={Shelf} books={books} />
                    <Route path=":slug" component={Book} books={books} />
                </Route>
            </Route>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
), document.getElementById('root'));