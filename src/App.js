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
import EditArticle from "./components/pages/dashboard/EditArticle";
import EditArticleContent from "./components/pages/dashboard/EditArticleContent";
import EditArticleAuthor from "./components/pages/dashboard/EditArticleAuthor";
import EditArticleTitle from "./components/pages/dashboard/EditArticleTitle";
import Home from "./components/pages/publico/Home";
import PostDetails from "./components/pages/publico/PostDetails";
import ArticlesByGenre from "./components/pages/publico/ArticlesByGenre";
import ShowAllMagIssueArticles from "./components/pages/publico/ShowAllMagIssueArticles";
import Footer from "./components/pages/publico/Footer";
import About from "./components/pages/publico/About";
import Contact from "./components/pages/publico/Contact";
import SeeMagazines from "./components/pages/dashboard/SeeMagazines";
import AllMagazineIssues from "./components/pages/dashboard/AllMagazineIssues";
import EditMagIssue from "./components/pages/dashboard/EditMagIssue";
import Search from "./components/pages/publico/Search";


function App() {
  return (
    <div>
      <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmag" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/publish_magazine" element={<PublishMagazine />} />
        <Route path="/new_mag_issue" element={<NewMagIssue />} />
        <Route path="/genres_create" element={<GenreCreate />} />
        <Route path="/article_genres_view" element={<ArticlesGenreView />} />
        <Route path="/add_article/:id" element={<PublishMagazineArticle />} />
        <Route path="/view_articles/:id" element={<DashArticlesByIssue />} />
        <Route path="/article_single/:id" element={<DashArticleSingle />} />
        <Route path="/edit_article/:id" element={<EditArticle />} />
        <Route path="/edit_article_content/:id" element={<EditArticleContent />} />
        <Route path="/edit_article_author/:id" element={<EditArticleAuthor />} />
        <Route path="/edit_article_title/:id" element={<EditArticleTitle />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/article_by_genre/:id" element={<ArticlesByGenre />} />
        <Route path="/show_all_mag_issue_articles/:id" element={<ShowAllMagIssueArticles />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/see_magazines" element={<SeeMagazines />} />
        <Route path="/all_magazine_issues" element={<AllMagazineIssues />} />
        <Route path="/edit_mag_issue/:id" element={<EditMagIssue />} />
        <Route path="/search" element={<Search />} />



      </Routes>


      <Footer />


      </BrowserRouter>
      
    </div>
  );
}

export default App;
