import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import Discover from './pages/Discover';
import CommunityChat from './pages/CommunityChat';
import Footer from "./components/Footer";
import DonationPage from './pages/DonationPage';
import NotFound from './pages/NotFound';
import './App.css';

function ErrorFallback({ error }) {
  return (
    <div className="container text-center py-5">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1" style={{ paddingTop: '80px' }}> {/* Add padding to account for fixed navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/community-chat" element={<CommunityChat />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/campaigns/:id/donate" element={<DonationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
