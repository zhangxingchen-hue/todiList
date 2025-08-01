import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import PubSub from 'pubsub-js'
import './index.scss'

export default class Header extends Component {
  // 点击回车添加内容
  handleEnterValue = event => {
    if (event.keyCode === 13) {
      // 生成唯一id
      const needObj = {
        id: nanoid(),
        content: event.target.value,
        done: false
      }
      PubSub.publish("addTodo", needObj)
      event.target.value = ""
    }
  }
  render() {
    return (
      <div className='enter-value'>
        <input onKeyUp={this.handleEnterValue} placeholder='What needs to be done?' />
      </div>
    )
  }
}
