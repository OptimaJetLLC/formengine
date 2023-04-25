## Используемые библиотеки:

* [**@emotion/styled**](https://emotion.sh/docs/styled) - распознавание стилей из текста, добавление стилей к компоненту

## Функционал

- [ ] Список свойств с понятными без CSS названиями (ширина, высота, отступ и др.)
- [x] Редактируемый список CSS стилей
- [ ] Поле ввода СlassName
- [ ] CSS block - поле ввода, чтобы вводить свой блок текста с CSS, с указанием псевдоклассов, childrens и прочее

## API

* StyleEditor
* use

## Examples

Добавилась аннотация `stylization`. Она не противоречит пропу `className` и позволяет настраивать:

* Default значения стандартных стилей (что на вкладке Style)
* Инлайновые стили
* Стили что, что с помощью emotion превращаются в css стили

```typescript jsx
export const button = define(Button)
  .props({
    className: string.default('Red Button'),
    style: stylization
      .css({
        margin: 20,
      })
      .css({
        padding: 20,
      })
      .css(`
        color: yellow;
      `)
      .css(`
        color: black;
      `)
      .inline({
        padding: 23,
      })
      .default({
        cssObject: {
          height: '200'
        },
        cssString: 'background-color: yellow;',
        additional: [{name: 'background-color', value: 'black'}]
      })
  })
```
