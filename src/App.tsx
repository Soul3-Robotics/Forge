import { NavBar } from './components/NavBar';
import { SceneController } from './components/SceneController';

function App() {
  return (
    <div className="w-full min-h-screen font-sans bg-black">
      <NavBar />
      <SceneController />
    </div>
  );
}

export default App;
