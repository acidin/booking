import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

class Header extends Component {
    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text)
        }
    }

    render() {
        let fontSize = {
            fontSize: '12px',
            position: 'absolute',
            right: '-100px',
            top: '-30px',
            color: '#666',
            fontWeight: 'bold'
        }
        return (
            <header className="header">
                <h1>
                    <span>NEI Todos</span>
                    <span style={fontSize}>您好, HuntBao</span>
                </h1>
                <TodoTextInput newTodo
                               onSave={this.handleSave.bind(this)}
                               placeholder="What needs to be done?"/>
            </header>
        )
    }
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default Header
