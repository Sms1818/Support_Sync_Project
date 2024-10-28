import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard1 from './components/Dashboard1';
import Hero from './components/Hero';
import ProjectScreen from './components/ProjectScreen';
import TicketSolution from './components/TicketSolution';
import ProfileScreen from './components/ProfileScreen'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <Navbar /> */}
        <main className="flex-grow min-h-screen overflow-hidden">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard1 />} />
            <Route path="/project/:projectKey" element={<ProjectScreen />} />
            <Route path="/ticket/:ticketId" element={<TicketSolution />} /> 
            <Route path="/profile" element={<ProfileScreen />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;