import { StyledEngineProvider } from "@mui/material";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { useUser } from "providers/hooks";
import { Dashboard, Landing, Signin } from 'screens';

function App() {

    const { UserProvider } = useUser();

    return (
        <StyledEngineProvider injectFirst>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route
                            element={<Landing />}
                            path='/'
                        />
                        <Route
                            element={<Dashboard />}
                            path='/dashboard'
                        />
                        <Route
                            element={<Signin />}
                            path='/signin'
                        />
                    </Routes>
                </Router>
            </UserProvider>
        </StyledEngineProvider>
    );
}

export default App;
