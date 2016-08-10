import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import Calendar from '../components/Calendar'

import * as TodoActions from '../actions/index'

class App extends Component {

    componentDidMount() {
        const { actions } = this.props
        actions.fetchTodos()
        actions.fetchEvents()
    }

    render() {
        const { todos, events, actions, isFetching } = this.props
        console.log(actions);
       /* console.log(events);
        console.log(todos);*/
        return (
            <div>
                <Header addTodo={actions.addTodo} addEvent={actions.addEvent} />
                <MainSection todos={todos} actions={actions} isFetching={isFetching}/>
                <Calendar
                    events={events}
                    deleteEvent={actions.deleteEvent}
                />
            </div>
        )
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    const { todos, events, appStatus} = state
    const { isFetching } = {
        isFetching: appStatus.isFetching
    }
    return {
        todos,
        events,
        isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
