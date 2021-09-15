import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreatePost } from "./pages/CreatePost";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost">Create A Post</Link>
        <Link to="/">Home Page</Link>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createpost" component={CreatePost} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
