var DomParser = require('dom-parser');

const support = () => {
  if (!window.DOMParser) return false;
  var parser = new DOMParser();
  try {
    parser.parseFromString('x', 'text/html');
  } catch (err) {
    return false;
  }
  return true;
};

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
const stringToHTML = function (str) {
  var parser =
    typeof window === 'undefined'
      ? new DomParser()
      : support
      ? new DOMParser()
      : null;
  if (parser) {
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  }

  // Otherwise, fallback to old-school method
  var dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;
};

export default stringToHTML;
