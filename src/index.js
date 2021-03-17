import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

const cdn = document.createElement('script');
cdn.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';

document.getElementsByTagName('body')[0].appendChild(cdn);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);