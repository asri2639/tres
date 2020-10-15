const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /[\w]+\.ts$/
);

const apis = [];
// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  if (fileName.search(/\.\/(?:(index|API|APIEnum))\.ts$/g)) {
    apis.push(fileName.match(/\.\/(\w+)\.ts$/)[1]);
  }
});

export default apis.reduce((acc, curr) => {
  acc[curr] = curr + '';
  return acc;
}, {});
