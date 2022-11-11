import React, { useEffect, useState } from "react";
import Image from "next/image";
import baner1 from "../../assets/image/baner1.svg";
// import banerBg from "../../assets/image/baner-bg1.svg";
import baner2 from "../../assets/image/baner2.svg";
import swal1 from "../../assets/iconpp.jpg";
import baner3 from "../../assets/image/baner3.svg";
// import test from "../../assets/image/test.svg";
import styles from "../../styles/header.module.css";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import axios from "axios";

function Baner({ data }) {
  console.log("ini data", data);
  const [detail, setDetail] = useState([]);
  const fetch = async () => {
    const result = await axios.get(`${process.env.API_BACKEND}review`);

    setDetail(result.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="container">
      <div className=" container-sm container_content1 mb-5">
        <div className="contain-tex m-auto">
          <h1>Talenta terbaik negri untuk perubahan revolusi 4.0</h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </p>
          <Link href="/detail">
            <button className="btn btn-custom">Mulai Dari Sekarang</button>
          </Link>
        </div>
        <div className="">
          <div className="">
            <Image src={baner1} alt='gambar1'/>
          </div>
        </div>
      </div>
      <div className="container-sm container_content1">
        <div className="container-sm contain-text">
          <div>
            <Image src={baner2} alt='gambar2'/>
          </div>
        </div>
        <div className="d-flex flex-column w-100 align-self-center">
          <h1>Kenapa harus mencari tallent di peworld</h1>
          <ul className="daftar">
            <li>
              <i className="bi bi-check-circle-fill" />
              <span> Lorem ipsum dolor sit amet.</span>
            </li>
            <li>
              <i className="bi bi-check-circle-fill" />
              <span> Lorem ipsum dolor sit amet.</span>
            </li>
            <li>
              <i className="bi bi-check-circle-fill" />
              <span> Lorem ipsum dolor sit amet.</span>
            </li>
            <li>
              <i className="bi bi-check-circle-fill" />
              <span> Lorem ipsum dolor sit amet.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container_content1 ">
        <div className="contain-text2 ">
          <h1 className="ms-5">Skill Tallent</h1>
          <span className="fw-light ms-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </span>
          <div className="container-sm mt-2">
            <ul className="list-skill">
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Java</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Kotlin</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> PHP</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Javascrip</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Golang</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> C++</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> Ruby</span>
              </li>
              <li>
                <i className="bi bi-check-circle-fill text-color" />
                <span> 10+ Bahasa lainnya</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container_img d-flex justify-content-center align-items-center">
          <div className="contain-img3">
            <Image src={baner3} alt="gambar3"/>
          </div>
        </div>
      </div>

      <div className="container-sm">
        <h1 className="text-center">Their opinion about peworld</h1>
        <Swiper
          className="container container_swiper"
          modules={[Pagination, Navigation]}
          slidesPerView={3}
          spaceBetween={0}
          // pagination= {{clickable: true}}
          navigation={true}
          breakpoints={{
            //when window width is >= 440
            300: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 1,
            },
            440: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {data
            ? data.map((item, index) => {
                console.log(item.image);
                return (
                  <SwiperSlide className="" key={index}>
                    <div className="Card">
                      <div className="bg-img d-flex justify-content-center mt-4">
                        <div className="card-img">
                          <Image
                            src={
                              item.image !== null
                                ? `https://drive.google.com/uc?export=view&id=${item.image}`
                                : swal1
                            }
                            className="img7"
                            width={100}
                            height={100}
                            alt="profile"
                          />
                        </div>
                      </div>
                      <div className="card-text ms-3">
                        <h3 className="me-4">{item.fullname}</h3>
                        <span className="fw-light">{item.jobs}</span>
                        <p className="w-75 ms-4">{item.opini}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            : detail.map((item, index) => {
                console.log(item);
                return (
                  <SwiperSlide className="" key={index}>
                    <div className="Card">
                      <div className="bg-img d-flex justify-content-center mt-4">
                        <div className="card-img">
                          <Image
                            src={
                              item.image !== null
                                ? `https://drive.google.com/uc?export=view&id=${item.image}`
                                : swal1
                            }
                            className="img7"
                            width={100}
                            height={100}
                            alt="profile"
                          />
                        </div>
                      </div>
                      <div className="card-text ms-3">
                        <h3 className="me-4">{item.fullname}</h3>
                        <span className="fw-light">{item.jobs}</span>
                        <p className="w-75 ms-4">{item.opini}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}

          {/* <SwiperSlide  className=''>
            <div className='Card'>
                <div className='bg-img'>
                    <div className="card-img ">
                        <Image src={swal1} className="img7"/>
                    </div>
                    
                </div>
                <div  className='card-text '>
                        <h3 className=''>Niall Horan</h3>
                        <span className='fw-light'>Web Developer</span>
                        <p className='w-75 ms-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    </div>
            </div>
        </SwiperSlide>
        <SwiperSlide  className=''>
            <div className='Card'>
                <div className='bg-img'>
                    <div className="card-img ">
                        <Image src={swal1} className="img7"/>
                    </div>
                    
                </div>
                <div  className='card-text '>
                        <h3 className=''>Niall Horan</h3>
                        <span className='fw-light'>Web Developer</span>
                        <p className='w-75 ms-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    </div>
            </div>
        </SwiperSlide>
        <SwiperSlide  className=''>
            <div className='Card'>
                <div className='bg-img'>
                    <div className="card-img ">
                        <Image src={swal1} className="img7"/>
                    </div>
                    
                </div>
                <div  className='card-text '>
                        <h3 className=''>Niall Horan</h3>
                        <span className='fw-light'>Web Developer</span>
                        <p className={`w-75 ms-4 `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    </div>
            </div>
        </SwiperSlide> */}
        </Swiper>
      </div>

      <div className="container_content4 my-5">
        <div className={`${styles.container_img4}`}>
          <div className="">
            <p className={`text-white w-50 ms-5 fs-2 ${styles.text_custom}`}>
              Lorem ipsum dolor sit amet
            </p>
          </div>
          <div className="d-flex justify-content-end me-5">
            <button
              className={`btn bg-white py-2 fs-5 btn3 ${styles.btn_custom}`}
            >
              Mulai Dari Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Baner;
