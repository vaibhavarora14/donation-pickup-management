import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DonationForm from "./components/DonationForm";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import BookDonationPickup from "./pages/BookDonationPickup";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import PaymentOption from "./pages/PaymentOption";
import PickupModeSelection from "./pages/PickupModeSelection";
import SchedulePickup from "./pages/SchedulePickup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Book Donation Pickup */}
            <Route path="/book-donation" element={<BookDonationPickup />} />

            {/* Pickup Mode Selection */}
            <Route path="/pickup-mode" element={<PickupModeSelection />} />

            {/* Payment Option */}
            <Route path="/payment" element={<PaymentOption />} />

            {/* Schedule Pickup */}
            <Route path="/schedule-pickup" element={<SchedulePickup />} />

            {/* Donation Form */}
            <Route
              path="/donate"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    padding: "20px",
                  }}
                >
                  <DonationForm />
                </div>
              }
            />

            {/* Admin Routes */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
