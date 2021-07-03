import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import storage from '../src/utils/storage';
import memory from '../src/utils/memory';

//读取本地的local中保存的user
const user = storage.getUser();
memory.user = user;

ReactDOM.render(
    <App />,document.getElementById('root')
);



