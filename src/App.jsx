import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Tasks from './pages/tasks';
import Schedule from './pages/schedule';
import Redirect from './pages/redirect';
import Root from './pages/root';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Tasks />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
