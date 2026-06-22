import {allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'

const expectedRoles: Record<string, string[]> = {
  RsErrorMessage: ['error-message'],
  RsLabel: ['label'],
  RsTooltip: ['tooltip'],
  AntTooltip: ['tooltip'],
}

describe('ComponentRole feature test', () => {
  it('Components should have the correct role', () => {
    allComponentsViewer.forEach(model => {
      if (!model.typeName) return

      const roles = expectedRoles[model.typeName]
      if (!roles) return

      roles.forEach(role => {
        expect(model.hasComponentRole(role)).toBe(true)
      })
    })
  })

  it('Should have the preset role', () => {
    const component = allComponentsViewer.find(model => model.typeName === 'Login and password')

    expect(component?.hasFeatureValue('component-is-preset', true))
  })
})
