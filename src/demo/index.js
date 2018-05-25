/**
 * @author zhangyi
 * @date 2018/5/24
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import App from './App'

const data = {
    name : 'World'
};
render(<App {...data} />, document.getElementById('root'));
