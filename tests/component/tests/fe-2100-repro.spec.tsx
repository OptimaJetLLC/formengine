import {viewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {render, waitFor} from '@testing-library/react'
import {togglePreview} from '../util/controls'
import {renderBuilder} from '../util/renderBuilder'
import absoluteOverlayForm from './forms/fe-2100-absolute-overlay.json'
import dualOverlaysForm from './forms/fe-2100-dual-overlays.json'
import fixedAlwaysForm from './forms/fe-2100-fixed-always.json'
import fixedHiddenForm from './forms/fe-2100-fixed-hidden.json'
import fixedShownForm from './forms/fe-2100-fixed-shown.json'
import nestedFixedForm from './forms/fe-2100-nested-fixed.json'
import stickyAndFixedForm from './forms/fe-2100-sticky-and-fixed.json'

const renderViewer = (form: object) => {
  const getForm = () => JSON.stringify(form)
  return render(<FormViewer view={viewWithCss} getForm={getForm} />)
}

describe('FE-2100 fixed / breakout overlays', () => {
  describe('fixed overlay hidden by renderWhen', () => {
    it('hides the overlay in the form viewer', async () => {
      const {findByText, queryByText} = renderViewer(fixedHiddenForm)

      expect(await findByText('Main content')).toBeInTheDocument()
      expect(queryByText('Create Receiving Order')).not.toBeInTheDocument()
    })

    it('still mounts the overlay in builder mode', async () => {
      const {findByText} = await renderBuilder(fixedHiddenForm)

      expect(await findByText('Main content')).toBeInTheDocument()
      expect(await findByText('Create Receiving Order')).toBeInTheDocument()
    })

    it('unmounts the overlay after switching to preview', async () => {
      const app = await renderBuilder(fixedHiddenForm)

      expect(await app.findByText('Create Receiving Order')).toBeInTheDocument()

      await togglePreview(app)

      await waitFor(() => {
        expect(app.queryByText('Create Receiving Order')).not.toBeInTheDocument()
      })
      expect(await app.findByText('Main content')).toBeInTheDocument()
    })
  })

  describe('fixed overlay with renderWhen true', () => {
    it('shows the overlay in the form viewer', async () => {
      const {findByText} = renderViewer(fixedShownForm)

      expect(await findByText('Main content shown')).toBeInTheDocument()
      expect(await findByText('Always-open fixed overlay')).toBeInTheDocument()
    })

    it('shows the overlay in builder mode', async () => {
      const {findByText} = await renderBuilder(fixedShownForm)

      expect(await findByText('Main content shown')).toBeInTheDocument()
      expect(await findByText('Always-open fixed overlay')).toBeInTheDocument()
    })
  })

  describe('fixed overlay without renderWhen', () => {
    it('shows the overlay in the form viewer', async () => {
      const {findByText} = renderViewer(fixedAlwaysForm)

      expect(await findByText('Main content always')).toBeInTheDocument()
      expect(await findByText('Unconditional fixed overlay')).toBeInTheDocument()
    })

    it('shows the overlay in builder mode', async () => {
      const {findByText} = await renderBuilder(fixedAlwaysForm)

      expect(await findByText('Main content always')).toBeInTheDocument()
      expect(await findByText('Unconditional fixed overlay')).toBeInTheDocument()
    })
  })

  describe('nested fixed overlay hidden by renderWhen', () => {
    it('hides the overlay in the form viewer', async () => {
      const {findByText, queryByText} = renderViewer(nestedFixedForm)

      expect(await findByText('Main content nested')).toBeInTheDocument()
      expect(queryByText('Nested fixed overlay')).not.toBeInTheDocument()
    })

    it('still mounts the overlay in builder mode', async () => {
      const {findByText, findByTestId} = await renderBuilder(nestedFixedForm)

      expect(await findByText('Main content nested')).toBeInTheDocument()
      expect(await findByTestId('nestedOverlay-editable-wrapper')).toBeInTheDocument()
      expect(await findByText('Nested fixed overlay')).toBeInTheDocument()
    })
  })

  describe('dual overlays with mixed renderWhen', () => {
    it('shows only the renderWhen-true overlay in the viewer', async () => {
      const {findByText, queryByText} = renderViewer(dualOverlaysForm)

      expect(await findByText('Main content dual')).toBeInTheDocument()
      expect(queryByText('Hidden fixed overlay')).not.toBeInTheDocument()
      expect(await findByText('Visible fixed overlay')).toBeInTheDocument()
    })

    it('mounts both overlays in builder mode', async () => {
      const {findByText} = await renderBuilder(dualOverlaysForm)

      expect(await findByText('Main content dual')).toBeInTheDocument()
      expect(await findByText('Hidden fixed overlay')).toBeInTheDocument()
      expect(await findByText('Visible fixed overlay')).toBeInTheDocument()
    })
  })

  describe('absolute overlay hidden by renderWhen', () => {
    it('hides the overlay in the form viewer', async () => {
      const {findByText, queryByText} = renderViewer(absoluteOverlayForm)

      expect(await findByText('Main content absolute')).toBeInTheDocument()
      expect(queryByText('Absolute overlay')).not.toBeInTheDocument()
    })

    it('still mounts the overlay in builder mode', async () => {
      const {findByText, findByTestId} = await renderBuilder(absoluteOverlayForm)

      expect(await findByText('Main content absolute')).toBeInTheDocument()
      expect(await findByTestId('absoluteOverlay-editable-wrapper')).toBeInTheDocument()
      expect(await findByText('Absolute overlay')).toBeInTheDocument()
    })
  })

  describe('sticky bar with hidden fixed sibling', () => {
    it('keeps the sticky bar and hides the fixed overlay in the viewer', async () => {
      const {findByText, queryByText} = renderViewer(stickyAndFixedForm)

      expect(await findByText('Main content sticky')).toBeInTheDocument()
      expect(await findByText('Sticky bar')).toBeInTheDocument()
      expect(queryByText('Fixed beside sticky')).not.toBeInTheDocument()
    })

    it('mounts sticky bar and fixed overlay in builder mode', async () => {
      const {findByText, findByTestId} = await renderBuilder(stickyAndFixedForm)

      expect(await findByText('Main content sticky')).toBeInTheDocument()
      expect(await findByText('Sticky bar')).toBeInTheDocument()
      expect(await findByTestId('fixedBesideSticky-editable-wrapper')).toBeInTheDocument()
      expect(await findByText('Fixed beside sticky')).toBeInTheDocument()
    })
  })
})
