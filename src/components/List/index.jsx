import React, { Component } from 'react'
import Todo from '../Todo'

export default class List extends Component {

  render() {
    const { needList } = this.props
    return (
      <div>
        {
          needList.map(todo => {
            return <Todo todo={todo} key={todo.id} changeSingleTag={this.props.changeSingleTag} />
          })
        }
      </div>
    )
  }
}
