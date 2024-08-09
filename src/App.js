import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./components/navbar/NavMenu";
import Login from "./components/autho/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import PublishMagazine from "./components/pages/dashboard/PublishMagazine";
import NewMagIssue from "./components/pages/dashboard/NewMagIssue";
import GenreCreate from "./components/pages/dashboard/GenreCreate";
import ArticlesGenreView from "./components/pages/dashboard/ArticlesGenreView";
import PublishMagazineArticle from "./components/pages/dashboard/PublishMagazineArticle";
import DashArticlesByIssue from "./components/pages/dashboard/DashArticlesByIssue";
import DashArticleSingle from "./components/pages/dashboard/DashArticleSingle";

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
        <Route path="/add_article/:id" element={<PublishMagazineArticle />} />
        <Route path="/view_articles/:id" element={<DashArticlesByIssue />} />
        <Route path="/article_single/:id" element={<DashArticleSingle />} />



      </Routes>


      </BrowserRouter>
      
    </div>
  );
}

export default App;
