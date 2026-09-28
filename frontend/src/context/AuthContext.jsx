import { createContext, useContext, useState , useEffect } from "react";
import { refreshAccessToken , logoutUser } from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken,setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true);

  const login = (userData,token) => {
    setUser(userData);
    setAccessToken(token)
    
    
    
    
    
  };
 
  
  
  
  

  const logout = async () => {
     try {
      await logoutUser();
    } catch (error) {
      console.log("logout error:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  
  };

  const  restoreSession = async ()=>{
    try {
      const data = await refreshAccessToken()
      console.log("refresh response:" , data);
      
      setAccessToken(data.accessToken);
      setUser(data.user);

      
      
    } catch (error) {
      setUser(null);
      setAccessToken(null);

      
    } finally{
      setLoading(false);
    }

  }

   useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout , loading , accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};
export { useAuth };

export default AuthProvider;
