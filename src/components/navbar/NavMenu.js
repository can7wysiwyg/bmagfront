import React, { useEffect } from "react";
import { DashboardComp } from "../../helpers/DashboardComp";
import { AuthComp } from "../../helpers/AuthComp";
import { useDispatch, useSelector } from "react-redux";
import { publicGetGenres } from "../../redux/actions/publicAction";
import Logo from "./Logo.jpg";
import SubTokenCheck from "../../helpers/SubTokenCheck";
import { magShowAll } from "../../redux/actions/magazineAction";

export default function NavMenu() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.publicRdcr.categories);
  const magIssues = useSelector((state) => state.magRdcr.magIssues)

  useEffect(() => {
    const fetchCats = async () => {
      try {
        await dispatch(publicGetGenres());
        await dispatch(magShowAll())
      } catch (error) {
        console.error("there was a problem");
      }
    };

    fetchCats();
  }, [dispatch]);

  
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

                {/*magazines  */}

                <li className="nav-item dropdown">
                  <p
                    className="nav-link dropdown-toggle"
                    id="pagesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Magazines <i className="ti-angle-down ms-1"></i>
                  </p>
                  <ul className="dropdown-menu" aria-labelledby="pagesDropdown">
                    {magIssues?.map((magazine) => (
                      <li key={magazine._id}>
                        <a
                          className="dropdown-item"
                          href={`/subscribe_magazine/${magazine._id}`}
                        >
                          {magazine.magazineIssue}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>


               {/*magazines  */}
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
                    Videos <i className="ti-angle-down ms-1"></i>
                  </p>
                  <ul className="dropdown-menu" aria-labelledby="pagesDropdown">
                    
                      <li>
                        <a
                          className="dropdown-item"
                          href="/"
                        >
                          Interviews
                        </a>
                      </li>

                      <li>
                        <a
                          className="dropdown-item"
                          href="/"
                        >
                          Sports
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/"
                        >
                          Entertainment
                        </a>
                      </li>
                    
                  </ul>
                </li>
              



                <li className="nav-item">


                  <a className="nav-link" href="/search">
                    Search
                  </a>
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
                



                {/* end test */}
              

                
                {/* <li className="nav-item">
                  <a className="nav-link" href="/videos">
                    Videos
                  </a>
                </li> */}

                <li className="nav-item">{AuthComp()}</li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
