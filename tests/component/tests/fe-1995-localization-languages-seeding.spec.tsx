import {view} from '@react-form-builder/components-rsuite'
import type {IFormViewer} from '@react-form-builder/core'
import {FormViewer} from '@react-form-builder/core'
import {render, waitFor} from '@testing-library/react'
import {expect} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import {createLocalizedScreenForm, getBuilderStore} from './localizationTestUtils'

const providedFormDefinition = createLocalizedScreenForm({
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'English',
      bidi: 'ltr',
    },
    {
      code: 'de',
      dialect: 'DE',
      name: 'German',
      description: 'Deutsch',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'en-US',
})

describe('localization languages seeding', () => {
  it('seeds viewer localization.langCodes from persisted languages when localization is empty', async () => {
    const viewerRef: { current: IFormViewer | null } = {current: null}
    const getForm = () => JSON.stringify(providedFormDefinition)
    render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    await waitFor(() => expect(viewerRef.current).toBeTruthy())

    const viewerStore = viewerRef.current as IFormViewer & { form: { localization: { langCodes: string[] } } }
    expect(viewerStore.form.localization.langCodes).toStrictEqual(['en-US', 'de-DE'])
  })

  it('keeps designer formAvailableLanguages populated right after parseForm', async () => {
    const {getFormBuilder} = await renderBuilder(providedFormDefinition)
    await waitFor(() => expect(getFormBuilder()).toBeTruthy())

    const builderStore = getBuilderStore<{ formAvailableLanguages: Array<{ fullCode: string }> }>(getFormBuilder)
    await waitFor(() => {
      expect(builderStore.formAvailableLanguages.map(language => language.fullCode)).toStrictEqual(['en-US', 'de-DE'])
    })
  })
})
