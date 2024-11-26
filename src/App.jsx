import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import Tasks from "./pages/Tasks/Tasks";
import Schedule from "./pages/Schedule/Schedule";
import Root from "./pages/Root/Root";

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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
