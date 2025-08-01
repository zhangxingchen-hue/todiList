import React, { Component } from 'react'
import PubSub from "pubsub-js"
import Header from './components/Header';
import List from './components/List';
import Footer from "./components/Footer"
import './App.scss';


export default class App extends Component {

  state = {
    needList: []
  }

  // 初始化组件信息
  componentDidMount() {
    // 删除单个note
    this.delToken = PubSub.subscribe('deleteTodo', (_, todo) => {
      const { needList } = this.state
      const newNeedList = needList.filter(item => {
        return item.id !== todo.id
      })
      this.setState({ needList: newNeedList })
    })

    // 改变单个note选中状态
    this.checkNoteToken = PubSub.subscribe('checkTodo', (_, todo) => {
      const { needList } = this.state
      const newNeedList = needList.map(item => {
        if (item.id === todo.id) {
          item.done = todo.done
        }
        return item
      })
      this.setState({ needList: newNeedList })
    })

    // 添加单个note
    this.addToken = PubSub.subscribe('addTodo', (_, todo) => {
      let { needList } = this.state
      this.setState({ needList: [todo, ...needList] })
    })

    // 选择所有note
    this.checkAllToken = PubSub.subscribe('checkAllTodo', () => {
      const { needList } = this.state
      const newNeedList = needList.map(todo => {
        if (!todo.done) {
          todo.done = !todo.done
        }
        return todo
      })
      this.setState({ needList: newNeedList })
    })

    // 选择所有note
    this.checkAllToken = PubSub.subscribe('clearnCompletedTodos', () => {
      const { needList } = this.state
      const newNeedList = needList.filter(todo => {
        return !todo.done
      })
      this.setState({ needList: newNeedList })
    })
  }

  componentWillUnmount() {
    // 组件注销前清除订阅
    PubSub.unsubscribe(this.delToken)
    PubSub.unsubscribe(this.addToken)
    PubSub.unsubscribe(this.checkAllToken)
  }

  render() {
    const { needList } = this.state
    return (
      <div className="App">
        <div className='center-wrap'>
          <div className='title'>todos</div>
          <div className='content-wrap'>
            <Header />
            <div style={{ display: needList.length > 0 ? 'block' : 'none' }}>
              <List needList={needList} />
              <Footer needList={needList} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}