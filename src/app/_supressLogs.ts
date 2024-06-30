// TODO - delete when https://github.com/radix-ui/primitives/pull/2811 gets merged 
const prevConsoleError = console.error;
const prevConsoleWarn = console.warn;

console.error = (...args) => {
  if (args[0].includes("Warning: Accessing element.ref")) {
    return;
  }

  prevConsoleError(...args);
};

console.warn = (...args) => {
  if (args[0].includes("Warning: Accessing element.ref")) {
    return;
  }

  prevConsoleWarn(...args);
};