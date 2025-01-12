import React from 'react'
import Logo from "./Logo.jpg"


export default function Footer() {
  return (
    <>
    <footer className="section-sm pb-0 border-top border-default">
  <div className="container">
    <div className="row justify-content-between">
      <div className="col-md-3 mb-4">
        <a className="mb-4 d-block" href="index.html">
          <img className="img-fluid " width="100px" src={Logo} alt="BIM" />
        </a>
        <p>
        Business In-detail Magazine (BIM) is a creative agency which specialises in all media related issues. 

           </p>
      </div>

      <div className="col-lg-2 col-md-3 col-6 mb-4">
        <h6 className="mb-4">Quick Links</h6>
        <ul className="list-unstyled footer-list">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/">Home</a></li>
          
          
        </ul>
      </div>

      <div className="col-lg-2 col-md-3 col-6 mb-4">
        <h6 className="mb-4">Social Links</h6>
        <ul className="list-unstyled footer-list">
          <li><a href="https://www.facebook.com/profile.php?id=100080092784804&mibextid=ZbWKwL">Facebook</a></li>
          <li><a href="https://x.com/bim_magazini?t=_7KbTNKWJkNXGHiXmFqJcQ&s=09">Twitter</a></li>
    
          <li><a href="https://www.instagram.com/bim_magazine?igsh=cjVvY3M0cDJzMTV2">Instagram</a></li>
        </ul>
      </div>

      <div className="col-md-3 mb-4">
        <h6 className="mb-4">Subscribe Newsletter</h6>
        <form className="subscription" action="javascript:void(0)" method="post">
          <div className="position-relative">
            <i className="ti-email email-icon"></i>
            <input type="email" className="form-control" placeholder="Your Email Address" />
          </div>
          <button className="btn btn-primary btn-block rounded" type="submit">Subscribe now</button>
        </form>
      </div>
    </div>
    <div className="scroll-top">
      <a href="javascript:void(0);" id="scrollTop"><i className="ti-angle-up"></i></a>
    </div>
    <div className="text-center">
      <p className="content">
        &copy; Developed By MercuryWeb
      </p>
    </div>
  </div>
</footer>




    </>
  )
}
