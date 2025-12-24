import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {StrictMode, useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Model, Question, QuestionTextModel} from 'survey-core'
import {json} from './login-json.tsx'

type ElementToValue<E> = E extends {type: 'text'} ? string : E extends {type: 'boolean'} ? boolean : unknown

type ElementsToData<Arr extends readonly {name: string; type: string}[]> = {
  [K in Arr[number] as K['name']]: ElementToValue<K>
}

type LoginFormData = ElementsToData<(typeof json.pages)[0]['elements']>

function renderQuestion(q: Question) {
  const type = q.getType()

  if (type === 'text') {
    const tq = q as QuestionTextModel
    return (
      <TextField
        key={q.name}
        fullWidth
        margin="normal"
        label={q.title}
        type={tq.inputType || 'text'}
        required={q.isRequired}
        value={(q.value as string) ?? ''}
        error={q.hasErrors()}
        helperText={q.errors?.[0]?.text}
        onChange={e => (q.value = e.target.value)}
      />
    )
  }

  if (type === 'boolean') {
    return (
      <FormControlLabel
        key={q.name}
        control={<Checkbox checked={Boolean(q.value)} onChange={e => (q.value = e.target.checked)} />}
        label={q.title}
      />
    )
  }

  return null
}

// ----------------------
// 3) MUI theme (replaces SurveyJS theme)
// ----------------------

const muiTheme = createTheme({
  palette: {
    primary: {main: '#1976d2'},
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
})

function SurveyComponent() {
  const [survey, setSurvey] = useState<Model | null>(null)
  const [, forceUpdate] = useState(0)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  useEffect(() => {
    const survey = new Model(json)

    survey.onValueChanged.add(() => forceUpdate(x => x + 1))

    setSurvey(survey)
  }, [])

  if (!survey) return null

  const page = survey.currentPage

  const submit = async () => {
    setServerError(null)

    if (!survey.completeLastPage()) return

    setLoading(true)
    try {
      // simulate API call
      await new Promise(res => setTimeout(res, 1200))

      const data = survey.data as LoginFormData
      console.warn('SUBMIT', JSON.stringify(data, null, 2))
    } catch (_) {
      setServerError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{maxWidth: 400, mx: 'auto', mt: 8, p: 3}}>
        <Typography variant="h5" gutterBottom>
          {survey.title}
        </Typography>

        {page.elements.map(renderQuestion)}

        {serverError && (
          <Typography color="error" sx={{mt: 1}}>
            {serverError}
          </Typography>
        )}

        <Box sx={{mt: 3, position: 'relative'}}>
          <Button fullWidth variant="contained" disabled={loading} onClick={submit}>
            Login
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
