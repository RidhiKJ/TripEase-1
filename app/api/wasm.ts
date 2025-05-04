// pages/api/wasm.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch the WebAssembly binary from the public folder (adjust URL as needed)
    const wasmBuffer = await fetch('http://localhost:3000/square.wasm');
    const wasmBinary = await wasmBuffer.arrayBuffer();

    // Instantiate the WebAssembly binary
    const { instance } = await WebAssembly.instantiate(wasmBinary);

    // Call the exported function from the WASM module
    const answer = instance.exports.square(9); // Call the function you want

    // Return the result as a JSON response
    res.status(200).json({ result: answer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load or execute WebAssembly' });
  }
}
