// Generates a minimal but VALID GLB containing one triangle.
const fs = require("fs");

// Three vertices of a triangle: (0,0,0), (1,0,0), (0,1,0)
const positions = new Float32Array([
  0, 0, 0,
  1, 0, 0,
  0, 1, 0,
]);
const posBuf = Buffer.from(positions.buffer);
// Pad to 4-byte alignment
const pad = (4 - (posBuf.length % 4)) % 4;
const binChunk = pad ? Buffer.concat([posBuf, Buffer.alloc(pad)]) : posBuf;

const gltf = {
  asset: { version: "2.0" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0 }],
  meshes: [
    {
      primitives: [
        {
          attributes: { POSITION: 0 },
          mode: 4,
        },
      ],
    },
  ],
  accessors: [
    {
      bufferView: 0,
      componentType: 5126,
      count: 3,
      type: "VEC3",
      min: [0, 0, 0],
      max: [1, 1, 0],
    },
  ],
  bufferViews: [
    {
      buffer: 0,
      byteOffset: 0,
      byteLength: posBuf.length,
      target: 34962,
    },
  ],
  buffers: [{ byteLength: binChunk.length }],
};

const jsonStr = JSON.stringify(gltf);
let jsonBuf = Buffer.from(jsonStr, "utf8");
// Pad JSON chunk with spaces to 4-byte alignment
const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
if (jsonPad) {
  jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(jsonPad, 0x20)]);
}

const jsonChunkHeader = Buffer.alloc(8);
jsonChunkHeader.writeUInt32LE(jsonBuf.length, 0);
jsonChunkHeader.write("JSON", 4, "ascii");

const binChunkHeader = Buffer.alloc(8);
binChunkHeader.writeUInt32LE(binChunk.length, 0);
binChunkHeader.writeUInt32LE(0x004e4942, 4); // 'BIN\0'

const totalLen =
  12 + jsonChunkHeader.length + jsonBuf.length +
  binChunkHeader.length + binChunk.length;

const header = Buffer.alloc(12);
header.write("glTF", 0, "ascii");
header.writeUInt32LE(2, 4);
header.writeUInt32LE(totalLen, 8);

const glb = Buffer.concat([
  header,
  jsonChunkHeader,
  jsonBuf,
  binChunkHeader,
  binChunk,
]);

module.exports = glb;

if (require.main === module) {
  const target = process.argv[2];
  if (target) {
    fs.writeFileSync(target, glb);
    console.log(`Wrote valid GLB (${glb.length} bytes) to ${target}`);
  }
}
