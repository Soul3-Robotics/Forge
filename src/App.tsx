import { NavBar } from './components/NavBar';
import { SideNav } from './components/SideNav';
import { SceneController } from './components/SceneController';

function App() {
  return (
    <div className="w-full min-h-screen font-sans bg-black">
      <NavBar />
      <SideNav />
      <SceneController />
    </div>
  );
}

export default App;
