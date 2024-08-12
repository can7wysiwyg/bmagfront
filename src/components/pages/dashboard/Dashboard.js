import React from 'react'

export default function Dashboard() {
  return (
    <>

<section className="py-6 bg-light-primary mb-5">
    <div className="container">
        <div className="row justify-content-center text-center mb-4">
            <div className="col-xl-6 col-lg-8 col-sm-10" style={{marginTop: "1.5px"}}>
                <h2 className="font-weight-bold">Welcome!</h2>
                <p className="text-muted mb-0">select what to do from the below menu items</p>
            </div>
        </div>

        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate" data-aos="fade-up">



        <div className="col my-3">
                <div className="card border-hover-primary hover-scale">
                    <div className="card-body">
                        <div className="text-primary mb-5">
                        <i className="bi bi-cloud-upload" style={{fontSize: "70px"}}></i>


                           
                        </div>
                        <h6 className="font-weight-bold mb-3">NEW MAGAZINE</h6>
                        <p className="text-muted mb-0"><a href="/publish_magazine">publish new magazine issue</a></p>
                    </div>
                </div>
            </div>
            {/* user bar end */}


            <div className="col my-3">
    <div className="card border-hover-primary hover-scale">
        <div className="card-body">
            <div className="text-primary mb-5">
            <i className="bi bi-newspaper" style={{fontSize: "70px"}}></i>
            </div>
            <h6 className="font-weight-bold mb-3">MAGAZINES</h6>
            <p className="text-muted mb-0"><a href="/see_magazines">see and manage magazines</a></p>
        </div>
    </div>
</div>
{/* book item ends */}


<div className="col my-3">
    <div className="card border-hover-primary hover-scale">
        <div className="card-body">
            <div className="text-primary mb-5">

            <i className="bi bi-collection" style={{fontSize: "70px"}}></i>
                

            </div>
            <h6 className="font-weight-bold mb-3">GENRES</h6>
            <p className="text-muted mb-0"><a href="/genres_create">View and manage articles genres</a></p>
        </div>
    </div>
</div>
{/* categories item ends here */}





{/* never here */}
</div>

        </div>



      </section>




    </>
  )
}
