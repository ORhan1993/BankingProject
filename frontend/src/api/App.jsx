import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/customer/Dashboard';
import CreateWallet from '../pages/customer/CreateWallet';
import Deposit from '../pages/customer/Deposit';
import Withdraw from '../pages/customer/Withdraw';
import Transfer from '../pages/customer/Transfer';

function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create-wallet" element={<CreateWallet />} />
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/transfer" element={<Transfer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;