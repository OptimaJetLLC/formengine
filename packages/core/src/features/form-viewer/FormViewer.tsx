import styled from '@emotion/styled'
import {namedObserver} from '../../utils'
import {TrialMessage} from '../licensing/TrialMessage'
import {ViewerLocalizationProvider} from '../localization/ViewerLocalizationProvider'
import {SuppressResizeObserverErrors} from '../ui/SuppressResizeObserverErrors'
import {Viewer} from './components/Viewer'
import {ViewerStoreProvider} from './components/ViewerStoreProvider'
import './setupMobx'
import {FormViewerProps} from './types'

//No other code here
/**
 * The main React component of the form viewer.
 * @returns the React element.
 */
export const FormViewer = namedObserver('FormViewer', (props: FormViewerProps) =>
  <SuppressResizeObserverErrors>
    <ViewerStoreProvider props={props}>
      <ViewerLocalizationProvider language={props.language}>
        <SDiv>
          <TrialMessage/>
          <Viewer event={props.event}/>
        </SDiv>
      </ViewerLocalizationProvider>
    </ViewerStoreProvider>
  </SuppressResizeObserverErrors>
)

export const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
`
