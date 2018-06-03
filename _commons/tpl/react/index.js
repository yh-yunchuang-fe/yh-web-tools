/**
 * @author zhangyi
 * @date 2018/5/24
 */
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/promise';
import React from 'react'
import {render} from 'react-dom'
import App from './App'

const data = {
    name : 'World'
};
render(<App {...data} />, document.getElementById('root'));
