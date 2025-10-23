import React, { useEffect } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import image1 from '../../assets/image1.jpeg'
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.webp';
import image5 from '../../assets/image5.jpg';
import './ethos.css';

import { useSelector } from "react-redux";

const Ethos = () => {



    const APIURL = useSelector((state) => state.APIURL.url);

    console.log(APIURL, "api url ")


    useEffect(() => {
        console.log(APIURL, 'api url');
    }, [APIURL]); // runs whenever APIURL changes, including first load





    return (
        <div className="ethos-container">
            <Header />
            <div className="image-container">
                <img src={image1} alt="Ethos content" className="ethos-image" />
            </div>
            <main className="ethos-main">


                <div className="ethos-content">
                    <h1 className="ethos-title">Converging Horizons</h1>
                    <p className="ethos-description">Etomosphere is where technology, education, and community unite. We are building a future-ready ecosystem that empowers schools, institutions, and learners with solutions that inspire growth and innovation.</p>
                </div>


            </main>

            <div className="split-container">


                <div className="split-image">

                    <img src={image3} alt="Etomosphere content" className="content-image" />

                </div>


                <div className="mission-content">

                    <div className="mission-section">
                        <h2 className="mission-title">Our Mission</h2>
                        <p className="mission-text">To transform education <br /> through intelligent, <br /> connected solutions <br /> that empower teachers, <br /> engage learners, and <br /> elevate the entire <br /> learning experience <br /> beyond traditional <br /> boundaries.</p>
                    </div>

                </div>




            </div>

            <div className="image4-container">
                <img src={image4} alt="Etomosphere content" className="image4" />

            </div>

            <div className="ecosystem-section">
                <h2 className="ecosystem-title">Our Ecosystem Of Solutions</h2>
                <p className="ecosystem-text">Etomosphere unites trusted products and technologies into a <br /> connected system that builds better learning environments.</p>
            </div>


            <div className="ecosystem-split-container">



                <div className="ecosystem-content">


                    <h1 className="ecosystem-main-title">Shaping the Future of Learning</h1>


                    <p className="ecosystem-main-description">We envision a world where <br /> innovation fuels imagination <br /> and education evolves beyond <br /> boundaries. Etomosphere is at <br /> the forefront of that transformation.</p>


                </div>



                <div className="ecosystem-image">

                    <img src={image5} alt="Etomosphere content" className="ecosystem-main-image" />


                </div>




            </div>






            <Footer />
        </div>
    );
};

export default Ethos;
