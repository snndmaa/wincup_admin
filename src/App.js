import { useEffect, useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

import User from "./scenes/data/user";
import Profile from "./scenes/data/Profile";
import Login from "./scenes/auth/Login";
import Logout from "./scenes/extras/logout";

import UserForm from "./scenes/forms/user";
import ProfileForm from "./scenes/forms/profile";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token  = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} isAuthenticated={isAuthenticated}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} isAuthenticated={isAuthenticated}/>
            {/* <Routes> */}
              {
                isAuthenticated ? (
                  <Routes>
                    <Route exact path="/admin" element={<Dashboard />} />
                    <Route exact path="/admin/users" element={<User />} />
                    <Route exact path="/admin/contacts" element={<Contacts />} />
                    <Route exact path="/admin/profiles" element={<Profile />} />
                    <Route exact path="/admin/bar" element={<Bar />} />
                    <Route exact path="/admin/pie" element={<Pie />} />
                    <Route exact path="/admin/line" element={<Line />} />
                    <Route exact path="/admin/faq" element={<FAQ />} />
                    <Route exact path="/admin/calendar" element={<Calendar />} />
                    <Route exact path="/admin/logout" element={<Logout />} />

                    <Route exact path="/admin/user-form" element={<UserForm />} />
                    <Route exact path="/admin/user-form/:userId" element={<UserForm />} />

                    <Route exact path="/admin/profile-form" element={<ProfileForm />} />
                    <Route exact path="/admin/profile-form/:profileId" element={<ProfileForm />} />
                  </Routes>

                ) : (
                  <Routes>
                    <Route exact path="/admin" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                  </Routes>

                )
              }

            {/* </Routes> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
