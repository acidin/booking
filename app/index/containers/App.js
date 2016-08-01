import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import BigCalendar from 'react-big-calendar';
import * as TodoActions from '../actions'

import events from '../events';

import moment from 'moment';

import '../less/styles.less';
import '../less/prism.less';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class App extends Component {

  componentDidMount() {
    const { actions } = this.props
    actions.fetchTodos()
  }

  render() {
    const { todos, actions, isFetching } = this.props
    return (
      <div>
        <Header addTodo={actions.addTodo}/>
        <MainSection todos={todos} actions={actions} isFetching={isFetching}/>
          <BigCalendar
              defaultView='week'
              events={events}
              defaultDate={new Date(2015, 3, 1)}
              views={['week']}
          />
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { todos, appStatus} = state
  const { isFetching } = {
    isFetching: appStatus.isFetching
  }
  return {
    todos,
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
