import {createTheme, ThemeProvider} from '@mui/material'
import type {Theme} from '@mui/material/styles'
import {muiBox, muiStack, muiTypography} from '@react-form-builder/components-material-ui'
import {render, screen} from '@testing-library/react'
import type {ReactNode} from 'react'

const Box = muiBox.build().model.component
const Stack = muiStack.build().model.component
const Typography = muiTypography.build().model.component

const theme = createTheme()

const withTheme = (node: ReactNode) => <ThemeProvider theme={theme}>{node}</ThemeProvider>

describe('MuiBox / MuiStack / MuiTypography native MUI v9 props', () => {
  it('MuiBox applies maxWidth via sx and theme breakpoints', () => {
    render(withTheme(<Box data-testid="mui-box" sx={(t: Theme) => ({maxWidth: t.breakpoints.values.md})} />))

    const el = screen.getByTestId('mui-box')
    expect(el).toHaveStyle({maxWidth: `${theme.breakpoints.values.md}px`})
  })

  it('MuiStack applies layout via sx', () => {
    render(
      withTheme(
        <Stack data-testid="mui-stack" sx={{justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap'}}>
          item
        </Stack>
      )
    )

    const el = screen.getByTestId('mui-stack')
    expect(el).toHaveStyle({
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
    })
  })

  it('MuiTypography uses the native align prop', () => {
    render(withTheme(<Typography data-testid="mui-typography" align="center" />))

    expect(screen.getByTestId('mui-typography')).toHaveClass('MuiTypography-alignCenter')
  })
})
