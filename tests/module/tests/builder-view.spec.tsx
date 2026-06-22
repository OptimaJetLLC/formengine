import {type BuilderComponent, BuilderView} from '@react-form-builder/core'

describe('BuilderView tests', function () {
  it('BuilderView uses a defensive copy of the components', () => {
    const components: BuilderComponent[] = []

    const builderView = new BuilderView(components)

    expect(builderView.builderComponents).not.toHaveLength(0)
    expect(components).toHaveLength(0)
  })
})
