import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
// import Search from '../search/index.jsx'

import { module } from './../common/common'

import styles from './search.module.less'
// import img from './../images/1.png'
// const img = require('./../images/1.png').default
type Props = {
  num: number
}

type State = {
  count: string
  imgsrc: string
}
class App extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      imgsrc: '',
      count: ''
    }
  }

  handleClick = () => {
    debugger
    import('./../images/1.png').then(res => {
      console.log(res)
      this.setState({
        imgsrc: res.default
      })
    })
  }
  render() {
    // console.log(a)
    const a: number = 3
    const { imgsrc } = this.state
    return(
      <div>
        <div className={styles.txt}>
          {'index.html hengheng heng lllhhhhhhh hh'} { module() }
          <button onClick={this.handleClick}>click</button>
          {/* <img src={img} /> */}
          {imgsrc && <img src={imgsrc} height={6200} />}
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