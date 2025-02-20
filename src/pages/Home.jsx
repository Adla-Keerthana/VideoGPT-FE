import Navbar from "../components/Navbar";
import ChatInterface from "../components/ChatInterface";
import VideoUpload from "../components/VideoUpload";
import ModuleButtons from "../components/ModuleButtons";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ModuleButtons />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <VideoUpload />
        <ChatInterface />
      </div>
    </div>
  );
};

export default Home;
