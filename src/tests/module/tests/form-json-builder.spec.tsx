import {buildForm} from '@react-form-builder/core'
import actionWithArgs from '../data/form-json-builder/action-with-args.json'
import chainChildren from '../data/form-json-builder/chain-children.json'
import chain from '../data/form-json-builder/chain.json'
import complexForm from '../data/form-json-builder/complex-form.json'
import emptyForm from '../data/form-json-builder/empty-form.json'
import localizedAfterEvent from '../data/form-json-builder/localized-after-event.json'
import computedAfterEvent from '../data/form-json-builder/computed-after-event.json'
import localizedAfterValidation from '../data/form-json-builder/localized-after-validation.json'
import computedAfterValidation from '../data/form-json-builder/computed-after-validation.json'

describe(`Should build correctly`, function () {
  it('empty form', async () => {
    const actualForm = buildForm()
    expect(JSON.parse(actualForm.json())).toStrictEqual(emptyForm)
  })

  it('complex form with children, styles, props and actions', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .style('background-color: red')
      .children((builder) =>
        builder
          .component('container1', 'RsContainer')
          .style({flexDirection: 'row'})
          .children((builder) =>
            builder
              .component('name', 'RsInput')
              .prop('placeholder', 'Enter your name')
              .prop('label', 'Name')
              .validation('required')

              .component('password', 'RsInput')
              .prop('label', 'Password')
              .prop('passwordMask', true)
              .validation('required')
          )
          .component('submit', 'RsButton')
          .prop('children', 'Login')
          .prop('color', 'blue')
          .prop('appearance', 'primary')
          .event('onClick')
          .commonAction('validate').args({failOnError: true})
          .customAction('onSubmit')
      )

    expect(JSON.parse(actualForm.json())).toMatchObject(complexForm)
  })

  it('setup chain that is completed using the children method', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage', defaultLanguage: 'en-US'})
      .component('container', 'RsContainer')
      .style('background-color: red')
      .validation('required')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})
      .customAction('onSubmit')
      .prop('prop', 'My prop')
      .computedProp('computed', 'return 1')
      .localizedProp('locProps', 'en-US', 'English')
      .localizedProp('locProps', 'de-DE', 'Deutsch')
      .children((builder) =>
        builder.component('container1', 'RsContainer')
          .localizedProp('locProps', 'es-ES', 'El gata')
          .localizedProp('locProps', 'en-US', 'EN')
          .computedProp('computed', 'return 23')
      )

    expect(JSON.parse(actualForm.json())).toMatchObject(chainChildren)
  })

  it('setup chain that is completed using the prop method', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .style('background-color: red')
      .children((builder) =>
        builder.component('container1', 'RsContainer')
      )
      .validation('required')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})
      .customAction('onSubmit')
      .prop('prop', 'My prop')

    expect(JSON.parse(actualForm.json())).toMatchObject(chain)
  })

  it('setup chain that is completed using the style method', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .children((builder) =>
        builder.component('container1', 'RsContainer')
      )
      .validation('required')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})
      .customAction('onSubmit')
      .prop('prop', 'My prop')
      .style('background-color: red')

    expect(JSON.parse(actualForm.json())).toMatchObject(chain)
  })

  it('setup chain that is completed using the validation method', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .style('background-color: red')
      .children((builder) =>
        builder.component('container1', 'RsContainer')
      )
      .prop('prop', 'My prop')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})
      .customAction('onSubmit')
      .validation('required')

    expect(JSON.parse(actualForm.json())).toMatchObject(chain)
  })

  it('setup chain that is completed using the action method', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .style('background-color: red')
      .children((builder) =>
        builder.component('container1', 'RsContainer')
      )
      .validation('required')
      .prop('prop', 'My prop')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})
      .customAction('onSubmit')

    expect(JSON.parse(actualForm.json())).toMatchObject(chain)
  })

  it('setup chain that is completed using the action args method', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .style('background-color: red')
      .children((builder) =>
        builder.component('container1', 'RsContainer')
      )
      .validation('required')
      .prop('prop', 'My prop')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})

    expect(JSON.parse(actualForm.json())).toMatchObject(actionWithArgs)
  })

  it('when the json method was called several times', async () => {
    const actualForm = buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .style('background-color: red')
      .children((builder) =>
        builder.component('container1', 'RsContainer')
      )
      .validation('required')
      .prop('prop', 'My prop')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})
      .customAction('onSubmit')

    actualForm.json()
    actualForm.json()

    expect(JSON.parse(actualForm.json())).toMatchObject(chain)
  })

  it('the localizedProp method should set localized property after the event method', async () => {
    const actualForm = buildForm()
      .component('button', 'Button')
      .event('onClick')
      .localizedProp('prop', 'en-US', 'return "alpha"')
      .localizedProp('prop', 'es-ES', 'return "beta"')

    expect(JSON.parse(actualForm.json())).toMatchObject(localizedAfterEvent)
  })

  it('the localizedProp method should set localized property after the validation method', async () => {
    const actualForm = buildForm()
      .component('button', 'Button')
      .validation('string')
      .localizedProp('p2', 'es-ES', 'some')
      .localizedProp('p1', 'en-US', 'test')

    expect(JSON.parse(actualForm.json())).toMatchObject(localizedAfterValidation)
  })

  it('the computedProp method should set computed property after the event method', async () => {
    const actualForm = buildForm()
      .component('button', 'Button')
      .event('onClick')
      .computedProp('prop1', 'throw new Error()')
      .computedProp('prop2', 'throw new Error("test")')

    expect(JSON.parse(actualForm.json())).toMatchObject(computedAfterEvent)
  })

  it('the computedProp method should set computed property after the validation method', async () => {
    const actualForm = buildForm()
      .component('button', 'Button')
      .validation('string')
      .computedProp('visible', 'return true')
      .computedProp('enabled', 'return false')

    expect(JSON.parse(actualForm.json())).toMatchObject(computedAfterValidation)
  })
})
