import {Routes, Route} from "react-router-dom" 
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
// import Logout from "./pages/Logout/Logout";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import LoginContextProvider from "./utils/Context";
import PrivateWrapper from "./components/PrivateWrapper";
import PublicWrapper from "./components/PublicWrapper";
import Trending from "./pages/Trending/Trending";
import Vendors from "./pages/Vendors/Vendors";
import YourBoards from "./pages/Board/YourBoards";
import Landing from "./pages/Landing/Landing";
import Testimonials from "./pages/Testimonials/Testimonials";
import Profile from "./pages/Profile/Profile";
import BoardForm from "./components/BoardForm";
import Board from "./pages/Board/Board";


function App() {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId, 
                scope: ["profile", "email", "openid"]
            })
        } ;
        gapi.load('client:auth2', start)
    })
  return (
        <LoginContextProvider>
            <Routes>
                <Route path="/" element ={<PublicWrapper>
                    <Landing />
                </PublicWrapper> 
                    }
                />
                <Route path="/login" element ={<PublicWrapper>
                    <Login />
                </PublicWrapper> 
                    }
                />
                <Route path="/home" element={<PrivateWrapper>
                    <Home />
                </PrivateWrapper> 
                    }
                />
                <Route path="/testimonials" element={<PrivateWrapper>
                    <Testimonials />
                </PrivateWrapper> 
                    }
                />
                <Route path="/your-boards" element={<PrivateWrapper>
                    <YourBoards />
                </PrivateWrapper> 
                    }
                />
                <Route path="/board-form" element={<PrivateWrapper>
                    <BoardForm />
                </PrivateWrapper> 
                    }
                />
                <Route path="/trending" element={<PrivateWrapper>
                    <Trending />
                </PrivateWrapper> 
                    }
                />
                <Route path="/vendors" element={<PrivateWrapper>
                    <Vendors />
                </PrivateWrapper> 
                    }
                />
                <Route path="/profile/:id" element={<PrivateWrapper>
                    <Profile />
                </PrivateWrapper> 
                    }
                />
                <Route path="/board/:id" element={<PrivateWrapper>
                    <Board />
                </PrivateWrapper> 
                    }
                />
                <Route path="/signup" element ={<PublicWrapper>
                    <Signup />
                </PublicWrapper> 
                    }
                />
            </Routes>
        </LoginContextProvider>
  );
}

export default App;
