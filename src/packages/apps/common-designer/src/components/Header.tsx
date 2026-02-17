import {ViewPicker} from '@react-form-builder/apps-common'
import docs from '../images/docs.svg?url'
import logo from '../images/logo.svg?url'
import {CopyPasteButtons} from './CopyPasteButtons'

/**
 * The app header.
 * @returns the React element.
 */
export const Header = () => (
  <div className="navbar rs-theme-dark">
    <div className="navbar-container">
      <div className="left-menu">
        <a href="https://formengine.io" target="_blank" className="logo-1" aria-label="home" rel="noreferrer">
          <img width="Auto" height="32px" src={logo} alt="" />
        </a>
        <ViewPicker />
        <CopyPasteButtons />
      </div>
      <nav role="navigation" className="nav-menu">
        <div className="docs-button">
          <img width="20.000001907348633" height="20" src={docs} loading="lazy" alt="" className="docs-icon" />
          <a href="https://formengine.io/documentation" target="_blank" className="docs-label" rel="noreferrer">
            Documentation
          </a>
        </div>
        <a href="#" className="license-button">
          Get a license
        </a>
      </nav>
    </div>
  </div>
)
