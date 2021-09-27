/**
 * Components registry
 */
export default class ComponentRegistry<T> {

    private _items: Array<T> = new Array<T>();

    registerItems(components: T[]) {
        components.forEach(value => this._items.push(value));
    }

    getItems(): Array<T> {
        return this._items;
    }
}
