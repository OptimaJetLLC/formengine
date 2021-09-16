import ComponentRegistry from './component-registry';

const registry = new ComponentRegistry();
const registerItems = registry.registerItems.bind(registry);
const getItems = registry.getItems.bind(registry);

export { registerItems, getItems };
