import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import classroomImage from '../../assets/classroom.png';
import IfpsEconomical from '../../assets/IfpsEconomical.jpg';
import education      from '../../assets/education.png';
import branded from '../../assets/Branded.jpg';
import withcamera from '../../assets/withcamera.avif';
import androidonly from '../../assets/androidonly.jpg';
import opsincluded from '../../assets/opsincluded.png';
import auditorium from '../../assets/auditorium.png';
import Counselling from '../../assets/Counselling.png';
import controlroom from '../../assets/Controlroom.png';

import './educosystem.css';

const Educosystem = () => {
    const navigate = useNavigate();
    
    const handleConfigureClick = (solution) => {
        // Store the selected solution data in localStorage
        localStorage.setItem('selectedSolution', JSON.stringify(solution));
        // Navigate to educosDetails component
        navigate('/educosdetails');
    };

    const [solutions, setSolutions] = useState([
        {
          id: 1,
          name: "Classroom ",
          image: classroomImage,
          description: "End-to-end digital classroom ecosystem with display, writing, and audio solutions.",
          sections: [
            {
              name: "IFPS",
              items: [
                {
                  title: "Economical Series",
                  details:
                    "Affordable and reliable interactive panels designed to deliver essential features without compromise — perfect for budget-friendly classrooms and institutions.",
                  image: IfpsEconomical,
                },
                {
                  title: "Branded Series",
                  details:
                    "Premium-quality panels from trusted manufacturers, offering superior performance, durability, and advanced interactive technology for professional use.",
                  image: branded,
                },
                {
                  title: "For Education Series",
                  details:
                    "Tailored for schools and colleges, these panels create engaging, interactive classrooms that make learning more visual, collaborative, and effective.",
                  image:education
                },
                {
                  title: "With Camera Series",
                  details:
                    "Built-in camera models ideal for hybrid learning and video conferencing — enabling seamless communication and smart teaching experiences.",
                  image:withcamera,
                },
                {
                  title: "Android Only Series",
                  details:
                    "Easy-to-use panels powered by Android OS, offering smooth performance, intuitive controls, and effortless app integration.",
                   image:androidonly
                },
                {
                  title: "OPS Included Series",
                  details:
                    "All-in-one interactive panels equipped with integrated OPS (PC module) for enhanced computing power and versatility — ready for plug-and-play performance.",
                  image:opsincluded
                },
                {
                  title: "Advanced AI",
                  details:
                    "Elevate your teaching experience with the industry's first AI-powered interactive display, designed to transform classrooms into dynamic learning environments."
                }
              ]
            },
            {
              name: "Cameras",
              items: [
                {
                  title: "PTZ",
                  details:
                    "Stay in focus effortlessly with smart AI tracking that follows the teacher’s movement, keeping lessons smooth and professional."
                },
                {
                  title: "Wide-Angle Coverage",
                  details:
                    "Capture the entire classroom with ultra-wide lenses, ensuring every student and detail is visible during live or recorded sessions."
                },
                {
                  title: "Plug-and-Play Simplicity",
                  details:
                    "Set up in seconds — no complicated installation. Just connect and start streaming or recording with ease."
                }
              ]
            },
            {
              name: "Accessories",
              items: [
                {
                  title: "Analog Ceiling Speaker",
                  details:
                    "Deliver clear, balanced audio throughout the classroom with high-quality analog ceiling speakers — designed for even sound distribution and easy installation."
                },
                {
                  title: "Zone Network Amplifier",
                  details:
                    "Control and power multiple audio zones with a reliable network amplifier — ensuring consistent sound performance across classrooms or halls."
                },
                {
                  title: "Ceiling Microphone",
                  details:
                    "Capture crystal-clear voice from any direction with discreet ceiling microphones — perfect for classrooms, lectures, and conference setups."
                }
              ]
            },
            {
              name: "E-Note",
              items: [
                {
                  title: "Etome",
                  details:
                    "A paper-like digital writing device designed for reading, note-taking, and sketching — offering eye comfort, long battery life, and smooth pen input."
                }
              ]
            },
            {
              name: "E-Board",
              items: [
                {
                  title: "Etome Ecoboard",
                  details:
                    "A sustainable digital board ideal for classrooms and offices, combining traditional writing with smart, eco-friendly methods."
                }
              ]
            }
          ]
        },
      
        {
          id: 2,
          name: "Auditorium & Seminar Hall ",
          image: auditorium,
          description: "End-to-end display and AV setups for impactful meetings and events.",
          sections: [
            {
              name: "Display",
              items: [
                {
                  title: "LED Wall",
                  details:
                    "Seamless large-format LED displays built for stunning visuals, ideal for auditoriums, events, and advertising spaces."
                }
              ]
            },
            {
              name: "AV Solutions",
              items: [
                {
                  title: "Integrated AV",
                  details:
                    "Complete audio-visual setups that bring together sound, video, and control systems for impactful communication and presentations."
                }
              ]
            },
            {
              name: "Accessories",
              items: [
                {
                  title: "Infrastructure",
                  details:
                    "Includes structured cabling, network systems, power management, and AV connectivity that form the backbone of a seamless conference room setup."
                },
                {
                  title: "Control & Automation",
                  details:
                    "Integrates lighting, audio, video, and room scheduling systems for effortless operation through touch panels or mobile control, enhancing meeting efficiency and user experience."
                }
              ]
            }
          ]
        },
      
        {
          id: 3,
          name: "Counselling Room ",
          image: Counselling,
          description: "Private, reliable setups for one-to-one and hybrid counselling sessions.",
          sections: [
            {
              name: "Camera",
              items: [
                {
                  title: "Vertical Noise Reduction",
                  details:
                    "Minimizes vertical streaks or banding in images, enhancing clarity and detail in low-light or high-contrast scenes."
                },
                {
                  title: "Digital Noise Reduction (DNR)",
                  details:
                    "Image processing algorithms reduce grainy visual noise for smoother, cleaner video output, especially in dark environments."
                }
              ]
            },
            {
              name: "Accessories",
              items: [
                {
                  title: "5A VDC SMPS",
                  details:
                    "A switched-mode power supply delivering a stable 5-amp DC output with high efficiency and low heat generation."
                },
                {
                  title: "STB Surveillance",
                  details:
                    "Set-top box–based surveillance system that integrates CCTV feeds for monitoring directly on a TV screen."
                }
              ]
            },
            {
              name: "Display",
              items: [
                {
                  title: "22-Inch Monitor",
                  details:
                    "A medium-sized display offering clear visuals and ample space for multitasking or surveillance monitoring."
                }
              ]
            }
          ]
        },
      
        {
          id: 4,
          name: "Control Room ",
          image: controlroom,
          description: "Mission-critical monitoring and control solutions for institutions and enterprises.",
          sections: [
            {
              name: "Software",
              items: [
                {
                  title: "Video Base License",
                  details:
                    "Serves as the core software module that enables video management and system integration within the control room."
                },
                {
                  title: "One Channel Video License",
                  details:
                    "Adds support for one additional video channel, allowing live viewing and recording from a single camera."
                },
                {
                  title: "Access Control Base (4-Door)",
                  details:
                    "Provides access control management capabilities for up to four doors, including monitoring and event logging."
                },
                {
                  title: "Visitor Module",
                  details:
                    "Software module for registering, tracking, and managing visitor access within the control room security system."
                },
                {
                  title: "IIP Speaker License",
                  details:
                    "Enables integration and control of IP-based (network) speakers for two-way audio communication and public announcements."
                }
              ]
            },
            {
              name: "Display",
              items: [
                {
                  title: "Digital Signage",
                  details:
                    "Dynamic display systems that deliver announcements, advertisements, and information with eye-catching visuals and easy content control."
                },
                {
                  title: "32” Monitor with Bracket",
                  details:
                    "High-resolution 32-inch display for clear video monitoring, supplied with a sturdy wall/desk mounting bracket for secure installation in the control room."
                }
              ]
            }
          ]
        }
      ]);



    return (
        <div className="educosystem-container">
            <Header />

            <main >

                <div>
                    <h1>Configure Your Perfect Solution</h1>
                    <p>Build your own ecosystem with ease. Select devices, software, and <br /> integrations that suit your institution or individual needs. Watch your configuration come to life with real-time updates on features and pricing.</p>

                </div>

                <div className="video-section">
                    <div  className="video-container">
                        <video 
                            className="educosystem-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            width="100%"
                            height="100%"
                        >
                            <source src="/src/assets/educosystem.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    
                    <div className="content-container">
                        <h2 className="content-title">Configure Your <br /> Solution, Simplified</h2>
                        <p style={{
                            textAlign:"left"
                        }} className="content-description">
                            A short walkthrough <br /> designed to help you  <br /> understand and set up each <br /> solutions quickly and <br /> efficiently.
                        </p>
                        <button className="try-button">Try it Now</button>
                    </div>
                </div>

                <div className="solutions-section">
                    <h2 className="solutions-title">Configure Your Solution</h2>
                    <div className="solutions-grid">
                        {solutions.map((solution) => (
                            <div key={solution.id} className="solution-card">
                                <div className="solution-image">
                                    <img 
                                        src={solution.image} 
                                        alt={solution.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="solution-header">
                                    <h3 className="solution-label">{solution.name}</h3>
                                    <button
                                        className="configure-button"
                                        onClick={() => handleConfigureClick(solution)}
                                    >
                                        Configure
                                    </button>
                                </div>
                                {/* <p className="solution-description">{solution.description}</p> */}
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default Educosystem;
