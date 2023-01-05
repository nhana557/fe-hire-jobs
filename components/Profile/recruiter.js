import React from "react";
import styles from '../../styles/Profile.module.css'
import Image from "next/image";
import PhotoProfile from "../../assets/iconOffice.svg";
import Link from "next/link";

const Profile = ({ detail }) => {
  return (
    <div className="body">
      <div className={`container mt-5`}>
        <div className="row mt-3 justify-content-center">
          <div className="col-lg col-sm-8">
          <div className={`${styles.bg1}`}></div>
            <div className={`card mb-5 ${styles.border_none}`}>
              <div className={`card-body ${styles.border_none1}`}>
                <div className={`${styles.img_profile}`}>
                 
                      <Image
                        src={
                          detail.image
                            ? `https://drive.google.com/thumbnail?id=${detail.image}&sz=s1080`
                            : PhotoProfile
                        }
                        className={`${styles.img_profile}`}
                        priority={true}
                        layout="responsive"
                        width="50"
                        height="50"
                        alt="Photo Profile"
                      />
                </div>
                <div className="text-center">
                  <h3>{detail?.company}</h3>
                  <h5>{detail?.company_field}</h5>
                  <p>{detail?.address}</p>
                  <p>{detail.company_description ? detail.company_description : ``}</p>
                </div>
                <div className="container w-50">
                    <button className={`btn ${styles.btn_custom}`}>
                      Hubungi
                    </button>
                  <div className=" d-flex w-100 mt-5 text-secondary text-decoration-none flex-column align-items-center fs-5">
                    <div className="d-flex flex-column ">
                      <span className="mb-2">
                        <i className="bi bi-envelope me-3 " /> {detail.email}
                      </span>
                      <span className="mb-2">
                        <i className="bi bi-instagram me-3 " /> {detail.instagram}
                      </span>
                      <span className="mb-2">
                        <i className="bi bi-telephone me-3 " /> {detail.phonenumber}
                      </span>
                      <span className="mb-2">
                        <i className="bi bi-linkedin me-3 " /> {detail.linkedin}
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;