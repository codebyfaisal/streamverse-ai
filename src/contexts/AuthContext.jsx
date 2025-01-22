import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

// Dummy user data
const DUMMY_USER = {
  id: "1",
  email: "codebyfaisal@gmail.com",
  username: "codebyfaisal",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=faisal`,
  password: "1234", // In a real app, this would be hashed
  displayName: "Muhammad Faisal",
  bio: "Creating awesome content about technology and programming.",
  subscribers: 1000,
  joinedDate: "2023-01-01",
  socialLinks: {
    website: "https://codebyfaisal.netlify.app",
    twitter: "https://twitter.com/faisalinsights",
    instagram: "https://instagram.com/codebyfaisal",
    github: "https://github.com/codebyfaisal",
    linkedin: "https://linkedin.com/in/codebyfaisal",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved auth token
    const token = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if credentials match dummy user
      if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
        const userData = { ...DUMMY_USER };
        delete userData.password; // Don't store password in state/localStorage

        localStorage.setItem("auth_token", "dummy_token");
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        return { success: true };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, just create a new user similar to dummy user
      const userData = {
        id: Date.now().toString(),
        email,
        username: email.split("@")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        displayName: email.split("@")[0],
        bio: "New User",
        subscribers: 0,
        joinedDate: new Date().toISOString().split("T")[0],
      };

      localStorage.setItem("auth_token", "dummy_token");
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
