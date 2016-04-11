import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

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
