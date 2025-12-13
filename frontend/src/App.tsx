import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
import Layout from './components/Layout/Layout';

// Auth
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";

// Tasks
import TasksList from './pages/Tasks/TasksList';
import AddTask from './pages/Tasks/AddTask';
import TaskDetails from './pages/Tasks/TaskDetails';

// Clients
import ClientsList from './pages/Clients/ClientsList';
import AddClient from './pages/Clients/AddClient';

// Organisation & Roles
import Organisation from './pages/Organisation/Organisation';
import UsersList from './pages/Organisation/UsersList';
import InviteUser from './pages/Organisation/InviteUser';
import RolesList from './pages/Roles/RolesList';
import RoleForm from './pages/Roles/RoleForm';

// Settings & Notifications
import Settings from './pages/Settings';
import NotificationsList from './pages/NotificationsList';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/tasks" replace />} />
          
          {/* Tasks Routes */}
          <Route path="tasks" element={<TasksList />} />
          <Route path="dashboard" element={<TasksList />} />
          <Route path="tasks/new" element={<AddTask />} />
          <Route path="tasks/:id" element={<TaskDetails />} />

          {/* Clients Routes */}
          <Route path="clients" element={<ClientsList />} />
          <Route path="clients/add" element={<AddClient />} />

          {/* Organisation Routes */}
          <Route path="organisation" element={<Organisation />} />
          <Route path="organisation/users" element={<UsersList />} />
          <Route path="organisation/users/invite" element={<InviteUser />} />
          <Route path="organisation/roles" element={<RolesList />} />
          <Route path="roles/new" element={<RoleForm />} />

          {/* Misc Routes */}
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<NotificationsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;