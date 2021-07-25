import { Dispatch, SetStateAction, useState } from 'react'

export enum Screen { PLAYING, PAUSED, TOUCH_EDIT }

export type UseScreenResult = [Screen, Dispatch<SetStateAction<Screen>>]

const useScreen = (): UseScreenResult => useState(Screen.PLAYING)

export default useScreen
