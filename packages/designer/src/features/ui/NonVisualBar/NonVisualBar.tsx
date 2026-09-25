import {getNonVisualChildren, namedObserver, startCase} from '@react-form-builder/core'
import cx from 'clsx'
import type {FunctionComponent, SVGProps} from 'react'
import {useCallback, useMemo} from 'react'
import {Tooltip, Whisper} from 'rsuite'
import {icons} from '../../../icons/icons'
import {getIcon} from '../../../icons/utils'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import styles from './NonVisualBar.module.css'

type IconComponent = FunctionComponent<SVGProps<SVGSVGElement>>

interface NonVisualChipProps {
  componentKey: string
  name: string
  type: string
  selected: boolean
}

const NonVisualChip = ({componentKey, name, type, selected}: NonVisualChipProps) => {
  const builderStore = useBuilderStore()
  const Icon = useMemo((): IconComponent => {
    const iconName = startCase(name).replaceAll(' ', '')
    const componentIcon = getIcon(builderStore.getComponentMetadata(type).icon ?? iconName)
    return (componentIcon ?? icons.Default) as IconComponent
  }, [builderStore, name, type])

  const onClick = useCallback(() => {
    const node = builderStore.viewer.form.componentTree.findByKey(componentKey)
    if (node) builderStore.selectNode(node)
  }, [builderStore, componentKey])

  const speaker = useMemo(() => <Tooltip>{componentKey}</Tooltip>, [componentKey])

  return (
    <Whisper placement="top" speaker={speaker} trigger="hover">
      <button
        type="button"
        className={cx(styles.chip, selected && styles.selected)}
        data-testid={`${type}-non-visual-chip`}
        data-selected={selected ? 'true' : undefined}
        aria-pressed={selected}
        onClick={onClick}
      >
        <Icon width={16} height={16} viewBox="0 0 24 24" className={styles.icon}/>
      </button>
    </Whisper>
  )
}

const RawNonVisualBar = () => {
  const builderStore = useBuilderStore()
  const nonVisual = getNonVisualChildren(builderStore.viewer.form.componentTree)
  const selected = builderStore.selected

  if (!nonVisual.length) return null

  return (
    <div className={styles.bar} data-testid="non-visual-bar">
      {nonVisual.map(component => (
        <NonVisualChip
          key={component.key}
          componentKey={component.key}
          name={component.model.name}
          type={component.model.type}
          selected={selected.has(component)}
        />
      ))}
    </div>
  )
}

export const NonVisualBar = namedObserver('NonVisualBar', RawNonVisualBar)
