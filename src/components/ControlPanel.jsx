import { Settings, Play, RotateCcw } from 'lucide-react';

export default function ControlPanel({ p, setP, q, setQ, animationStep, onNext, onReset }) {
    // Handle user typing in the 'p' input
    const handlePChange = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val > 0) setP(val);
    };

    // Handle user typing in the 'q' input
    const handleQChange = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 0) setQ(val);
    };

    // Human-readable labels for what step the animation is on
    const stepLabels = ["Initial State", "Stage 1: Row Shift", "Stage 2: Column Shift"];

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            {/* Panel Header */}
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <Settings className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-slate-800">Algorithm Controls</h2>
            </div>

            <div className="space-y-5">
                {/* Input for P */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Total Nodes (p) - Should be a perfect square (e.g., 16, 25)
                    </label>
                    <input
                        type="number"
                        value={p}
                        onChange={handlePChange}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Input for Q */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Shift Amount (q)
                    </label>
                    <input
                        type="number"
                        value={q}
                        onChange={handleQChange}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Animation Controls */}
                <div className="pt-4 border-t border-slate-100">
                    <div className="mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Stage</span>
                        <div className="text-lg font-bold text-blue-900">{stepLabels[animationStep]}</div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onNext}
                            disabled={animationStep >= 2}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium flex justify-center items-center gap-2 transition-colors"
                        >
                            <Play size={18} /> Next Step
                        </button>
                        <button
                            onClick={onReset}
                            className="flex-none bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium flex justify-center items-center gap-2 transition-colors"
                        >
                            <RotateCcw size={18} /> Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}