import Footer from "../components/footer";
import Navbar from "../components/navbar";

const NotFoundPage = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <section className='flex flex-col items-center justify-center bg-custom z-10 flex-1'>
        <div className="p-4 bg-white shadow rounded-lg text-3xl">
            <span className="text-red-400">Error 404:</span> 
            <span>Page not found!</span>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
