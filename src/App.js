import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./components/navbar/NavMenu";
import Login from "./components/autho/Login";
// import Dashboard from "./components/pages/dashboard/Dashboard";
// import PublishMagazine from "./components/pages/dashboard/magazines/PublishMagazine";
// import NewMagIssue from "./components/pages/dashboard/magazines/NewMagIssue";
// import GenreCreate from "./components/pages/dashboard/categories/GenreCreate";
// import ArticlesGenreView from "./components/pages/dashboard/articles/ArticlesGenreView";
// import PublishArticle from "./components/pages/dashboard/articles/PublishArticle";
// import DashArticlesByIssue from "./components/pages/dashboard/articles/DashArticlesByIssue";
// import DashArticleSingle from "./components/pages/dashboard/articles/DashArticleSingle";
// import EditArticle from "./components/pages/dashboard/articles/EditArticle";
// import EditArticleContent from "./components/pages/dashboard/articles/EditArticleContent";
// import EditArticleAuthor from "./components/pages/dashboard/articles/EditArticleAuthor";
// import EditArticleTitle from "./components/pages/dashboard/articles/EditArticleTitle";
import Home from "./components/pages/publico/Home";
 import PostDetails from "./components/pages/publico/articles/PostDetails";
// import ArticlesByGenre from "./components/pages/publico/articles/ArticlesByGenre";
// import ShowMagIssue from "./components/pages/publico/magazines/ShowMagIssue";
 import Footer from "./components/pages/publico/Footer";
// import About from "./components/pages/publico/About";
// import Contact from "./components/pages/publico/Contact";
// import SeeMagazines from "./components/pages/dashboard/magazines/SeeMagazines";
// import AllMagazineIssues from "./components/pages/dashboard/magazines/AllMagazineIssues";
// import EditMagIssue from "./components/pages/dashboard/magazines/EditMagIssue";
// import Search from "./components/pages/publico/Search";
// import EditMagIssueName from "./components/pages/dashboard/magazines/EditMagIssueName";
// import UpdateMagaPdf from "./components/pages/dashboard/magazines/UpdateMagaPdf";
// import UpdateMagaCover from "./components/pages/dashboard/magazines/UpdateMagaCover";
// import ChooseActionCategory from "./components/pages/dashboard/categories/ChooseActionCategory";
// import ViewAllArticles from "./components/pages/dashboard/articles/ViewAllArticles";
// import UpdateArticlePhoto from "./components/pages/dashboard/articles/UpdateArticlePhoto";
 import ReadMagazine from "./components/pages/publico/magsubs/ReadMagazine";
// import VideosDashboard from "./components/pages/dashboard/videos/VideosDashboard";
// import UploadVideo from "./components/pages/dashboard/videos/UploadVideo";
// import ManageVideos from "./components/pages/dashboard/videos/ManageVideos";
// import ViewVideo from "./components/pages/publico/videos/ViewVideo";
// import EditVideo from "./components/pages/dashboard/videos/EditVideo";
// import EditVideoName from "./components/pages/dashboard/videos/EditVideoName";
// import ArticleDashboard from "./components/pages/dashboard/articles/ArticleDashboard";
import SubscribeMagazine from "./components/pages/publico/magsubs/SubscribeMagazine";
// import MagazineSubscriptions from "./components/pages/dashboard/subscriptions/MagazineSubscriptions";
// import SubscriptionToken from "./components/pages/dashboard/subscriptions/SubscriptionToken";
// import CheckSubscriber from "./components/pages/dashboard/subscriptions/CheckSubscriber";
// import MySubscribed from "./components/pages/publico/magsubs/MySubscrbed";
  import MyMagazines from "./components/pages/publico/magazines/MyMagazines";
