import Navbar from "../components/generics/Header";
import Footer from "../components/Footer";
import RoomsList from "../components/RoomsList";
const WelcomeAIAssisstant = () => {
  
  return (
    <div className="bg-gray-100 h-[140vh] md:h-screen w-full">
      <Navbar />
       <div className="m-5 bg-white p-6 rounded-lg shadow-lg h-[95%] md:h-[90%] grid grid-cols-1 md:grid-cols-4 gap-2">
        <RoomsList />
        <div className='text-center  flex flex-col justify-center items-center bg-gray-200 col-span-3  h-[650px] md:h-auto'>
          <h1 className="text-3xl font-bold mb-4">Welcome to AI Assistant</h1>
          <p className="text-gray-700">Your personal AI assistant. Ask questions and get answers.</p>
          <p>to start chat with AI Assistant click create new chat button</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default WelcomeAIAssisstant