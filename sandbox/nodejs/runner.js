const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { performance } = require('perf_hooks');
const process = require('process');

const codeFileName = process.argv[2] || 'game.js';

const inputFilePath = path.join('/sandbox/input', codeFileName);
const outputFilePath = path.join('/sandbox/output', 'result.json');

// Read the code file

let code;
function readCodeFile() {
  try {
    code = fs.readFileSync(inputFilePath, 'utf8');
  } catch (e) {
    3;
    console.error(`Error reading file: ${inputFilePath}`, e);
    process.exit(1);
  }
}
readCodeFile();

// Prepare the execution result

const result = {
  stdout: [],
  stderr: [],
  executionTime: 0,
  memoryUsage: 0,
  success: false,
  error: null,
};

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
  result.stdout.push(args.map((arg) => String(arg).join(' ')));
  originalConsoleLog(...args);
};

console.error = (...args) => {
  result.stderr.push(args.map((arg) => String(arg).join(' ')));
  originalConsoleError(...args);
};
// Execute the code in a sandboxed environment
const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  process: {
    env: {},
    hrtime: process.hrtime,
  },
  Buffer,
  require: (module) => {
    const allowedModules = [
      'util',
      'events',
      'crypto',
      'path',
      'url',
      'querystring',
      'string_decoder',
    ];
    if (allowedModules.includes(module)) {
      return require(module);
    }
    throw new Error(`Module ${module} is not allowed in the sandbox`);
  },
};

// Execute the code
function executeCode() {
  const startTime = performance.now();
  try {
    const script = new vm.Script(code, { timeout: 5000 });
    const context = vm.createContext(sandbox);
    script.runInContext(context, { timeout: 5000 });
    result.success = true;
  } catch (err) {
    result = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
  } finally {
    result.executionTime = performance.now() - startTime;
    result.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB

    fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2));
  }
}
executeCode();
