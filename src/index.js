import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InMemoryApp from './InMemoryApp.js';
import reportWebVitals from './reportWebVitals';

const initialData = [
    {
        id: 0,
        item: "Buy new John Grisham Book",
        checked: false
    },
    {
        id: 1,
        item: "Buy newer John Grisham Book",
        checked: true
    }
];


ReactDOM.render(
  <React.StrictMode>
      <InMemoryApp initialData={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