// import SubscribeVideo from "./components/pages/publico/videosubsciptions/SubscribeVideo";
// import VideoSubscriptions from "./components/pages/dashboard/subscriptions/VideoSubscriptions";
// import VideoSubscriptionToken from "./components/pages/dashboard/subscriptions/VideoSubscriptionToken";
// import WatchSubscribedVideo from "./components/pages/publico/videosubsciptions/WatchSubscribedVideo";
// import CheckVideoSubscriber from "./components/pages/dashboard/subscriptions/CheckVideoSubscriber";
// import MySubscribedVideos from "./components/pages/publico/videosubsciptions/MySubscribedVideos";
// import MyVideos from "./components/pages/publico/videosubsciptions/MyVideos";
// import VideosByGenre from "./components/pages/publico/videos/VideosByGenre";
// import LocalFootball from "./components/pages/dashboard/soccer/LocalFootball";
// import CreateLeague from "./components/pages/dashboard/soccer/CreateLeague";
// import CreateTeam from "./components/pages/dashboard/soccer/CreateTeam";
// import CreateMatch from "./components/pages/dashboard/soccer/CreateMatch";
// import Teams from "./components/pages/dashboard/soccer/Teams";
// import Leagues from "./components/pages/dashboard/soccer/Leagues";
// import Games from "./components/pages/dashboard/soccer/Games";
// import Game from "./components/pages/dashboard/soccer/Game";
// import AllFixtures from "./components/pages/publico/football/AllFixtures";
// import LeagueByName from "./components/pages/publico/football/LeagueByName";
// import CreateTable from "./components/pages/dashboard/soccer/CreateTable";
// import SingleLeague from "./components/pages/dashboard/soccer/SingleLeague";
// import ManageTables from "./components/pages/dashboard/soccer/ManageTables";
// import ManageTable from "./components/pages/dashboard/soccer/ManageTable";
// import PostComments from "./components/pages/publico/articles/PostComments";
// import MostViewed from "./components/pages/dashboard/articles/MostViewed";

// import Epl from "./components/pages/publico/tables/Epl";


function App() {
  return (
    <div>
      <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmag" element={<Login />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/subscribed_magazine/:id" element={<MyMagazines />} />
        <Route path="/subscribe_magazine/:id" element={<SubscribeMagazine />} />
        <Route path="/read_magazine/:id" element={<ReadMagazine />} />

        {/* <Route path="/dashboard" element={<Dashboard />} />
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
        
        <Route path="/videos_dashboard" element={<VideosDashboard />} />
        <Route path="/upload_video" element={<UploadVideo />} />
        <Route path="/manage_videos" element={<ManageVideos />} />
        <Route path="/view_video/:id" element={<ViewVideo />} />
        <Route path="/videos/:id" element={<VideosByGenre />} />
        <Route path="/edit_video/:id" element={<EditVideo />} />
        <Route path="/edit_video_name/:id" element={<EditVideoName />} />
        <Route path="/articles_dashboard" element={<ArticleDashboard />} />
        
        <Route path="/magazine_subscriptions" element={<MagazineSubscriptions />} />
        <Route path="/subscription_token/:id" element={<SubscriptionToken />} />
        <Route path="/check_subscriber/:id" element={<CheckSubscriber />} />
        <Route path="/my_subscribed_magazines" element={<MySubscribed />} />
        
        <Route path="/subscribe_video/:id" element={<SubscribeVideo />} />
        <Route path="/video_subscriptions" element={<VideoSubscriptions />} />
        <Route path="/video_subscription_token/:id" element={<VideoSubscriptionToken />} />
        <Route path="/watch_subscribed_video/:id" element={<WatchSubscribedVideo />} />
        <Route path="/check_video_subscriber/:id" element={<CheckVideoSubscriber />} />
        <Route path="/watch_my_subscribed_videos" element={<MySubscribedVideos />} />
        <Route path="/subscribed_video/:id" element={<MyVideos />} />
        <Route path="/local_football_dashboard" element={<LocalFootball />} />
        <Route path="/create_league" element={<CreateLeague />} />
        <Route path="/create_team" element={<CreateTeam />} />
        <Route path="/create_match" element={<CreateMatch />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/admin_games" element={<Games />} />
                <Route path="/game/:id/:leagueId" element={<Game />} />

        <Route path="/all_fixtures/:id" element={<AllFixtures />} />
        <Route path="/league_by_name/:id" element={<LeagueByName />} />
        <Route path="/create_table" element={<CreateTable />} />
        <Route path="/single_league/:id" element={<SingleLeague />} />
        <Route path="/manage_tables" element={<ManageTables />} />
        <Route path="/view_league_table/:id" element={<ManageTable />} />
        <Route path="/post_cooments/:id" element={<PostComments />} />
        <Route path="/most_viewed_articles" element={<MostViewed />} />
         */}


      </Routes>


      <Footer />


      </BrowserRouter>
      
    </div>
  );
}

export default App;
