import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'
// import Search from '../search/index.jsx'
import styles from './../search.module.less'
import img from './../images/1.png'
// const img = require('./../images/1.png').default
type Props = {
  num: number
}

type State = {
  count: string
}
class App extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
  }
  render() {
    const a: number = 3
    return(
      <div>
        <div>
          {'index.html'}
          <img src={img} />
        {/* <Search /> */}
        </div>
      </div>
    )
  }
}

ReactDom.render(
  <App num={1} />,
  document.getElementById('root')
)