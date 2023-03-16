# Аннотации

Декларативная система описания компонентов. Использует идею TypeProps, Yup, MobxStateTree

## Используемые библиотеки

## Функционал

* Предоставляет возможность легко описать просто любой пропс в реакт компоненте
* Геттеры

## Требования

* Совместимость с TypeProps, чтобы можно было их соотносить при наличии в компоненте, чтобы не прописывать каждый пропс.
* Использовать yup для валидации вводимых значений на базовом уровне в редакторе
* Реализовать удобный, понятный и неперегруженный, изящный api

## Нужно сделать

* Расширяемую, легко поддерживаемую и хорошо масштабирующую систему построения аннотаций
* Архитектурные требования
* Архитектурная реализация
* Реализовать
* Вычисляемое значение
* Запихнуть в объект пропсы

## Архитектура

## API

## Примеры

```javascript
export const myComponent = define(MyComponent)
  .props({
    disabled: boolean,
    label: string.required.default("Input"),
    child: node,
    count: number.required,
    placeholder: string,
    size: oneOf('xs', 'sm', 'md', 'lg').labeled("Extra small", "Small", "Medium", "Large"),
    direction: oneOf("vertical", "horizontal").default("horizontal").radio,
    onChange: event.setTo("value"),
    tabs: arrayOf(rsNavItem, rsNavMenu),
    onClick: event,
    onFocus: event.default(() => console.log("I'm focused!")).sealed,
    oBlur: event.default((props) => props[count]++),
  })
```
