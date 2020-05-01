import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
// import Search from '../search/index.jsx'

import { module } from './../common/common'

import styles from './search.module.less'
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
    // console.log(a)
    const a: number = 3
    return(
      <div>
        <div className={styles.txt}>
          {'index.html hengheng heng lllhhhhhhh hh'} { module() }
          <img src={img} />
        {/* <Search /> */}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App num={1} />,
  document.getElementById('root')
)