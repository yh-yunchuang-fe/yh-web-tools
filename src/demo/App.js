/**
 * @author zhangyi
 * @date 2018/5/24
 */
import React, {Component} from 'react'
// import { hot } from 'react-hot-loader'
import './assets/css/index.less'

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello 3333
                    <span className="highLight"> {this.props.name}</span>
                </h1>
            </div>
        )
    }
}

export default App
