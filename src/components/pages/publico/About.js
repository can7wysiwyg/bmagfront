import React from 'react'
import Logo from "./Logo.jpg"

export default function About() {
  return (
    <>
    <section className="section-sm">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="title-bordered mb-5 d-flex align-items-center">
          <h1 className="h4">About Businees in-detail Magazine (BIM)</h1>
          <ul className="list-inline social-icons ml-auto mr-3 d-none d-sm-block">
            <li className="list-inline-item"><a href="#"><i className="ti-facebook"></i></a></li>
            <li className="list-inline-item"><a href="#"><i className="ti-twitter-alt"></i></a></li>
            <li className="list-inline-item"><a href="#"><i className="ti-linkedin"></i></a></li>
            <li className="list-inline-item"><a href="#"><i className="ti-github"></i></a></li>
          </ul>
        </div>
        <img src={Logo} className="img-fluid w-100 mb-4 rounded-lg " alt="author" />
        <div className="content">
          <p>
          Business In-detail Magazine (BIM) is a creative agency which specialises in all media related issues. 

          </p>
          <p>
          Emphasis is placed on publishing (Discover Malawi and Business In-detail Magazines), documentaries, advertising (digital and local), branding, graphic designing, event hosting and promotion, website development and offer media consulting among others. 

            
          </p>
          <div className="quote">
            <i className="ti-quote-left"></i>
            <div>
              <p>
              Through us, local businesses are able to reach a wide and targeted audience using our magazines and social media platforms. Our team is result driven which helps our clients, partners enjoy the desired benefits of our mutual agreement. 
              </p>
              <span className="quote-by">We are based in the capital Lilongwe, Malawi and we do offer our services nationwide and internationally. </span>
            </div>
          </div>
          <hr />
          {/* <h4 id="my-skills--experiences"> &amp; </h4>
          <p>
          
          </p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <p>
            
          </p> */}
        </div>
      </div>
    </div>
  </div>
</section>

    
    
    
    </>
  )
}
