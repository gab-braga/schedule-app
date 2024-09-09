import './App.css';
import Header from './components/header';
import Modal from './components/modal';
import Home from './pages/home';

function App() {
  return (
    <div className="root">
      <Modal setShow={() => {}} />
      <Header />
      <Home />
    </div>
  );
}

export default App;
