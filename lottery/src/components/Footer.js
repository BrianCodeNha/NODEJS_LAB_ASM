import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Address
              </h6>
              <p>
                121, Clear Water Bay Road <br />
                Clear Water Bay, kowloon <br />
                HONG KONG <br />
                <i className="fas fa-phone me-3"></i> + 852 1234 5678 <br />
                <i className="fas fa-fax me-3"></i> + 852 1234 5678 <br />
                <i className="fas fa-envelope me-3"></i> confusion@food.net{" "}
                <br />
              </p>
            </div>

            <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-6">
              <div className="">
                <span>Get connected with us on social networks:</span>
              </div>

              <div>
                
                
                  <i className="fab fa-facebook-f"></i>
              
                  <i className="fab fa-twitter"></i>
                
                  <i className="fab fa-google"></i>
               
                  <i className="fab fa-instagram"></i>
                
                  <i className="fab fa-linkedin"></i>
                
                
                  <i className="fab fa-github"></i>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          confusion
        </a>
      </div>
    </MDBFooter>
  );
}
