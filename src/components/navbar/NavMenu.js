import React, { useEffect } from 'react'
import { DashboardComp } from '../../helpers/DashboardComp'
import { AuthComp } from '../../helpers/AuthComp'
import { useDispatch, useSelector } from 'react-redux'
import { publicGetGenres } from '../../redux/actions/publicAction'

export default function NavMenu() {

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.publicRdcr.categories)

    useEffect(() => {

const fetchCats = async()=> {
    try {

        await dispatch(publicGetGenres())
        
    } catch (error) {
        console.error("there was a problem")
    }
}

fetchCats()

    }, [dispatch])


    if(!categories || categories === undefined || categories === null) {
        return(<>
        <h5 className='text-center mt-5'>categories are loading</h5>
        
        </>)
    }

  return (
    <>
<header className="sticky-top bg-white border-bottom border-default">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-white">
          <a className="navbar-brand" href="/">
            <img className="img-fluid" width="150px" src="images/logo.png" alt="BIM" />
          </a>
          
<button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navigation">
  <span className="navbar-toggler-icon"></span>
</button>


          <div className="collapse navbar-collapse text-center" id="navigation">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              
              <li>

                {DashboardComp()}
              </li>


              <li className="nav-item">
                <a className="nav-link" href="about.html">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">Contact</a>
              </li>
              <li className="nav-item dropdown">
                <p className="nav-link dropdown-toggle"  id="pagesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categories <i className="ti-angle-down ms-1"></i>
                </p>
                <ul className="dropdown-menu" aria-labelledby="pagesDropdown">

                    {
                        categories?.map((cat) => (
                            <li key={cat._id}><a className="dropdown-item" href={`/article_by_genre/${cat._id}`}>{cat.genreName}</a></li>

                        ))
                    }
                  
                </ul>
              </li>

              <li className='nav-item'>
                {
                 AuthComp()   
                }

              </li>
            </ul>

           
            
          </div>
        </nav>
      </div>
    </header>



    </>
  )
}
