interface FormLoader {
    getFormFunc: (code: string) => object;
}

export default function loadForm(loader: FormLoader, code?: string): object | ((code: string) => object) {
    if (!code) {
        return loader.getFormFunc;
    }

    const formData = loader.getFormFunc(code);
    return JSON.parse(JSON.stringify(formData));
}
