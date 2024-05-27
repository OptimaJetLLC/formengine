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
 * @param props the React component properties.
 * @returns the React element.
 */
const _FormViewer = (props: FormViewerProps) =>
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

export const FormViewer = namedObserver('FormViewer', _FormViewer)

export const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
`
