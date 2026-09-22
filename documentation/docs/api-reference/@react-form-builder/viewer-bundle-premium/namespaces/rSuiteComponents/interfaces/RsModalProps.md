# Interface: RsModalProps

Props for the RsModal component.

## Extends

- `ModalProps`

## Properties

### animation?

> `optional` **animation?**: `ElementType`\<`any`, keyof IntrinsicElements\>

Set an animation effect for Modal, the default is Bounce.

#### Inherited from

`ModalProps.animation`

***

### animationProps?

> `optional` **animationProps?**: `any`

Animation-related properties

#### Inherited from

`ModalProps.animationProps`

***

### animationTimeout?

> `optional` **animationTimeout?**: `number`

Set the duration of the animation

#### Inherited from

`ModalProps.animationTimeout`

***

### aria-describedby?

> `optional` **aria-describedby?**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-describedby`](RsImageProps.md#aria-describedby)

***

### aria-labelledby?

> `optional` **aria-labelledby?**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`aria-labelledby`](RsImageProps.md#aria-labelledby)

***

### as?

> `optional` **as?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element for this component

#### Inherited from

`ModalProps.as`

***

### autoFocus?

> `optional` **autoFocus?**: `boolean`

When set to true, the Modal is opened and is automatically focused on its own,
accessible to screen readers

#### Inherited from

`ModalProps.autoFocus`

***

### backdrop?

> `optional` **backdrop?**: `boolean` \| `"static"`

When set to true, the Modal will display the background when it is opened.
Clicking on the background will close the Modal. If you do not want to close the Modal,
set it to 'static'.

#### Inherited from

`ModalProps.backdrop`

***

### backdropClassName?

> `optional` **backdropClassName?**: `string`

Add an optional extra class name to .modal-backdrop
It could end up looking like class="modal-backdrop foo-modal-backdrop in"

#### Inherited from

`ModalProps.backdropClassName`

***

### backdropStyle?

> `optional` **backdropStyle?**: `CSSProperties`

CSS style applied to backdrop DOM nodes

#### Inherited from

`ModalProps.backdropStyle`

***

### backdropTransitionTimeout?

> `optional` **backdropTransitionTimeout?**: `number`

#### Inherited from

`ModalProps.backdropTransitionTimeout`

***

### children?

> `optional` **children?**: `ReactNode`

Primary content

#### Inherited from

`ModalProps.children`

***

### className?

> `optional` **className?**: `string`

Additional classes

#### Inherited from

`ModalProps.className`

***

### classPrefix?

> `optional` **classPrefix?**: `string`

The prefix of the component CSS class

#### Inherited from

`ModalProps.classPrefix`

***

### closeButton?

> `optional` **closeButton?**: `ReactNode`

Custom close button, used when rendered as a Drawer

#### Inherited from

`ModalProps.closeButton`

***

### container?

> `optional` **container?**: (() => `HTMLElement`) \| `HTMLElement`

#### Inherited from

`ModalProps.container`

***

### containerClassName?

> `optional` **containerClassName?**: `string`

#### Inherited from

`ModalProps.containerClassName`

***

### dialogAs?

> `optional` **dialogAs?**: `ElementType`\<`any`, keyof IntrinsicElements\>

You can use a custom element type for Dialog

#### Inherited from

`ModalProps.dialogAs`

***

### dialogClassName?

> `optional` **dialogClassName?**: `string`

CSS class applied to Dialog DOM nodes

#### Inherited from

`ModalProps.dialogClassName`

***

### dialogStyle?

> `optional` **dialogStyle?**: `CSSProperties`

CSS style applied to dialog DOM nodes

#### Inherited from

`ModalProps.dialogStyle`

***

### dialogTransitionTimeout?

> `optional` **dialogTransitionTimeout?**: `number`

#### Inherited from

`ModalProps.dialogTransitionTimeout`

***

### enforceFocus?

> `optional` **enforceFocus?**: `boolean`

When set to true, Modal will prevent the focus from leaving when opened,
making it easier for the secondary screen reader to access

#### Inherited from

`ModalProps.enforceFocus`

***

### ~~full?~~

> `optional` **full?**: `boolean`

Full screen

#### Deprecated

Use size="full" instead.

#### Inherited from

`ModalProps.full`

***

### handleClose?

> `optional` **handleClose?**: () => `void`

Custom close handler function.

#### Returns

`void`

***

### id?

> `optional` **id?**: `string`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`id`](RsImageProps.md#id)

***

### isDrawer?

> `optional` **isDrawer?**: `boolean`

Indicates if the component should be displayed as a drawer

#### Inherited from

`ModalProps.isDrawer`

***

### keyboard?

> `optional` **keyboard?**: `boolean`

Close Modal when esc key is pressed

#### Inherited from

`ModalProps.keyboard`

***

### onBackdropClick?

> `optional` **onBackdropClick?**: `MouseEventHandler`\<`Element`\>

#### Inherited from

`ModalProps.onBackdropClick`

***

### onClose?

> `optional` **onClose?**: (`event`) => `void`

Called when Modal is closed

#### Parameters

##### event

`SyntheticEvent`

#### Returns

`void`

#### Inherited from

`ModalProps.onClose`

***

### onEnter?

> `optional` **onEnter?**: (`node`) => `void`

Callback fired before the Modal transitions in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`ModalProps.onEnter`

***

### onEntered?

> `optional` **onEntered?**: (`node`) => `void`

Callback fired after the Modal finishes transitioning in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`ModalProps.onEntered`

***

### onEntering?

> `optional` **onEntering?**: (`node`) => `void`

Callback fired as the Modal begins to transition in

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`ModalProps.onEntering`

***

### onEsc?

> `optional` **onEsc?**: `KeyboardEventHandler`\<`Element`\>

#### Inherited from

`ModalProps.onEsc`

***

### onExit?

> `optional` **onExit?**: (`node`) => `void`

Callback fired right before the Modal transitions out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`ModalProps.onExit`

***

### onExited?

> `optional` **onExited?**: (`node`) => `void`

Callback fired after the Modal finishes transitioning out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`ModalProps.onExited`

***

### onExiting?

> `optional` **onExiting?**: (`node`) => `void`

Callback fired as the Modal begins to transition out

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

#### Inherited from

`ModalProps.onExiting`

***

### onOpen?

> `optional` **onOpen?**: () => `void`

Called when Modal is displayed

#### Returns

`void`

#### Inherited from

`ModalProps.onOpen`

***

### open?

> `optional` **open?**: `boolean`

Open  modal

#### Inherited from

`ModalProps.open`

***

### overflow?

> `optional` **overflow?**: `boolean`

Automatically sets the height when the body content is too long.

#### Inherited from

`ModalProps.overflow`

***

### role?

> `optional` **role?**: `AriaRole`

#### Inherited from

[`RsImageProps`](RsImageProps.md).[`role`](RsImageProps.md#role)

***

### size?

> `optional` **size?**: `ModalSize`

A modal can have different sizes

#### Inherited from

`ModalProps.size`

***

### style?

> `optional` **style?**: `CSSProperties`

Additional style

#### Inherited from

`ModalProps.style`

***

### transition?

> `optional` **transition?**: `ElementType`\<`any`, keyof IntrinsicElements\>

#### Inherited from

`ModalProps.transition`
