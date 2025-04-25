---
sidebar_position: 2
title: Preset components
description: Create a preset component in Designer
slug: /presets-components
---

# Preset components

## Overview

When you design a form in Designer, you can save one or more components and their settings to a preset. After saving, the preset will be
available for quick insertion as a component on the `Components` tab. To create a preset, select the necessary components and click the
`Create a preset component` button (with a bookmark icon) on the toolbar.

Differences with [templates](/nested-components#templates):

- The components from the preset are inserted into the form separately, without combining into a new entity.
- You can edit the components after insertion directly on the form and this will not entail changing the original preset.

## Example

1. Create a simple form with two inputs:
2. Set the label 'Name' to the first input, and 'Email' to the second input.
3. Set the other settings, for example, for the email input field, add the 'Email' validation on the Rules tab.
   ![Preset component 01](/assets/preset-component/preset-component-01.png)
4. Select both components by pressing Shift and clicking on the components in turn.
5. Click the _Create a preset component_ button (with a bookmark icon) on the toolbar.
   ![Preset component 02](/assets/preset-component/preset-component-02.png)
6. Set the name and category for the preset in the dialog box.
   ![Preset component 03](/assets/preset-component/preset-component-03.png)
7. The preset is now available on the components tab. To insert it, drag it onto the form.
   ![Preset component 04](/assets/preset-component/preset-component-04.png)

:::info

In the current version, localization is not saved in the preset. We plan to add this feature in the future.

:::

## Predefined presets

You can pre-define presets that will be immediately available to the user in the designer. They are created in the same way as regular
components, through the [definePreset](/api-reference/@react-form-builder/core/functions/definePreset) function. Here is an example:

```tsx
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {ComponentStore, definePreset} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {UserInfo} from '@rsuite/icons'

const rawComponents = [
  {
    "key": "rsInput1",
    "type": "RsInput",
    "props": {
      "label": {
        "value": "Name"
      }
    }
  },
  {
    "key": "rsInput3",
    "type": "RsInput",
    "props": {
      "label": {
        "value": "Email"
      }
    },
    "schema": {
      "validations": [
        {
          "key": "email"
        }
      ]
    }
  }
]

const componentStores = rawComponents.map(component => {
  return Object.assign(new ComponentStore('', component.key), component)
})

const userInfoPreset = definePreset('User info', componentStores)
  .category('fields')
  .icon(UserInfo)

const components = [...rSuiteComponents, userInfoPreset]
  .map(definer => definer.build())

const view = new BuilderView(components)

const FormBuilderApp = () => {
  return <FormBuilder view={view}/>
}
```

## Presets options

You can set [preset options](/api-reference/@react-form-builder/designer/interfaces/IPresetComponentOptions)
via [componentPresetOptions](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#presetcomponentoptions) FormBuilder
prop.

## Custom presets storage

Also, using the [onCreate](/api-reference/@react-form-builder/designer/interfaces/IPresetComponentOptions#oncreate)
and [onRemove](/api-reference/@react-form-builder/designer/interfaces/IPresetComponentOptions#onremove) callbacks
of [componentPresetOptions](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#presetcomponentoptions), you can
implement your own preset storage:

```tsx
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder, PresetComponentLocalStorage} from '@react-form-builder/designer'
import {useMemo} from 'react'

const components = [...rSuiteComponents]
  .map(definer => definer.build())

const view = new BuilderView(components)

export const FormBuilderApp = () => {
  const storage = useMemo(() => {
    return new PresetComponentLocalStorage('my-key')
  }, [])

  const presets = useMemo(() => storage.loadPresets(), [storage])

  return <FormBuilder view={view} presetComponentOptions={{
    components: presets,
    onCreate: (preset) => storage.savePreset(preset),
    onRemove: (name) => storage.removePreset(name)
  }}/>
}
```

Here is the code for the [PresetComponentLocalStorage](/api-reference/@react-form-builder/designer/classes/PresetComponentLocalStorage)
class:

```tsx title='PresetComponentLocalStorage.ts'
import type {PresetComponent} from './PresetComponent'

/**
 * Class for working with the preset components in the local storage.
 */
export class PresetComponentLocalStorage {
  private readonly presetsKey: string

  /**
   * Creates an instance of preset storage in local storage.
   * @param presetsKey the key for the preset components in the local storage.
   */
  constructor(presetsKey = 'presetComponents') {
    this.presetsKey = presetsKey
  }

  /**
   * Loads the preset components from the local storage.
   * @returns the preset components.
   */
  loadPresets = (): PresetComponent[] => {
    return Object.values(this.loadAll())
  }

  /**
   * Saves the preset component to the local storage.
   * @param preset the preset component to save.
   */
  savePreset = (preset: PresetComponent): void => {
    const current = this.loadAll()
    current[preset.name] = preset
    this.saveAll(current)
  }

  /**
   * Removes the preset component from the local storage.
   * @param name the name of the preset component.
   */
  removePreset = (name: string): void => {
    const current = this.loadAll()
    delete current[name]
    this.saveAll(current)
  }

  private loadAll = (): Record<string, PresetComponent> => {
    return JSON.parse(localStorage.getItem(this.presetsKey) ?? '{}') ?? {}
  }

  private saveAll = (presets: Record<string, PresetComponent>): void => {
    localStorage.setItem(this.presetsKey, JSON.stringify(presets))
  }
}
```
