import type {Definer} from '@react-form-builder/core'
import {antButton} from './components/AntButton'
import {antCol} from './components/AntCol'
import {antInput} from './components/AntInput'
import {antModal} from './components/AntModal'
import {antRow} from './components/AntRow'
import {antTable} from './components/AntTable'
import {antTooltip} from './components/AntTooltip'

export const antdComponents: Definer<any>[] = [antButton, antCol, antModal, antInput, antRow, antTable, antTooltip]
