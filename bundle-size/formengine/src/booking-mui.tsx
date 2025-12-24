import {Box, Button, Step, StepLabel, Stepper} from '@mui/material'
import {muiBox} from '@react-form-builder/components-material-ui/box'
import {muiButton} from '@react-form-builder/components-material-ui/button'
import {muiCheckbox} from '@react-form-builder/components-material-ui/checkbox'
import {muiContainer} from '@react-form-builder/components-material-ui/container'
import {muiErrorWrapper} from '@react-form-builder/components-material-ui/error-wrapper'
import {muiSelect} from '@react-form-builder/components-material-ui/select'
import {muiTextField} from '@react-form-builder/components-material-ui/text-field'
import {
  buildForm,
  createView,
  define,
  FormViewer,
  type IFormData,
  type IFormViewer,
  string,
  useBuilderValue,
} from '@react-form-builder/core'
import {type ComponentProps, type CSSProperties, StrictMode, useCallback, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {actions, formValidators, todayIso, tomorrowIso} from './utils'

type MuiImageProps = ComponentProps<'img'>

/**
 * Simple image component for the booking preview.
 * @param props the image props.
 * @returns the React element.
 */
const MuiImage = ({alt, src, ...props}: MuiImageProps) => {
  const source = useBuilderValue(src, '')
  return <img {...props} alt={alt} src={source as string} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
}

const muiImage = define(MuiImage, 'MuiImage')
  .name('Image')
  .props({
    src: string.required.default('').dataBound,
    alt: string.default('Room preview'),
  })

type MuiStaticHtmlProps = ComponentProps<'div'> & {
  content: string
}

/**
 * Static HTML content for room description.
 * @param props the component props.
 * @returns the React element.
 */
const MuiStaticHtml = ({content, ...props}: MuiStaticHtmlProps) => {
  const value = useBuilderValue(content, '') as string
  return <div {...props} dangerouslySetInnerHTML={{__html: value}} />
}

const muiStaticHtml = define(MuiStaticHtml, 'MuiStaticHtml')
  .name('Static content')
  .props({
    content: string.required.default('').dataBound,
  })

const components = [muiContainer, muiTextField, muiButton, muiErrorWrapper, muiSelect, muiCheckbox, muiBox, muiImage, muiStaticHtml].map(
  def => def.build().model
)

const view = createView(components)

const rowStyle: CSSProperties = {flexDirection: 'row', gap: '16px', display: 'flex'}
const cellStyle: CSSProperties = {padding: 0, margin: 0, flexDirection: 'column'}

const bookingDetailsForm = buildForm({errorType: 'MuiErrorWrapper'})
  .component('step1-container', 'MuiContainer')
  .style({display: 'flex', flexDirection: 'column', gap: '16px'})
  .children(line =>
    line
      // Row 1: Check-in, Check-out, Guests
      .component('row-dates-guests', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-check-in', 'MuiContainer')
          .style({...cellStyle, width: '37%', minWidth: '256px'})
          .children(col =>
            col
              .component('check-in-date', 'MuiTextField')
              .prop('label', 'Check-in')
              .prop('type', 'date')
              .prop('value', todayIso())
              .validation('required')
              .validation('code')
              .args({
                code: `if (!value) return true;
  const selected = new Date(value);
  const today = new Date('${todayIso()}T00:00:00');
  selected.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return selected >= today;
`,
                message: "Check-in date cannot precede today's date.",
              })
          )

          .component('col-check-out', 'MuiContainer')
          .style({...cellStyle, width: '37%', minWidth: '256px'})
          .children(col =>
            col
              .component('check-out-date', 'MuiTextField')
              .prop('label', 'Check-out')
              .prop('type', 'date')
              .prop('value', tomorrowIso())
              .validation('required')
          )

          .component('col-guests', 'MuiContainer')
          .style({...cellStyle, width: '15%', minWidth: '192px'})
          .children(col =>
            col
              .component('number-of-guests', 'MuiSelect')
              .prop('label', 'Number of guests')
              .prop('items', [
                {value: '1', label: '1'},
                {value: '2', label: '2'},
                {value: '3', label: '3'},
                {value: '4', label: '4'},
                {value: '5', label: '5'},
                {value: '6', label: '6'},
                {value: '7', label: '7'},
                {value: '8', label: '8'},
                {value: '9', label: '9'},
                {value: '10+', label: '10+'},
              ])
              .prop('value', '2')
          )
      )

      // Row 2: Room type and Non-smoking
      .component('row-room-type', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-room-type', 'MuiContainer')
          .style({...cellStyle, width: '74%', minWidth: '256px'})
          .children(col =>
            col
              .component('room-type', 'MuiSelect')
              .prop('label', 'Room type')
              .prop('items', [
                {value: 'queen', label: 'Queen Room'},
                {value: 'king', label: 'King Room'},
                {value: 'deluxe-king', label: 'Deluxe King Room'},
                {value: 'superior-king', label: 'Superior King Room'},
              ])
              .prop('value', 'queen')
              .validation('required')
          )

          .component('col-non-smoking', 'MuiContainer')
          .style({...cellStyle, width: '26%', minWidth: '192px', justifyContent: 'flex-end'})
          .children(col => col.component('non-smoking', 'MuiCheckbox').prop('label', 'Non-smoking').prop('checked', false))
      )

      // Row 3: Room preview image
      .component('row-room-preview', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-room-preview', 'MuiContainer')
          .style({...cellStyle, width: '37%', minWidth: '192px'})
          .children(col =>
            col
              .component('room-preview-image', 'MuiImage')
              .style({height: '224px'})
              .computedProp(
                'src',
                "  const roomType = form.rootData['room-type'];\n" +
                  "  if (roomType === 'king') return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80';\n" +
                  "  if (roomType === 'deluxe-king') return 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80';\n" +
                  "  if (roomType === 'superior-king') return 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80';\n" +
                  "  return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80';\n"
              )
          )

          .component('col-room-description', 'MuiContainer')
          .style({...cellStyle, width: '63%', minWidth: '256px'})
          .children(col =>
            col
              .component('room-description', 'MuiStaticHtml')
              .computedProp(
                'content',
                "  const roomType = form.rootData['room-type'];\n" +
                  "  if (roomType === 'king') return '<h4 style=\"padding-top:16px\">King Room</h4>\\n<p style=\"padding-top:8px;font-size:14px;\">\\nOur King Room offers spacious luxury with a king-sized bed for a great night\\'s sleep. Stay connected with complimentary Wi-Fi, refresh in the private bathroom, and enjoy in-room entertainment with a flat-screen TV. Keep your favorite beverages cool in the mini-fridge, and start your day right with a coffee from the in-room coffee maker. The ideal retreat for your travels.\\n</p>\\n\\n';\n" +
                  '  if (roomType === \'deluxe-king\') return \'<h4 style="padding-top:16px">Deluxe King Room</h4>\\n<p style="padding-top:8px;font-size:14px;">\\nElevate your stay in our Deluxe King Room. Experience ultimate comfort on a luxurious king-sized bed. Enjoy the convenience of complimentary Wi-Fi, a private bathroom, and entertainment on a flat-screen TV. Stay refreshed with a well-stocked mini-fridge and coffee maker. With added space and upscale amenities, this room offers a touch of luxury for a truly special stay.\\n</p>\\n\\n\';\n' +
                  '  if (roomType === \'superior-king\') return \'<h4 style="padding-top:16px">Superior King Room</h4>\\n<p style="padding-top:8px;font-size:14px;">\\nIndulge in the epitome of luxury in our Superior King Room. Experience ample space and opulence with a king-sized bed. Complimentary Wi-Fi keeps you connected, while the private bathroom and flat-screen TV provide comfort and entertainment. Enjoy the convenience of a well-equipped mini-fridge and coffee maker. This room is the top choice for a superior and memorable stay.\\n</p>\\n\\n\';\n' +
                  '  return \'<h4 style="padding-top:16px">Queen Room</h4>\\n<p style="padding-top:8px;font-size:14px;">\\nExperience comfort and convenience in our Queen Room. Unwind on a cozy queen-sized bed, stay connected with complimentary Wi-Fi, and enjoy the convenience of a private bathroom. For your entertainment, there\\\'s a flat-screen TV. A mini-fridge and coffee maker are at your disposal for added convenience. Your perfect choice for a relaxing stay.\\n</p>\\n\\n\';\n'
              )
          )
      )

      // Row 4: Number of rooms and With pets
      .component('row-rooms-pets', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-number-of-rooms', 'MuiContainer')
          .children(col =>
            col
              .component('number-of-rooms', 'MuiSelect')
              .style({...cellStyle, width: '50%', minWidth: '192px'})
              .prop('label', 'Number of rooms')
              .prop('items', [
                {value: '1', label: '1'},
                {value: '2', label: '2'},
                {value: '3', label: '3'},
                {value: '4', label: '4'},
                {value: '5', label: '5'},
              ])
              .prop('value', '1')
          )

          .component('col-with-pets', 'MuiContainer')
          .style({...cellStyle, width: '20%', minWidth: '256px', justifyContent: 'flex-end'})
          .children(col => col.component('with-pets', 'MuiCheckbox').prop('label', 'I am traveling with pets').prop('checked', false))
      )

      // Row 5: Extras
      .component('row-extras', 'MuiContainer')
      .style({flexDirection: 'row', gap: '16px'})
      .children(row =>
        row
          .component('col-extras', 'MuiContainer')
          .style({...cellStyle, width: '100%', minWidth: '256px'})
          .children(col =>
            col
              .component('extras', 'MuiSelect')
              .prop('label', 'Extras')
              .prop('items', [
                {value: 'Breakfast', label: 'Breakfast'},
                {value: 'Fitness', label: 'Fitness'},
                {value: 'Parking', label: 'Parking'},
                {value: 'Swimming pool', label: 'Swimming pool'},
                {value: 'Restaurant', label: 'Restaurant'},
                {value: 'Spa', label: 'Spa'},
              ])
              .prop('value', '')
          )
      )

      // Row 6: Notes
      .component('row-notes', 'MuiContainer')
      .style({flexDirection: 'row'})
      .children(row =>
        row
          .component('col-notes', 'MuiContainer')
          .style({...cellStyle, width: '100%', minWidth: '256px'})
          .children(col =>
            col.component('notes', 'MuiTextField').prop('label', 'Notes').prop('multiline', true).prop('minRows', 3).prop('value', '')
          )
      )
  )
  .json()

// console.log(bookingDetailsForm)

const travelerInfoForm = buildForm({errorType: 'MuiErrorWrapper'})
  .component('step2-container', 'MuiContainer')
  .style({display: 'flex', flexDirection: 'column', gap: '16px'})
  .children(line =>
    line
      // Row 1: Last name and First name
      .component('row-name', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-last-name', 'MuiContainer')
          .style({...cellStyle, width: '64%', minWidth: '192px'})
          .children(col =>
            col.component('last-name', 'MuiTextField').prop('label', 'Last name').prop('placeholder', 'Last name').validation('required')
          )

          .component('col-first-name', 'MuiContainer')
          .style({...cellStyle, width: '36%', minWidth: '256px'})
          .children(col =>
            col.component('first-name', 'MuiTextField').prop('label', 'First name').prop('placeholder', 'First name').validation('required')
          )
      )

      // Row 2: Address line 1
      .component('row-address-line-1', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-address-line-1', 'MuiContainer')
          .style({...cellStyle, width: '100%', minWidth: '256px'})
          .children(col =>
            col.component('address-line-1', 'MuiTextField').prop('label', 'Address line 1').prop('placeholder', 'Address line 1')
          )
      )

      // Row 3: Address line 2
      .component('row-address-line-2', 'MuiContainer')
      .style({flexDirection: 'row'})
      .children(row =>
        row
          .component('col-address-line-2', 'MuiContainer')
          .style({...cellStyle, width: '100%', minWidth: '256px'})
          .children(col =>
            col.component('address-line-2', 'MuiTextField').prop('label', 'Address line 2').prop('placeholder', 'Address line 2')
          )
      )

      // Row 4: City, Zip, State
      .component('row-city-zip-state', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-city', 'MuiContainer')
          .style({...cellStyle, width: '36%', minWidth: '256px'})
          .children(col => col.component('city', 'MuiTextField').prop('label', 'City').prop('placeholder', 'City'))

          .component('col-zip', 'MuiContainer')
          .style({...cellStyle, width: '28%', minWidth: '192px'})
          .children(col => col.component('zip', 'MuiTextField').prop('label', 'Zip code').prop('placeholder', 'Zip code'))

          .component('col-state', 'MuiContainer')
          .style({...cellStyle, width: '36%', minWidth: '256px'})
          .children(col => col.component('state', 'MuiTextField').prop('label', 'State').prop('placeholder', 'State'))
      )

      // Row 5: Country and Phone
      .component('row-country-phone', 'MuiContainer')
      .style(rowStyle)
      .children(row =>
        row
          .component('col-country', 'MuiContainer')
          .style({...cellStyle, width: '36%', minWidth: '256px'})
          .children(col =>
            col
              .component('country', 'MuiSelect')
              .prop('label', 'Country')
              .prop('items', [
                {value: 'United States', label: 'United States'},
                {value: 'Canada', label: 'Canada'},
                {value: 'United Kingdom', label: 'United Kingdom'},
                {value: 'France', label: 'France'},
                {value: 'Germany', label: 'Germany'},
                {value: 'Japan', label: 'Japan'},
              ])
          )

          .component('col-phone', 'MuiContainer')
          .style({flexDirection: 'column', width: '64%', minWidth: '192px'})
          .children(col => col.component('phone', 'MuiTextField').prop('label', 'Phone').prop('placeholder', 'Phone'))
      )
  )
  .json()

const steps = ['Booking Details', 'Traveler Info']

export const App = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [stepData, setStepData] = useState<[Record<string, unknown>, Record<string, unknown>]>([{}, {}])
  const viewerRef = useRef<IFormViewer>(null)

  const getForm = useCallback(() => {
    return activeStep === 0 ? bookingDetailsForm : travelerInfoForm
  }, [activeStep])

  const getInitialData = useCallback(() => {
    return stepData[activeStep]
  }, [activeStep, stepData])

  const handleNext = useCallback(async () => {
    const viewer = viewerRef.current
    if (viewer) {
      const formData = viewer.formData as IFormData
      await formData.validate()
      if (formData.hasErrors) {
        return
      }
      setStepData(prev => {
        const newData = [...prev] as [Record<string, unknown>, Record<string, unknown>]
        newData[activeStep] = formData.data
        return newData
      })
      setActiveStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }, [activeStep])

  const handleBack = useCallback(() => {
    const viewer = viewerRef.current
    if (viewer) {
      const formData = viewer.formData as IFormData
      setStepData(prev => {
        const newData = [...prev] as [Record<string, unknown>, Record<string, unknown>]
        newData[activeStep] = formData.data
        return newData
      })
    }
    setActiveStep(prev => Math.max(prev - 1, 0))
  }, [activeStep])

  const handleFinish = useCallback(async () => {
    const viewer = viewerRef.current
    if (viewer) {
      const formData = viewer.formData as IFormData
      await formData.validate()
      if (formData.hasErrors) {
        return
      }
      const finalData = {...stepData[0], ...stepData[1], ...formData.data}
      console.warn('Booking data', finalData)
    }
  }, [stepData])

  const isLastStep = activeStep === steps.length - 1

  return (
    <div>
      <Stepper activeStep={activeStep} sx={{mb: 4, mt: 2}}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormViewer
        key={activeStep}
        view={view}
        getForm={getForm}
        actions={actions}
        viewerRef={viewerRef}
        initialData={getInitialData()}
        formValidators={formValidators}
      />
      <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Booking Details
        </Button>
        <Button variant="contained" color="primary" onClick={isLastStep ? handleFinish : handleNext}>
          {isLastStep ? 'Book Now' : 'Traveler Info ➝'}
        </Button>
      </Box>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
