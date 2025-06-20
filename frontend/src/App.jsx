import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import TicketForm from "./pages/TicketForm";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import EditProject from "./pages/EditProject";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Layout>
                <ProjectList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-project"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateProject />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <ProtectedRoute>
              <Layout>
                <ProjectDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id/edit"
          element={
            <ProtectedRoute>
              <Layout>
                <EditProject />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/new-ticket"
          element={
            <ProtectedRoute>
              <Layout>
                <TicketForm />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
