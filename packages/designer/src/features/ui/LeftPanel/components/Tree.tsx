import {ComponentDataProvider, ComponentTree, getNonVisualChildren} from '@react-form-builder/core'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useCallback, useEffect, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Columns, Rows} from '../../../components/Containers'
import {customizableObserver} from '../../../customization/customizableObserver'
import {DraggableTreeNode} from '../../../dnd/components/DraggableTreeNode'
import {NonVisualListItem} from './NonVisualListItem'
import styles from './Tree.module.css'

const RawTree = (props: ComponentProps<typeof Rows>) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const {componentTree} = builderStore.viewer.form
  const nonVisual = getNonVisualChildren(componentTree)
  const screenTree = useMemo(() => [componentTree], [componentTree])

  const expandAll = useCallback(() => builderStore.expandAll(), [builderStore])
  const collapseAll = useCallback(() => builderStore.collapseAll(), [builderStore])

  useEffect(() => {
    builderStore.expanded.add(componentTree)
  }, [builderStore.expanded, componentTree])

  return (
    <Rows {...props} className={cx(styles.root, props.className)}>
      <Columns>
        <Button className={styles.subtleIconButton} onClick={expandAll} size={'sm'} appearance={'subtle'}>
          <ExpandOutline/>
          {t('tree.expand')}
        </Button>
        <Button className={styles.subtleIconButton} onClick={collapseAll} size={'sm'} appearance={'subtle'}>
          <CollaspedOutline/>
          {t('tree.collapse')}
        </Button>
      </Columns>
      <div className={styles.treeContainer}>
        <ComponentTree data={screenTree} componentDataViewer={DraggableTreeNode}/>
        {nonVisual.length > 0 && (
          <div className={styles.nonVisualGroup} data-testid="non-visual-tree-group">
            <div className={styles.nonVisualGroupTitle}>{t('tree.nonVisual')}</div>
            <div className={styles.nonVisualList}>
              {nonVisual.map(component => (
                <ComponentDataProvider key={component.id} value={component}>
                  <NonVisualListItem/>
                </ComponentDataProvider>
              ))}
            </div>
          </div>
        )}
      </div>
    </Rows>
  )
}

export const Tree = customizableObserver('Tree_Tab_Content', RawTree)
