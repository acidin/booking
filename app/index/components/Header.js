import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'
import util from '../../common/util'
import EventAdd from './EventAdd'

class Header extends Component {
    handleSave(text) {

        if (text.length !== 0) {
            this.props.addTodo(text)
        }
    }

    handleSave2(text) {
        console.log(text);
        if (text.length !== 0) {
            this.props.addEvent(text)
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
        console.log(util.cookie('name'))
        return (
            <header className="header">
                <h1>
                    <span>Booking</span>
                    <span style={fontSize}>Hello, <a href="#" className="user-name">{util.cookie('name')}</a></span>
                </h1>
                <EventAdd
                    onSave={this.handleSave2.bind(this)}
                />
                <TodoTextInput newTodo
                               onSave={this.handleSave.bind(this)}
                               placeholder="What needs to be done?"/>
            </header>
        )
    }
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired
}

export default Header
