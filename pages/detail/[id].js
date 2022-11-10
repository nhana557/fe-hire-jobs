import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Head from "next/head";
import Profile from "../../components/Profile";
import Navbar from "../../components/Navbar/NavbarDetail";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

/* SSR */
export async function getServerSideProps(context) {
  const id = context.params.id
  console.log(id)
  const res = await axios.get(`${process.env.API_BACKEND}worker/${id}`);
  return {
    props: { data: res.data.data.worker[0] },
  };
}

const profile = ({ data }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [experience, setExperience] = useState([]);
  const Router = useRouter();
  const id = Router.query.id;
  console.log(id);
  console.log(portfolio);
  const fetchPort = async() =>{
    const result = await axios.get(`${process.env.API_BACKEND}portfolio/${id}`)
    setPortfolio(result.data.data);
  };

  const fetchExperience = async() =>{
    const result = await axios.get(`${process.env.API_BACKEND}experience/${id}`);
    setExperience(result.data.data)
  };

  useEffect(() => {
    fetchPort();
    fetchExperience();
  },[])

  return (
    <div className="body">

      <div className={`${styles.bg_profile}`}>
        <Head>
          <title>Hirejob</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/vercel.svg" />
        </Head>
        <Navbar />
        <div className={`${styles.bg}`}></div>
        <div></div>
        <Profile detail={data} portfolio={portfolio} experience={experience}></Profile>
      </div>
      <Footer />
    </div>
  );
}

export default profile;