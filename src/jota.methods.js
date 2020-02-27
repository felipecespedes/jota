/**
 * Jota JS
 * Hook: Methods
 *
 * Author: Felipe Céspedes
 * Feb 2020
 */

(function() {

  let jotaContext;

  function updateProps(newProps) {
    jotaContext.options.props = { ...jotaContext.options.props, ...newProps };
    Jota.prototype.callHook('afterInitialize', 'templates', jotaContext);
  }

  function methods(context) {
    jotaContext = context;
    const { options } = context;
    const props = options.props || {};
    const mounted = options.mounted;

    if (mounted) { // TODO validate mounted is a function
      mounted(props, updateProps);
    }
  }

  Jota.prototype.addHook('afterInitialize', 'methods', methods);

})();
