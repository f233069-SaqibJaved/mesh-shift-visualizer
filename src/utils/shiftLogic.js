export function calculateShift(p, q) {
    const Math_sqrt = Math.sqrt(p);

    // Calculate the shift amounts based on your assignment's formulas
    const rowShift = q % Math_sqrt;
    const colShift = Math.floor(q / Math_sqrt);

    // Calculate steps for the Complexity Panel (Part B of rubric)
    const ringSteps = Math.min(q, p - q);
    const meshSteps = rowShift + colShift;

    // Calculate the exact path for every single node in the grid
    const nodes = [];
    for (let i = 0; i < p; i++) {
        const startRow = Math.floor(i / Math_sqrt);
        const startCol = i % Math_sqrt;

        // After Stage 1 (Row Shift)
        const midCol = (startCol + rowShift) % Math_sqrt;
        const midIndex = (startRow * Math_sqrt) + midCol;

        // After Stage 2 (Column Shift)
        const finalRow = (startRow + colShift) % Math_sqrt;
        const finalIndex = (finalRow * Math_sqrt) + midCol;

        nodes.push({
            id: i,
            startCoords: { r: startRow, c: startCol },
            midCoords: { r: startRow, c: midCol },
            finalCoords: { r: finalRow, c: midCol },
            midIndex: midIndex,
            finalIndex: finalIndex,
            data: `D${i}` // This is the data that moves
        });
    }

    return { rowShift, colShift, ringSteps, meshSteps, nodes, sqrtP: Math_sqrt };
}