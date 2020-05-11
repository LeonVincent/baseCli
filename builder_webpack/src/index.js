import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './aa.less'

export default class App extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className={'text'}>dsjdisao</div>
        <div className="text1">dsdasd</div>
        <div>dsd</div>
        {'dadasdasdasdsduhihh'}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root1'))
