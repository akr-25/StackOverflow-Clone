import Footer from "../components/footer";
import Navbar from "../components/navbar";
import TypeIt from "typeit-react";
import SocialButtonsContainer from "react-social-media-buttons"

const AboutMePage = () => {
  let img_url =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/All_In_A_Spin_Star_trail.jpg/1280px-All_In_A_Spin_Star_trail.jpg";

  img_url =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Circumpolar_Star_Trails_With_High_Flyer.jpg/1280px-Circumpolar_Star_Trails_With_High_Flyer.jpg";

  img_url =
    "https://upload.wikimedia.org/wikipedia/commons/9/9e/The_constellation_of_Cassiopeia_over_a_thunderstorm.jpg";

  let img_url_2 =
    "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHBlbmNpbHxlbnwwfHwwfHw%3D&w=1000&q=80";

  let img_url_3 =
    "https://www.trainingjournal.com/sites/www.trainingjournal.com/files/styles/original_-_local_copy/entityshare/31992%3Fitok%3D-s0AjeAO";

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <section className='flex flex-col items-center justify-center bg-custom z-10 flex-1'>
        <div className='font-mono'>
          <div
            style={{
              backgroundImage: `url(${img_url})`,
              backgroundSize: "cover",
              opacity: 0.9,
            }}
            className='h-screen flex flex-col '
          >
            <section className='flex-1 flex flex-col justify-center'>
              <div className='text-center text-6xl text-white mb-10'>
                <p></p>
                <p>hi there,</p>
              </div>
              <div className='text-center text-6xl text-white mb-4'>
                <p></p>
                <p>i,m</p>
              </div>
              <div
                className='text-6xl text-white italic mb-4 text-center'
                style={{ letterSpacing: "15px" }}
              >
                <TypeIt
                  options={{
                    speed: 200,
                    waitUntilVisible: true,
                    loop: false,
                  }}
                  getBeforeInit={(instance) => {
                    instance.type("aman").pause(1050);
                    // .delete(10)
                    // .type("a comder")
                    // .pause(750)
                    // .delete(10)
                    // .type("a comedian and a liar!")
                    // .pause(750);
                    // Remember to return it!
                    return instance;
                  }}
                />
              </div>
            </section>
          </div>
          {/*  style={{ backgroundColor: "#8179AA" }} */}
          <div
            className='md:h-screen z-10'
            style={{
              backgroundImage: `url("./pencil.jfif")`,
              backgroundSize: "cover",
              opacity: 1,
              zIndex: -1,
            }}
          >
            <div className='flex flex-col lg:flex-row md:mx-32 mx-4 py-20 '>
              <div className='flex text-2xl flex-col items-center justify-center md:mr-10'>
                <img src='.\pic.jpg' className='h-64 md:h-96 drop-shadow-2xl'></img>
                <span
                  // href='https://www.linkedin.com/in/akr25/'
                  className=' border-2 border-black mt-20 p-2 border-dashed hover:text-yellow-400 hover:bg-black transition-all duration-700 cursor-pointer'
                >
                  about me
                </span>
              </div>
              <div className='text-black text-xl flex flex-col justify-center items-center ml-10 '>
                <div className=''>
                  {/* bg-gray-100 bg-opacity-20 p-1 */}
                  <p>
                    i'm a <span className='line-through'>sopho</span> more at
                    indian institue of technology, guwahati
                  </p>
                  <p>
                    i'll be graduating in 2024 with b.tech in mathematics and
                    computing
                  </p>
                  <p>i don't know to type capital letters</p>
                  <p>
                    blah blah blah blah blah blah blah blah blah blah blah blah
                    blah{" "}
                  </p>
                  <p className='mb-20'>
                    blah blah blah blah blah blah blah blah blah blah blah blah
                    blah{" "}
                  </p>
                  <div className="flex items-center md:block">
                    <p className="mb-2"> Connect with me </p>
                    <SocialButtonsContainer
                      links={[
                        "https://www.github.com/akr-25",
                        "https://www.linkedin.com/in/akr25",
                        "https://www.instagram.com/amankr652/",
                      ]}
                      buttonStyle={{
                        width: "62px",
                        height: "62px",
                        margin: "0px 50px",
                        backgroundColor: "#ECB909",
                        border: "2px solid #000000",
                      }}
                      iconStyle={{ color: "#000000" }}
                      openNewTab={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className='h-screen z-10'
            style={{
              backgroundImage: `url(${img_url_3})`,
              backgroundSize: "cover",
              opacity: 1,
              zIndex: -1,
            }}
          >
            <div className='flex mx-32 py-20 '>
              <div className='w-1/2'></div>
              <div className=''>
                <div>
                  <div className='text-2xl w-44 mr-10 border-2 border-black p-2 border-dashed hover:text-blue-200 hover:bg-black transition-all duration-700 cursor-pointer mb-8'>
                    tech stacks
                  </div>
                  <div className='grid grid-cols-3 grid-rows-2 gap-12'>
                    <div>
                      <img src='./mongodb.png' className='w-24'></img>mongo db
                    </div>
                    <div>
                      <img src='./react.png' className='w-24 rounded-lg'></img>
                      react
                    </div>
                    <div>
                      <img src='./nodejs.jpg' className='w-24'></img>
                      node+express
                    </div>
                    <div>
                      <img src='./figma.png' className='w-24'></img>figma
                    </div>
                    <div>
                      <img src='./python.png' className='w-24'></img>python
                    </div>
                    <div>
                      <img src='./cpp.png' className='w-24'></img>c++
                    </div>
                  </div>
                </div>
                <div className='flex mt-10'>
                  <div className='text-2xl w-24 mr-20 border-2 border-black p-2 border-dashed hover:text-blue-200 hover:bg-black transition-all duration-700 cursor-pointer mb-8'>
                    description
                  </div>
                  <p>
                    out of the box thinker; i am also little familiar with
                    machine learning, unity, flutter, firebase... the list goes
                    on and on , are sab try kiya hai tere bhai ne
                  </p>
                </div>
              </div>
            </div>
           </div> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutMePage;