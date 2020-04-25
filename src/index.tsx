import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'
import Search from './search.jsx'
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

        <Search />
        </div>
      </div>
    )
  }
}

ReactDom.render(
  <App num={1} />,
  document.getElementById('root')
)