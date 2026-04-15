import { useState, useMemo } from 'react';
import ControlPanel from './components/ControlPanel';
import MeshGrid from './components/MeshGrid';
import ComplexityPanel from './components/ComplexityPanel';
import { calculateShift } from './utils/shiftLogic';

function App() {
  // State variables to remember the user's choices and current animation step
  const [p, setP] = useState(16);
  const [q, setQ] = useState(5);
  const [animationStep, setAnimationStep] = useState(0); // 0: Initial, 1: Stage 1, 2: Stage 2

  // Only recalculate the math when 'p' or 'q' changes
  const shiftData = useMemo(() => {
    try {
      return calculateShift(p, q);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [p, q]);

  // Button handlers
  const handleNextStep = () => {
    if (animationStep < 2) setAnimationStep(prev => prev + 1);
  };

  const handleReset = () => {
    setAnimationStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900">Mesh Circular Shift Visualizer</h1>
          <p className="text-slate-600 mt-2 text-lg">Visualizing a 2D mesh 2-stage routing algorithm</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Controls & Math Analysis */}
          <div className="space-y-6">
            <ControlPanel
              p={p} setP={setP}
              q={q} setQ={setQ}
              animationStep={animationStep}
              onNext={handleNextStep}
              onReset={handleReset}
            />
            {shiftData && (
              <ComplexityPanel shiftData={shiftData} p={p} q={q} />
            )}
          </div>

          {/* Right Side: The Grid Visualization */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[500px]">
            {shiftData ? (
              <MeshGrid shiftData={shiftData} animationStep={animationStep} />
            ) : (
              <p className="text-red-500">Invalid parameters for grid generation.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;