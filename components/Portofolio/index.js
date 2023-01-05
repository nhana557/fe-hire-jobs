import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

const Portofolio = ({ data }) => {
  const token = Cookies.get('token')
  const id = Cookies.get("id");
  const [loading, setLoading] = useState(false)
  const [dataPort, setDataPort] = useState([])
  const [idPort, setIdPort] = useState('')
  const [formPorto, setPortfolio] = useState({
    name_app: "" ,
    repository: "",
    type: "",
  });
  const [imagePorto, setImagePorto] = useState();
  const handleChangePort = (e) => {
    e.preventDefault();
    setPortfolio({
      ...formPorto,
      [e.target.name]: e.target.value
    });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files;
    setImagePorto(file);
  };
  const handleSubmitPorto = async(e) => {
    setLoading(true)
    e.preventDefault();
    const data = new FormData();
    data.append("name_app", formPorto.name_app);
    data.append("repository", formPorto.repository);
    data.append("type", formPorto.type);
    for(let img of imagePorto){
      data.append("image", img);
    }
    await  axios
        .put(`${process.env.API_BACKEND}portfolio/${idPort}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: res.data.message,
            confirmButtonText: "Oke",
            }).then((res) => {
              if (res.isConfirmed) {
                setLoading(false)
                return window.location.reload();
            }
          })
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
          });});
    }
    
  const getPortByID = (id_port) =>{
    return(
      axios.get(`${process.env.API_BACKEND}portfolio/id/${id_port}`)
      .then(res =>{
        setDataPort(res.data.data[0])
      })
    )
  }
  


  const handleDelete = (Id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#32C33B",
      confirmButtonText: "Deleted",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'loading...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
      })
        return(axios
          .delete(`${process.env.API_BACKEND}portfolio/${Id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              confirmButtonText: "Oke",
            }).then((res) => {
              if (res.isConfirmed) {
                return window.location.reload();
              }
            });
          })
          )
      }
    });
  };

 useEffect(() =>{
  getPortByID()
 }, [])
  return (
    <div>
      <div className="column align-items-center g-1">
        {data?.map((item, index) => {
          return (
            <div className="col-lg-10 categories border ms-lg-5 mb-5" key={index}>
              {id ? (
                <div>
                  <div className="d-flex row mt-2">
                    <div className="col">
                      <button
                        className="btn btn-danger ms-lg-5 ms-3"
                        onClick={() => {
                          handleDelete(item.id);
                          
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="col">
                      <a className="d-flex ms-auto ">
                        <h4 className="font-category fw-1 m-auto">
                          {item.name_app}
                        </h4>
                      </a>
                    </div>
                    <div className="col ">
                      <div
                        className="edit-icon"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#updatePorto"
                      >
                        <button className="btn btn-primary ms-lg-5 "
                        onClick={() =>{
                          setIdPort(item.id)
                          getPortByID(item.id)
                        }
                      }
                        >{!loading ? "Update" : "Wait..."}</button>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="updatePorto"
                      tabIndex="-1"
                      aria-labelledby="editPhotoLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="editPhotoLabel">
                              Update Portfolio
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <form
                              className="w-100 form-sign-up"
                            >
                              <div className="mb-2">
                                <label htmlFor="nama" className="form-label">
                                  Nama Aplikasi
                                </label>
                                <input
                                  type="text"
                                  defaultValue={dataPort?.name_app}
                                  name="name_app"
                                  className="form-input form-control"
                                  id="nama"
                                  placeholder="Masukan nama aplikasi"
                                  onChangeCapture={handleChangePort}
                                />
                              </div>

                              <div className="mb-2">
                                <label htmlFor="nama" className="form-label">
                                  Link repository
                                </label>
                                <input
                                  type="text"
                                  defaultValue={dataPort?.repository}
                                  name="repository"
                                  className="form-input form-control"
                                  id="nama"
                                  placeholder="Masukan link repository"
                                  onChangeCapture={handleChangePort}
                                />
                              </div>

                              <div className="mb-2">
                                <label htmlFor="nama" className="form-label">
                                  Type portofolio
                                </label>
                                <div className="container row">
                                  <div className="form-check col-4">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="type"
                                      id="flexRadioDefault1"
                                      value="Aplikasi Mobile"
                                      onChangeCapture={handleChangePort}
                                    />
                                    <label
                                      className="form-check-label"
                                    >
                                      Aplikasi mobile
                                    </label>
                                  </div>
                                  <div className="form-check col-4">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="type"
                                      id="flexRadioDefault2"
                                      value="Aplikasi Web"
                                      onChangeCapture={handleChangePort}
                                    />
                                    <label
                                      className="form-check-label"
                                    >
                                      Aplikasi web
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-2">
                                <label htmlFor="nama" className="form-label">
                                  Upload Gambar
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={handleUpload}
                                  multiple
                                ></input>
                              </div>
                              <div className="row justify-content-center">
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              id="close"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              id="close"
                              data-bs-dismiss="modal"
                              onClick={handleSubmitPorto
                              }
                              className="btn bg-primary text-white"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <Link href={item.repository} className="btn btn-transparent fs-5 fw-bold text-danger w-50 ">Link Repository</Link>
                  </div>
                </div>
              ) : (
                <div>
                <span
                  className="d-flex ms-auto "
                >
                  <h1 className="font-category fw-1 m-auto">{item.name_app}</h1>
                </span>
                <div className="d-flex justify-content-center mt-2">
                    <Link href={item.repository} className="btn btn-primary w-50 ">Link Repository</Link>

                </div>
                </div>
              )}
              <div className="row">
                {item?.image?.map((image, index) => {
                  return (
                    <div className="col-5 m-auto mt-5" key={index}>
                      <Image
                        className="mb-2 "
                        src={image}
                        width="1"
                        height={1}
                        layout="responsive"
                        alt="portofolio"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portofolio;
