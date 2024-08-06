import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest} from "../api/autenticacion";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debería estar dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [username, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (usuario) => {
    try {
      const res = await registerRequest(usuario);
      console.log(res)
      if (res.status === 201) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  const signin = async (usuario) => {
    try {
      const res = await loginRequest(usuario);
      setUser(res.data.user.username);
      setIsAuthenticated(true);
    } catch (error) {
      //console.log(error);
      setErrors(error);
    }
  };

  const logout = (usuario) => {
    try {
      const res = logoutRequest(usuario);
      console.log(res)
      if (res.status === 200){
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        username,
        signup,
        signin,
        isAuthenticated,
        errors,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;