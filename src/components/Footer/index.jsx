import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import "./index.scss"

export default class Footer extends Component {
  // 选择全部
  checkAll = () => {
    PubSub.publish("checkAllTodo")
  }

  // 清除所有已完成的任务
  clearnCompletedNotes = () => {
    // 检验是否有已完成任务
    const { needList } = this.props
    const num = needList.reduce((preValue, todo) => {
      if (todo.done) {
        return preValue + 1
      } else {
        return preValue
      }
    }, 0)
    if (num > 0 && window.confirm("Are you sure to clear all completed tasks?")) {
      PubSub.publish("clearnCompletedTodos")
    } else {
      alert("Please complete the task first.")
    }
    
  }

  render() {
    const { needList } = this.props
    return (
      <div className='footer-wrap'>
        <div className='count-number'>{needList.length} items left</div>
        <button className='check-all-btn' onClick={this.checkAll}>All</button>
        <span className='clearn-completed' onClick={this.clearnCompletedNotes}>clearn completed</span>
      </div>
    )
  }
}
