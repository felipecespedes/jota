/**
 * Jota JS
 * Hook: Templates
 *
 * Author: Felipe Céspedes
 * Feb 2020
 */

(function() {

  // TODO it should work across all node levels
  function replaceProps(element, initialElement, props) {
    for (key in props) {
      const regex = new RegExp(`\\{\\s*?${key}\\s*?\\}`, 'gm');
      const value = props[key];
      element.innerText = initialElement.innerText.replace(regex, value);
    }
  }

  function templates(context) {
    const { element, options } = context;
    let initialElement = context.initialElement;
    const props = options.props || {};
    if (!initialElement) {
      initialElement = element.cloneNode(true);
      Jota.prototype.initialElement = initialElement;
    }
    replaceProps(element, initialElement, props);
  }

  Jota.prototype.addHook('afterInitialize', 'templates', templates);

})();
