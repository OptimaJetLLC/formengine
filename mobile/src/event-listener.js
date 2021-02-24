class EventListener {

    constructor(builder, builderParent) {
        this.handlers = {
            'builder.create': () => builder.create(),
            'builder.download': () => builder.download(),
            'builder.getData': () => builder.getData(),
            'builder.loadData': (data) => builder.loadData(data.form),
            'builder.setBuilderMode': (data) => builder.setBuilderMode(data.checked),
            'builder.changeLang': (data) => builderParent.setCurrentLocalization(data),
        };
    }

    receiveMessage(event) {
        // todo move to config
        if (event.origin !== 'http://localhost:8091') {
            return;
        }
        if (!event || !event.data) {
            return;
        }

        const message = JSON.parse(event.data);
        if (!message || !message.command) {
            return;
        }
        const handler = this.handlers[message.command];
        if (!handler) {
            return;
        }
        const response = handler(message.data);
        const responseMessage = {
            originalUid: message.uid,
            command: message.command,
            response: response
        };
        window.parent.postMessage(responseMessage, message.url);
    }

}

export default function registerEventListener(builder, builderParent) {
    const listener = new EventListener(builder, builderParent);
    window.addEventListener('message', event => listener.receiveMessage(event), true);
}
