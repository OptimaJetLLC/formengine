# Form Builder

## Getting Started

Install dependencies:

```shell
npm install
```

Start the app for developing:

```shell
npm run dev:builder
```

## Other commands

To build all projects:

```shell
npm run build
```

Run tests
```shell
npm run test
```

For scoping (run command only for difenetly package) use --scope=[app]. For example:

```shell
npm run test --scope=app
```

To visual packages:

```shell
npm run graph
```

For installing packages can be used usual way:

```shell
npm i module-1 -w module-2
```

or lerna with

```shell
npx lerna add module-1 --scope=module-2
```

Create links of packages (unused):

```shell
npm run bootstrap
```

Для публикации обновления версий, создания тега и публикация существует команда `npx lerna publish`. Но ее пока не настраивал

## Что должно быть в итоге:

1. FormBuilder в отдельном npm пакете
2. Отдельный пакет npm, содержащий визуальные компоненты
3. Компоненты описываются декларативно
4. FormBuilder не меняется при добавлении новых визуальных компонент
5. Добавление новых визуальных компонент заключается в подключении библиотеки из npm и её регистрации

## Features

- [x] Drag&Drop.
- [x] Events.
- [ ] Templates.
- [x] Json file format.
- [x] Inline parameters.


RTL guide - https://carbon-for-ibm-dotcom.mybluemix.net/guidelines/right-to-left/
