import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./components/navbar/NavMenu";
import Login from "./components/autho/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import PublishMagazine from "./components/pages/dashboard/PublishMagazine";
import NewMagIssue from "./components/pages/dashboard/NewMagIssue";
import GenreCreate from "./components/pages/dashboard/GenreCreate";
import ArticlesGenreView from "./components/pages/dashboard/ArticlesGenreView";
import PublishArticle from "./components/pages/dashboard/PublishArticle";
import DashArticlesByIssue from "./components/pages/dashboard/DashArticlesByIssue";
import DashArticleSingle from "./components/pages/dashboard/DashArticleSingle";
import EditArticle from "./components/pages/dashboard/EditArticle";
import EditArticleContent from "./components/pages/dashboard/EditArticleContent";
import EditArticleAuthor from "./components/pages/dashboard/EditArticleAuthor";
import EditArticleTitle from "./components/pages/dashboard/EditArticleTitle";
import Home from "./components/pages/publico/Home";
import PostDetails from "./components/pages/publico/PostDetails";
import ArticlesByGenre from "./components/pages/publico/ArticlesByGenre";
import ShowMagIssue from "./components/pages/publico/ShowMagIssue";
import Footer from "./components/pages/publico/Footer";
import About from "./components/pages/publico/About";
import Contact from "./components/pages/publico/Contact";
import SeeMagazines from "./components/pages/dashboard/SeeMagazines";
import AllMagazineIssues from "./components/pages/dashboard/AllMagazineIssues";
import EditMagIssue from "./components/pages/dashboard/EditMagIssue";
import Search from "./components/pages/publico/Search";
import EditMagIssueName from "./components/pages/dashboard/EditMagIssueName";
import UpdateMagaPdf from "./components/pages/dashboard/UpdateMagaPdf";
import UpdateMagaCover from "./components/pages/dashboard/UpdateMagaCover";
import ChooseActionCategory from "./components/pages/dashboard/ChooseActionCategory";
import ViewAllArticles from "./components/pages/dashboard/ViewAllArticles";
import UpdateArticlePhoto from "./components/pages/dashboard/UpdateArticlePhoto";
import ReadMagazine from "./components/pages/publico/ReadMagazine";
import VideosDashboard from "./components/pages/dashboard/VideosDashboard";
import UploadVideo from "./components/pages/dashboard/UploadVideo";
import ManageVideos from "./components/pages/dashboard/ManageVideos";
import ViewVideo from "./components/pages/publico/ViewVideo";
import Videos from "./components/pages/publico/Videos";
import EditVideo from "./components/pages/dashboard/EditVideo";
import EditVideoName from "./components/pages/dashboard/EditVideoName";
import ArticleDashboard from "./components/pages/dashboard/ArticleDashboard";
import SubscribeMagazine from "./components/pages/publico/SubscribeMagazine";
import MagazineSubscriptions from "./components/pages/dashboard/subscriptions/MagazineSubscriptions";
import SubscriptionToken from "./components/pages/dashboard/subscriptions/SubscriptionToken";
import CheckSubscriber from "./components/pages/dashboard/subscriptions/CheckSubscriber";
import MySubscribed from "./components/pages/publico/MySubscrbed";
import MyMagazines from "./components/pages/publico/MyMagazines";
import SubscribeVideo from "./components/pages/publico/videosubsciptions/SubscribeVideo";
import VideoSubscriptions from "./components/pages/dashboard/subscriptions/VideoSubscriptions";
import VideoSubscriptionToken from "./components/pages/dashboard/subscriptions/VideoSubscriptionToken";
import WatchSubscribedVideo from "./components/pages/publico/videosubsciptions/WatchSubscribedVideo";
import CheckVideoSubscriber from "./components/pages/dashboard/subscriptions/CheckVideoSubscriber";
import MySubscribedVideos from "./components/pages/publico/videosubsciptions/MySubscribedVideos";
import MyVideos from "./components/pages/publico/videosubsciptions/MyVideos";

// import Epl from "./components/pages/publico/tables/Epl";


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
        <Route path="/add_article" element={<PublishArticle />} />
        <Route path="/view_articles/:id" element={<DashArticlesByIssue />} />
        <Route path="/article_single/:id" element={<DashArticleSingle />} />
        <Route path="/edit_article/:id" element={<EditArticle />} />
        <Route path="/edit_article_content/:id" element={<EditArticleContent />} />
        <Route path="/edit_article_author/:id" element={<EditArticleAuthor />} />
        <Route path="/edit_article_title/:id" element={<EditArticleTitle />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/article_by_genre/:id" element={<ArticlesByGenre />} />
        <Route path="/show_mag_issue/:id" element={<ShowMagIssue />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/see_magazines" element={<SeeMagazines />} />
        <Route path="/all_magazine_issues" element={<AllMagazineIssues />} />
        <Route path="/edit_mag_issue/:id" element={<EditMagIssue />} />
        <Route path="/search" element={<Search />} />
        <Route path="/edit_magissue_name/:id" element={<EditMagIssueName />} />
        <Route path="/update_magaissue_pdffile/:id" element={<UpdateMagaPdf />} />
        <Route path="/update_magaissue_cover/:id" element={<UpdateMagaCover />} />
        <Route path="/choose_action" element={<ChooseActionCategory />} />
        <Route path="/view_all_articles" element={<ViewAllArticles />} />
        <Route path="/update_article_photo/:id" element={<UpdateArticlePhoto />} />
        <Route path="/read_magazine/:id" element={<ReadMagazine />} />
        <Route path="/videos_dashboard" element={<VideosDashboard />} />
        <Route path="/upload_video" element={<UploadVideo />} />
        <Route path="/manage_videos" element={<ManageVideos />} />
        <Route path="/view_video/:id" element={<ViewVideo />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/edit_video/:id" element={<EditVideo />} />
        <Route path="/edit_video_name/:id" element={<EditVideoName />} />
        <Route path="/articles_dashboard" element={<ArticleDashboard />} />
        <Route path="/subscribe_magazine/:id" element={<SubscribeMagazine />} />
        <Route path="/magazine_subscriptions" element={<MagazineSubscriptions />} />
        <Route path="/subscription_token/:id" element={<SubscriptionToken />} />
        <Route path="/check_subscriber/:id" element={<CheckSubscriber />} />
        <Route path="/my_subscribed_magazines" element={<MySubscribed />} />
        <Route path="/subscribed_magazine/:id" element={<MyMagazines />} />
        <Route path="/subscribe_video/:id" element={<SubscribeVideo />} />
        <Route path="/video_subscriptions" element={<VideoSubscriptions />} />
        <Route path="/video_subscription_token/:id" element={<VideoSubscriptionToken />} />
        <Route path="/watch_subscribed_video/:id" element={<WatchSubscribedVideo />} />
        <Route path="/check_video_subscriber/:id" element={<CheckVideoSubscriber />} />
        <Route path="/watch_my_subscribed_videos" element={<MySubscribedVideos />} />
        <Route path="/subscribed_video/:id" element={<MyVideos />} />
        {/* <Route path="/epl_table" element={<Epl />} /> */}



      </Routes>


      <Footer />


      </BrowserRouter>
      
    </div>
  );
}

export default App;
