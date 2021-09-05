import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  document.addEventListener("DOMContentLoaded", function(){
    const fetchForm = document.querySelector('.fetchForm');
    const btn = document.querySelector('.btn');
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.proxy = true
  }, false);
  function postFetch(e) {
    const url = "http://localhost:8080/get";
    const params = {method : "POST", body : JSON.stringify({keyword : "ホロライブ"})};
    e.preventDefault();
    fetch(url, params)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Fetchで答える</p>
        {/* <form className="fetchForm">
          <input type="text" name="name" className="name" />
          <input type="button" value="送信" className="btn" />      
        </form> */}
        <input type="button" value="送信" className="btn" onClick={postFetch} />    
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
