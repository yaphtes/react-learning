import React from 'react';

function Book(props) {
    const { topic, slug } = props.params;
    const books = props.route.books[topic]
    const book = books.find(book => book.slug == slug);

    return (
        <section className="content book">
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                    <div className="mdl-grid mdl-grid--no-spacing">
                        <div className="mdl-cell mdl-cell--3-col">
                            <img src={book.cover} className="book-cover" />
                        </div>

                        <div className="mdl-cell mdl-cell--9-col">
                            <div className="mdl-card__title">
                                <h1 className="mdl-card__title-text">{book.title}</h1>
                            </div>

                            <div className="mdl-card__supporting-text">
                                <span>{book.author}</span>
                                <span>{book.publisher}</span>
                                <span>{book.pages} стр.</span>
                                <span>{book.year} г.</span>
                            </div>

                            <div className="mdl-card__supporting-text">{book.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Book;