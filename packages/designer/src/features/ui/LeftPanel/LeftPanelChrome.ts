import type {ComponentData} from '@react-form-builder/core'
import {nameObservable} from '@react-form-builder/core'
import {makeAutoObservable, observableRef} from 'mobx'
import type {PanelPlacement} from '../PanelPlacement'
import type {LeftPanelSection} from './leftPanelTab'
import {persistLeftPanelActiveTab, readLeftPanelActiveTab} from './leftPanelTab'

/**
 * The store methods the left panel chrome needs to reveal a component in the tree.
 */
interface LeftPanelChromeHost {
  selectNode(target: ComponentData, multipleSelection?: boolean): void
  setPanelVisible(placement: PanelPlacement, visible: boolean): void
  expandParents(target: ComponentData): void
}

/**
 * One-shot request to scroll a tree row into view after ancestors are expanded.
 * Holds the component key (not a live `ComponentData`) plus a nonce so the same key can be revealed again.
 */
type TreeRevealRequest = {key: string; id: number}

/**
 * Left panel tab persistence and tree reveal/scroll.
 *
 * Scroll policy: selecting a component does not scroll the tree. Only {@link LeftPanelChrome.revealInTree}
 * and {@link LeftPanelChrome.ensureNodeVisible} request a scroll; the matching tree row clears the request after scrolling.
 */
export class LeftPanelChrome {
  /**
   * The active left panel tab.
   */
  activeTab: LeftPanelSection = readLeftPanelActiveTab()

  /**
   * Pending tree scroll request, or `undefined` when none.
   */
  treeReveal?: TreeRevealRequest

  readonly #host: LeftPanelChromeHost

  /**
   * Creates the left panel chrome.
   * @param host the builder store methods used to select, expand, and show the tree.
   */
  constructor(host: LeftPanelChromeHost) {
    this.#host = host
    makeAutoObservable(
      this,
      {
        treeReveal: observableRef,
      },
      {name: nameObservable('LeftPanelChrome')}
    )
  }

  /**
   * Sets the active tab of the left panel.
   * @param tab the left panel section to activate.
   */
  setActiveTab(tab: LeftPanelSection) {
    this.activeTab = tab
    persistLeftPanelActiveTab(tab)
  }

  /**
   * Selects the component, shows the tree tab, expands ancestors, and requests a scroll to the row.
   * @param target the component to reveal in the tree.
   */
  revealInTree(target: ComponentData) {
    this.#host.selectNode(target)
    this.#host.setPanelVisible('left', true)
    this.setActiveTab('tree')
    this.ensureNodeVisible(target)
  }

  /**
   * Expands the ancestors of the component and requests a scroll to its tree row.
   * Does not change selection or the active tab.
   * @param target the component to show in the tree.
   */
  ensureNodeVisible(target: ComponentData) {
    this.#host.expandParents(target)
    this.treeReveal = {key: target.key, id: (this.treeReveal?.id ?? 0) + 1}
  }

  /**
   * Clears the pending scroll request after the matching tree row has scrolled.
   * @param id the nonce of the request that was handled.
   */
  clearTreeReveal(id: number) {
    if (this.treeReveal?.id === id) {
      this.treeReveal = undefined
    }
  }
}
