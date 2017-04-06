import React, { PropTypes } from 'react';

import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todos: []
        }
    }


    componentDidMount() {
        fetch('/api/todos')
            .then(res => res.json())
            .then(todos => this.setState({ todos }))
            .catch(this.handleError);
    }


    handleAdd(title) {
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        };
        
        fetch('/api/todos', options)
            .then(res => res.json())
            .then(todo => {
                let todos = this.state.todos.concat(todo);
                this.setState({ todos });
            })
            .catch(this.handleError)
    }


    hangleToggle(id) {
        let options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        };
        
        fetch(`/api/todos/${id}`, options)
            .then((res) => res.json())
            .then(newTodo => {
                let todos = this.state.todos.map(todo => {
                    if (todo.id == id) todo = newTodo;

                    return todo;
                });

                this.setState({ todos });
            })
            .catch(this.handleError);
    }


    handleDelete(id) {
        let options = {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json', }
        };

        fetch(`/api/todos/${id}`, options)
            .then(() => {
                let todos = this.state.todos.filter(todo => todo.id != id);
                this.setState({ todos });
            })
            .catch(this.handleError);
    }


    handleEdit(id, title) {
        let options = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ title })
        };
        
        fetch(`/api/todos/${id}`, options)
            .then(res => res.json())
            .then(newTodo => {
                let todos = this.state.todos.map(todo => {
                    if (todo.id == id) todo.title = newTodo.title;

                    return todo;
                });
                this.setState({ todos });
            })
            .catch(this.handleError);
    }
    
    
    handleError(err) {
        console.error(err.message);
    }
    
    
    render() {
        return (
            <main>
                <Header todos={this.state.todos} title={this.props.title} />
                <section className="todo-list">
                    {this.state.todos.map(todo =>
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onToggle={this.hangleToggle.bind(this)}
                            onDelete={this.handleDelete.bind(this)}
                            onEdit={this.handleEdit.bind(this)}
                        />
                    )}
                </section>

                <Form onAdd={this.handleAdd.bind(this)} />
            </main>
        );
    }
}

App.propTypes = {
    title: PropTypes.string,
    // initialData: PropTypes.arrayOf(PropTypes.shape({
    //     title: PropTypes.string.isRequired,
    //     completed: PropTypes.bool.isRequired
    // })).isRequired
};

App.defaultProps = {
    title: 'React Todo'
};

export default App;