import './App.css';
import Navbar from './Components/Navbar.js'
import Projects from './Components/Projects.js';

function App() {
  return (
    <body>
    <Navbar />
    <div className='main'>
    <Projects />
    </div>
    </body>
    
  );
}

export default App;
