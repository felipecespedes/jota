/**
 * Jota JS
 * Hook: Templates
 *
 * Author: Felipe Céspedes
 * Feb 2020
 */

(function() {

  // TODO it should work across all node levels
  function replaceProps(element, clonedNode, props) {
    for (key in props) {
      const regex = new RegExp(`\\{\\s*?${key}\\s*?\\}`, 'gm');
      const value = props[key];
      element.innerText = clonedNode.innerText.replace(regex, value);
    }
  }

  function templates(context) {
    const { element, clonedNode, options } = context;
    const props = options.props || {};
    replaceProps(element, clonedNode, props);
  }

  Jota.prototype.addHook('afterInitialize', 'templates', templates);

})();
