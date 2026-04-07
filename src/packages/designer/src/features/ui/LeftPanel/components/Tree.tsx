import {ComponentTree} from '@react-form-builder/core'
import {CollaspedOutline, ExpandOutline} from '@rsuite/icons'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useCallback, useEffect, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Columns, Rows} from '../../../components/Containers'
import {customizableObserver} from '../../../customization'
import {DraggableTreeNode} from '../../../dnd'
import styles from './Tree.module.css'

const RawTree = (props: ComponentProps<typeof Rows>) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const {componentTree} = builderStore.viewer.form
  const data = useMemo(() => [componentTree], [componentTree])

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
        <ComponentTree data={data} componentDataViewer={DraggableTreeNode}/>
      </div>
    </Rows>
  )
}

export const Tree = customizableObserver('Tree_Tab_Content', RawTree)
