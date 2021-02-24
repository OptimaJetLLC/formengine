/**
 * Renderers registry
 */
class ComponentRendererRegistry {

    map = {};

    register(name, renderer) {
        if (registry.map[name]) {
            throw new Error('Component ' + name + ' already registered!');
        }
        registry.map[name] = renderer;
    }

    draw(name, options) {
        let fn = registry.map[name];
        if (!fn) {
            fn = registry.map['null-control'];
            const nullOpts = {
                'data-buildertype': name,
                text: `${name} is unsupported`
            };
            return fn(nullOpts);
        }
        return fn(options);
    }

}

const registry = new ComponentRendererRegistry();
const register = registry.register;
const draw = registry.draw;

export { register, draw };
