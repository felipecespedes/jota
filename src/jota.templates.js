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

  function replacePropsFor(element, initialNode, props) {
    [].forEach.call(initialNode.childNodes, function(node, index) {
      if (isTextNode(node)) {
        let line = extractText(node);
        for (key in props) {
          const value = props[key];
          const regex = new RegExp(`\\{\\{\\s*?${key}\\s*?\\}\\}`, 'gm');
          line = line.replace(regex, value);
        }
        // Validates if the text content has changed and replace it
        if (element.childNodes[index].textContent !== line) {
          element.childNodes[index].textContent = line;
        }
      }
    });
  }

  function replaceProps(element, initialElement, props) {
    const initialElementchildren = getAllChildren(initialElement);
    const elementChildren = getAllChildren(element);
    replacePropsFor(element, initialElement, props);
    [].forEach.call(elementChildren, function(node, index) {
      replacePropsFor(node, initialElementchildren[index], props)
    });
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
