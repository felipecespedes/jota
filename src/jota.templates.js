/**
 * Jota JS
 * Hook: Templates
 *
 * Author: Felipe Céspedes
 * Feb 2020
 */

(function() {

  function isTextNode(node) {
    return node.nodeType === 3;
  }

  function getAllChildren(element) {
    // TODO review
    // It works but...
    return element.getElementsByTagName('*');
  }

  function extractText(node) {
    return node.textContent;
  }

  function replacePropsFor(element, props, key) {
    [].forEach.call(element.childNodes, function(node) {
      if (isTextNode(node)) {
        const regex = new RegExp(`\\{\\{\\s*?${key}\\s*?\\}\\}`, 'gm');
        const value = props[key];
        const nodeText = extractText(node);
        const newTextContent = nodeText.replace(regex, value);
        node.textContent = newTextContent;
      }
    });
  }

  function replaceProps(element, initialElement, props) {
    const newElement = initialElement.cloneNode(true);
    const children = getAllChildren(newElement);
    for (key in props) {
      replacePropsFor(newElement, props, key);
      [].forEach.call(children, function(node) {
        replacePropsFor(node, props, key)
      });
    }
    // TODO find a better way to replace content since this is not the best way to do it
    element.innerHTML = newElement.innerHTML;
  }

  function templates(context) {
    const { element, options } = context;
    const props = options.props || {};
    let initialElement = context.initialElement;
    if (!initialElement) {
      initialElement = element.cloneNode(true);
      context.initialElement = initialElement;
    }
    replaceProps(element, initialElement, props);
  }

  Jota.prototype.addHook('afterInitialize', 'templates', templates);

})();
