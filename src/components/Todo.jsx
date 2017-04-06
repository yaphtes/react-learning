import React, { PropTypes } from 'react';
import Checkbox from './Checkbox';
import Button from './Button';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editing: false
        };
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.editing) {
            this.refs.title.focus();
            this.refs.title.select();
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let title = this.refs.title.value;
        
        this.props.onEdit(this.props.id, title);
        this.setState({ editing: false });
    }

    renderDisplay() {
        return (
            <div className={`todo${this.props.completed ? ' completed' : ''}`}>
                <Checkbox checked={this.props.completed} onChange={this.props.onToggle.bind(null, this.props.id)} />
                <span className="todo-title">{this.props.title}</span>
                <Button className="edit icon" icon="edit" onClick={() => this.setState({ editing: true })} />
                <Button className="delete icon" icon="delete" onClick={this.props.onDelete.bind(null, this.props.id)} />
            </div>
        );
    }

    renderForm() {
        return (
            <form className="todo-edit-form" onSubmit={this.handleSubmit.bind(this)}>
                <input ref="title" defaultValue={this.props.title} type="text" />
                <Button className="save icon" icon="save" type="submit" />
            </form>
        );
    }
    
    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay();
    }
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default Todo;
