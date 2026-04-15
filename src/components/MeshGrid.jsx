export default function MeshGrid({ shiftData, animationStep }) {
    const { nodes, sqrtP } = shiftData;

    return (
        <div className="w-full flex flex-col items-center">

            {/* The main grid container */}
            <div
                className="relative bg-slate-50 border-2 border-slate-200 rounded-lg shadow-inner overflow-hidden"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    aspectRatio: '1 / 1' // Keeps it perfectly square
                }}
            >

                {/* 1. Draw the empty background grid cells */}
                <div
                    className="absolute inset-0 grid"
                    style={{
                        gridTemplateColumns: `repeat(${sqrtP}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${sqrtP}, minmax(0, 1fr))`
                    }}
                >
                    {Array.from({ length: sqrtP * sqrtP }).map((_, i) => (
                        <div key={i} className="border border-slate-200" />
                    ))}
                </div>

                {/* 2. Draw the moving data blocks */}
                {nodes.map((node) => {
                    // Determine where this block should be based on the current step
                    let currentCoords = node.startCoords;
                    if (animationStep === 1) currentCoords = node.midCoords;
                    if (animationStep === 2) currentCoords = node.finalCoords;

                    // Calculate CSS percentages so it fits perfectly no matter the screen size
                    const topPercent = (currentCoords.r / sqrtP) * 100;
                    const leftPercent = (currentCoords.c / sqrtP) * 100;
                    const sizePercent = 100 / sqrtP;

                    return (
                        <div
                            key={node.id}
                            className="absolute flex items-center justify-center transition-all duration-700 ease-in-out p-1 sm:p-2"
                            style={{
                                top: `${topPercent}%`,
                                left: `${leftPercent}%`,
                                width: `${sizePercent}%`,
                                height: `${sizePercent}%`,
                            }}
                        >
                            <div className="w-full h-full bg-blue-500 rounded-md shadow-md flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                                {node.data}
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="mt-6 text-sm text-slate-500 font-medium bg-slate-100 py-1 px-3 rounded-full">
                Grid Layout: {sqrtP} × {sqrtP} Matrix
            </p>
        </div>
    );
}