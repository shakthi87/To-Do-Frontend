import './App.css';
import Todo from './components/Todo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const headStyle = {
    textAlign: "center"
  }
  return (
    <div>
      <h1 style={headStyle}><center>Todo List</center></h1>
      <Router>
        <Routes>
          <Route path='/' element={<Todo />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
