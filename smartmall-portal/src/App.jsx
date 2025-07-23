import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
 import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import WalkInLogs from './pages/admin/WalkInLogs';
import Recommendations from './pages/admin/Recommendations';
// import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManageUsers from './pages/admin/ManageUser';
import ManageStores from './pages/admin/ManageStore';
import TelcoTrends from './pages/admin/TelcoTrends';

import ManagerDashboard from './pages/storemanager/ManagerDashboard';
import StoreManagerWalkInLogs from './pages/storemanager/StoreManagerWalkInLogs';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/stores" element={<ManageStores />} />
  <Route path="/admin/users" element={<ManageUsers />} />
  
  <Route path="/admin/walkins" element={<WalkInLogs />} />
  <Route path="/admin/telco-trends" element={<TelcoTrends />} />
  <Route path="/admin/recommendations" element={<Recommendations />} />


</Route>
 
 <Route element={<PrivateRoute allowedRoles={['storeManager']} />}>
  <Route path="/storemanager/dashboard" element={<ManagerDashboard />} />
  <Route path="/storemanager/walkins" element={<StoreManagerWalkInLogs />} />
</Route>



      
      {/* <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route> */}

      {/* <Route element={<PrivateRoute allowedRoles={['storeManager']} />}>
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Route> */}

      <Route path="*" element={<h4 className="text-center mt-5">Page Not Found</h4>} />
    </Routes>
  );
}

export default App;
