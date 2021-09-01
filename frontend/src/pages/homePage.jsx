import Footer from "../components/footer";
import Navbar from "../components/navbar";

const HomePage = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <section className='flex items-center justify-center bg-custom z-10 flex-1'>
        <div className='w-1/2 h-full m-0 p-0'>
          <img
            className='h-full'
            src='https://opt.toiimg.com/recuperator/img/toi/m-70871992/70871992.jpg?resizemode=1&width=90&height=66'
            alt='IITG Scenery'
          />
        </div>
        <div className='bg-red-400 text-white w-2/5 h-3/5 rounded-l-none rounded-3xl text-lg flex flex-col justify-around p-8'>
          <div className="flex justify-around">
            <img src='\img\1200px-IIT_Guwahati_Logo.png' width="140px" alt='' />
            <p className='font-bold text-2xl text-right'>
              Welcome to IITG Stack Overflow
            </p>
          </div>
          <div>
            <p>
              This application is built using MongoDB, Express, React and
              Node.Js Stack.
            </p>
            <p>You can post your queries related to tech and other stuff</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
