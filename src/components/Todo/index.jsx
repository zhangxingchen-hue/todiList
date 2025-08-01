import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import "./index.scss"

export default class Todo extends Component {
  // 改变标签状态
  changeTagState = event => {
    const { todo } = this.props
    const newTodo = {...todo, done: event.target.checked}
    PubSub.publish("checkTodo", newTodo)
  }

  // 删除某个标签
  deleteTodo = (todo) => {
    if (window.confirm("Are you sure you have deleted it?")) {
      PubSub.publish("deleteTodo", todo)
    }
  }

  render() {
    const { todo } = this.props
    return (
      <div className='todo-wrap'>
        <input className='checkbox-wrap' type='checkbox' checked={todo.done} onChange={this.changeTagState} />
        <span className='todo-content'>{todo.content}</span>
        <button className='del-btn' onClick={() => this.deleteTodo(todo)} >delete</button>
      </div>
    )
  }
}
