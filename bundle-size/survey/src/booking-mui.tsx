import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {StrictMode, useEffect, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Model, Question, QuestionCheckboxModel, QuestionDropdownModel, QuestionTextModel} from 'survey-core'
import {json} from './booking-json.tsx'

function renderQuestion(q: Question) {
  if (!q.isVisible) return null

  const key = q.name

  const commonProps = {
    // key: q.name,
    sx: {width: q.width || '100%', minWidth: q.minWidth},
  }

  switch (q.getType()) {
    case 'text': {
      const tq = q as QuestionTextModel
      return (
        <TextField
          {...commonProps}
          key={key}
          margin="normal"
          type={tq.inputType || 'text'}
          label={q.titleLocation === 'hidden' ? undefined : q.title}
          placeholder={tq.placeholder}
          value={(q.value as string) ?? ''}
          error={q.hasErrors()}
          helperText={q.errors?.[0]?.text || q.description}
          onChange={e => (q.value = e.target.value)}
        />
      )
    }

    case 'comment': {
      type QuestionWithPlaceholder = Question & {placeholder?: string}
      return (
        <TextField
          {...commonProps}
          key={key}
          margin="normal"
          multiline
          minRows={3}
          placeholder={(q as QuestionWithPlaceholder).placeholder}
          value={(q.value as string) ?? ''}
          onChange={e => (q.value = e.target.value)}
        />
      )
    }

    case 'dropdown': {
      const dq = q as QuestionDropdownModel
      return (
        <TextField
          {...commonProps}
          key={key}
          select
          margin="normal"
          value={q.value ?? ''}
          placeholder={dq.placeholder}
          onChange={e => (q.value = e.target.value)}
        >
          {dq.visibleChoices.map(c => (
            <MenuItem key={c.value} value={c.value}>
              {c.text}
            </MenuItem>
          ))}
        </TextField>
      )
    }

    case 'checkbox': {
      const cq = q as QuestionCheckboxModel
      const values = (q.value as string[]) || []
      return (
        <Stack {...commonProps} key={key} direction="row" spacing={1}>
          {cq.visibleChoices.map(c => (
            <FormControlLabel
              key={c.value}
              control={
                <Checkbox
                  checked={values.includes(String(c.value))}
                  onChange={e => {
                    q.value = e.target.checked ? [...values, c.value] : values.filter(v => v !== c.value)
                  }}
                />
              }
              label={c.text}
            />
          ))}
        </Stack>
      )
    }

    case 'tagbox': {
      type QuestionWithVisibleChoices = Question & {
        visibleChoices: {value: string; text: string}[]
      }
      const values = (q.value as string[]) || []
      return (
        <Stack {...commonProps} key={key} direction="row" spacing={1} sx={{mt: 2}}>
          {(q as QuestionWithVisibleChoices).visibleChoices.map(c => (
            <Chip
              key={c.value}
              label={c.text}
              color={values.includes(c.value) ? 'primary' : 'default'}
              onClick={() => {
                q.value = values.includes(c.value) ? values.filter(v => v !== c.value) : [...values, c.value]
              }}
            />
          ))}
        </Stack>
      )
    }

    case 'image': {
      type ImageQuestion = Question & {imageHeight?: string; imageLink?: string}
      const img = q as ImageQuestion
      return (
        <Card {...commonProps} key={key} sx={{mt: 2}}>
          <CardMedia component="img" height={img.imageHeight} image={img.imageLink} />
        </Card>
      )
    }

    case 'html': {
      type HtmlQuestion = Question & {html?: string}
      return <Box {...commonProps} sx={{mt: 2}} key={key} dangerouslySetInnerHTML={{__html: (q as HtmlQuestion).html ?? ''}} />
    }

    default:
      return null
  }
}

type RoomType = 'queen' | 'king' | 'deluxe-king' | 'superior-king'

const ROOM_PREVIEW_CONFIG: Record<RoomType, {imageName: string; htmlName: string}> = {
  king: {imageName: 'king-room-image', htmlName: 'king-room-description'},
  'deluxe-king': {imageName: 'deluxe-king-room-image', htmlName: 'deluxe-king-room-description'},
  queen: {imageName: 'queen-room-image', htmlName: 'queen-room-description'},
  'superior-king': {imageName: 'superior-king-room-image', htmlName: 'superior-king-room-description'},
}

function getRoomPreview(roomType: string | undefined) {
  if (!roomType) return null

  const config = ROOM_PREVIEW_CONFIG[roomType as RoomType]
  if (!config) return null

  const page = json.pages[0] as {
    elements: {
      name: string
      type: string
      imageLink?: string
      imageHeight?: string
      html?: string
    }[]
  }
  if (!page) return null

  const imageElement = page.elements.find(e => e.name === config.imageName)
  const htmlElement = page.elements.find(e => e.name === config.htmlName)

  if (!imageElement || !htmlElement) return null

  return {
    imageLink: imageElement.imageLink as string | undefined,
    imageHeight: imageElement.imageHeight as string | undefined,
    html: htmlElement.html as string | undefined,
  }
}

const theme = createTheme({
  palette: {primary: {main: '#1976d2'}},
})

function SurveyComponent() {
  const surveyRef = useRef<Model | null>(null)
  const [, forceUpdate] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const survey = new Model(json)
    survey.onValueChanged.add(() => forceUpdate(x => x + 1))
    surveyRef.current = survey

    // Trigger initial render once the survey model is created.
    forceUpdate(x => x + 1)

    return () => {
      surveyRef.current = null
    }
  }, [])

  const survey = surveyRef.current
  if (!survey) return null

  const page = survey.currentPage
  const roomType = survey.getValue('room-type') as string | undefined
  const roomPreview = getRoomPreview(roomType)

  const pageQuestions = page.elements.filter((el: Question) => {
    const type = el.getType?.()
    return type !== 'image' && type !== 'html'
  }) as Question[]

  const next = async () => {
    if (survey.isLastPage) {
      setLoading(true)
      await new Promise<void>(resolve => setTimeout(resolve, 1200))
      console.warn(JSON.stringify(survey.data, null, 2))
      setLoading(false)
    } else {
      survey.nextPage()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{maxWidth: 904, mx: 'auto', mt: 4, p: 3}}>
        <Typography variant="h4" gutterBottom>
          {survey.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {survey.description}
        </Typography>

        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>{pageQuestions.map(renderQuestion)}</Box>

        {roomPreview && (
          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2}}>
            <Card sx={{width: '37%', minWidth: '192px', mt: 2}}>
              <CardMedia component="img" height={roomPreview.imageHeight} image={roomPreview.imageLink} />
            </Card>
            <Box sx={{width: '63%', minWidth: '256px', mt: 2}} dangerouslySetInnerHTML={{__html: roomPreview.html ?? ''}} />
          </Box>
        )}

        <Box sx={{mt: 4, position: 'relative'}}>
          <Button variant="contained" disabled={loading} onClick={next}>
            {survey.isLastPage ? 'Book Now' : 'Traveler Info →'}
          </Button>

          {loading && <CircularProgress size={24} sx={{position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px'}} />}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SurveyComponent />
  </StrictMode>
)
