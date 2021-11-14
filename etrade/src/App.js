import Appbar from "./Appbar";
import Login from "./Login";
import Tabs from "./Tabs";
import { useAuth0 } from "@auth0/auth0-react";
import Unauthpage from "./Unauthpage";
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    // <div className="App">
    //   <Appbar />
    //   <Tabs />
    //   {/* <Login /> */}
    // </div>
    <div>
      <Appbar />
      {isAuthenticated ? <Tabs /> : <Unauthpage />}
    </div>
  );
}

export default App;
