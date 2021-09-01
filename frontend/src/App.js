import AskPage from "./pages/askPage"
import Login from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import QuestionPage from "./pages/AllQuestion/questionPage";
import QuestionDisplay from "./pages/questionDisplayPage";
import UsersPage from "./pages/usersPage";
import UsersDisplay from "./pages/usersDisplayPage";
import TaggedQuestionPage from "./pages/AllQuestion/taggedQuestionPage";
import _ from "lodash";
import UnansweredQuestionPage from "./pages/AllQuestion/unansweredQuestionPage";
import NotFoundPage from "./pages/404page";
import HomePage from "./pages/homePage";
import AboutMePage from "./pages/mePage";


function App() {
  const { user } = useContext(AuthContext);
  if (user !== null && !localStorage.getItem('bookmarkSet')) {
    localStorage.setItem('bookmarkSet', true)
    console.log("set at app")
    localStorage.setItem('bookmarks', JSON.stringify(user["bookmarks"]));
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            {user ? <QuestionPage /> : <SignUpPage />}
          </Route>
          <Route path='/login'>
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path='/register'>
            {user ? <Redirect to="/" /> : <SignUpPage />}
          </Route>
          <Route path='/developer'>
            <AboutMePage />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route exact path='/question'>
            {user ? <QuestionPage /> : <Redirect to="/login" />}
          </Route>
          <Route exact path='/question/tagged'>
            {user ? <TaggedQuestionPage /> : <Redirect to="/login" />}
          </Route>
          <Route exact path='/question/unanswered'>
            {user ? <UnansweredQuestionPage /> : <Redirect to="/login" />}
          </Route>
          <Route path='/question/:qid'>
            {user ? <QuestionDisplay /> : <Redirect to="/login" />}
          </Route>
          <Route exact path='/users'>
            {user ? <UsersPage /> : <Redirect to="/login" />}
          </Route>
          <Route path='/user/'>
            {user ? <UsersDisplay /> : <Redirect to="/login" />}
          </Route>
          <Route path='/ask'>
            {user ? <AskPage /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <NotFoundPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
