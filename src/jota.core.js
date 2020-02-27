/**
 * Jota JS
 * Core
 *
 * Author: Felipe Céspedes
 * Feb 2020
 */

function Jota(options) {

  const initialize = () => {
    this.options = options || {};
    this.element = document.querySelector(this.options.el);
  }

  const afterInitialize = () => {
    this.hooks.afterInitialize.forEach(({ name, handler }) => {
      console.log(`running after initialize: ${ name }`);
      handler(this);
    });
  }

  initialize();
  afterInitialize();
}

Jota.prototype.hooks = {
  afterInitialize: []
};

Jota.prototype.addHook = function(type, name, handler) {
  if (type === 'afterInitialize') {
    Jota.prototype.hooks.afterInitialize.push({ type, name, handler });
  }
}

Jota.prototype.callHook = function(type, name, context) {
  const hookTypes = Jota.prototype.hooks[type];
  for (let i = 0; i < hookTypes.length; i++) {
    iHook = hookTypes[i];
    if (iHook.name === name) {
      iHook.handler(context);
      break;
    }
  }
}
