import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./components/navbar/NavMenu";
import Login from "./components/autho/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import PublishMagazine from "./components/pages/dashboard/PublishMagazine";
import NewMagIssue from "./components/pages/dashboard/NewMagIssue";
import GenreCreate from "./components/pages/dashboard/GenreCreate";
import ArticlesGenreView from "./components/pages/dashboard/ArticlesGenreView";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/bmag" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/publish_magazine" element={<PublishMagazine />} />
        <Route path="/new_mag_issue" element={<NewMagIssue />} />
        <Route path="/genres_create" element={<GenreCreate />} />
        <Route path="/article_genres_view" element={<ArticlesGenreView />} />



      </Routes>


      </BrowserRouter>
      
    </div>
  );
}

export default App;
