import React, { PureComponent } from 'react'
import styles from './search.module.less'
import img from './images/1.png'
console.log(styles)
export default class Search extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={styles.txt}>
        {'Search Text'}
        <div>
          <img src={img} />
        </div>
      </div>
    )
  }
}