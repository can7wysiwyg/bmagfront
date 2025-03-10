import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminLogin } from '../../redux/actions/adminAuthAction'
import "./auth.css"


export default function Login() {

    const[formData, setFormData] = useState({
        email: "",
        password: ""
    })

    


     const [loading, setLoading] = useState(false); // Loading state
    const dispatch = useDispatch()


    const handleInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });

    }


    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); // Show spinner
      try {
        await dispatch(adminLogin(formData));
      } catch (error) {
        console.log("Login failed:", error);
      } finally {
        setLoading(false); // Hide spinner after login
      }
    };
  

    
  return (
    <>
    <div className="container" style={{ marginTop: "2rem", marginBottom: "6rem" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <strong>Admin Login</strong>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <br />
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <br />

                  <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    "Login"
                  )}
                </button>

                  
                </form>
              </div>

              
            </div>
          </div>
        </div>
      </div>

    
    
    
    
    
    
    </>
  )
}
