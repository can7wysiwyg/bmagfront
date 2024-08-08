import React, { useState } from 'react'
import "./auth.css"
import { useDispatch } from 'react-redux'
import { adminLogin } from '../../redux/actions/adminAuthAction'



export default function Login() {

    const[formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()


    const handleInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });

    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        await dispatch(adminLogin(formData))


    }

  return (
    <>
    <div className="container" style={{ marginTop: "2rem" }}>
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

                  <button type="submit" className="btn btn-primary">
                    login
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
