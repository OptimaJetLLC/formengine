/**
 * Components registry
 */
class ItemRegistry {
    items = [];

    registerItems(components) {
        registry.items = components;
    }

    getItems() {
        return registry.items;
    }
}

const registry = new ItemRegistry();
const registerItems = registry.registerItems;
const getItems = registry.getItems;

export { registerItems, getItems };
