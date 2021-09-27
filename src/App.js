import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreatePost } from "./pages/CreatePost";
import { Post } from "./pages/Post";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";


const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/createpost">Create A Post</Link>
          <Link to="/">Home Page</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>

        </div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createpost" component={CreatePost} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
