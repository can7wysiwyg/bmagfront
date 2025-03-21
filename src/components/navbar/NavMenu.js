import React, { useEffect, useState } from "react";
import { DashboardComp } from "../../helpers/DashboardComp";
import { AuthComp } from "../../helpers/AuthComp";
import Logo from "./Logo.jpg";
import SubTokenCheck from "../../helpers/SubTokenCheck";
import VideoSubToken from "../../helpers/VideoSubToken";
import { fetchAllCategories } from "../../helpers/articlesHelpers/CategoriesFetch";
import { fetchAllLeagues } from "../../helpers/articlesHelpers/LeaguesFetch";



export default function NavMenu() {

   const [categories, setCategories] = useState([]);
  const [leagues, setLeagues ]= useState([])

  useEffect(() => {
    const fetchCats = async () => {
      try {
       const allCats = await fetchAllCategories();
    
      const allLeagues =  await fetchAllLeagues()

   if(allCats && allLeagues && !allCats.error && !allLeagues.error) {

    setCategories(allCats?.categories)
    setLeagues(allLeagues?.leagues)

   }

      } catch (error) {
        console.error("there was a problem");
      }
    };

    fetchCats();
  }, []);

  
  return (
    <>
      <header className="sticky-top bg-white border-bottom border-default">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-white">
            <a className="navbar-brand" href="/">
              <img className="img-fluid" width="100px" src={Logo} alt="BIM" />
            </a>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse text-center"
              id="navigation"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li>

                  <SubTokenCheck />
                </li>

                <li>
                 <VideoSubToken />

                </li>

                <li>{DashboardComp()}</li>

                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    id="pagesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Categories <i className="ti-angle-down ms-1"></i>
                  </p>
                   <ul className="dropdown-menu" aria-labelledby="pagesDropdown">
                    {categories?.map((cat) => (
                      <li key={cat._id}>
                        <a
                          className="dropdown-item"
                          href={`/article_by_genre/${cat._id}`}
                        >
                          {cat.genreName}
                        </a>
                      </li>
                    ))}
                  </ul> 
                </li>

                {/* test */}

                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    id="pagesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                  Football   <i className="ti-angle-down ms-1"></i>
                  </p>
                   <ul className="dropdown-menu" aria-labelledby="pagesDropdown">
                    {leagues?.map((league) => (
                      <li key={league._id}>
                        <a
                          className="dropdown-item"
                          href={`/all_fixtures/${league._id}`}
                        >
                          {league.leagueName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>


                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
                
                <li className="nav-item">{AuthComp()}</li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
