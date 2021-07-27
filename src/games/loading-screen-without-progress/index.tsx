import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'
import { Spin, Typography } from 'antd'
import config from '../../config.json'
import { GameWithActions, useScreen } from '../../util/game-with-actions'

const LoadingScreen: GameComponent = forwardRef((_props, ref) => {
  // TODO: Optional useScreenResult
  const useScreenResult = useScreen()

  return (
    <GameWithActions loadedGameConfig={{ useScreenResult }}>
      <Spin tip='Loading' size='large' />
    </GameWithActions>
  )
})

LoadingScreen.description = (
  <>
    <Typography.Paragraph>
      When an asynchronous task needs to be completed before a game can be played, it's nice to see
      some sort of indicator that something is loading, instead of a blank screen.
    </Typography.Paragraph>
    <Typography.Paragraph>
      There are two types of asynchronous tasks. Tasks that can be measured and tasks that cannot.
    </Typography.Paragraph>
    <Typography.Paragraph>
      This demo game shows a spinner for indicating that a task which isn't measurable is
      loading.
      <h2>Examples of not measurable tasks</h2>
      <ul>
        <li>Dynamically importing a script</li>
        <li>
          Loading data from {' '}
          <a href='https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'>
            IndexedDB
          </a>.
        </li>
        <li>Sending a fetch request for a small amount of data</li>
        <li>Using other asynchronous web APIs</li>
      </ul>
      This game doesn't actually have a task that's loading, it's just to demonstrate
      the spinner.
    </Typography.Paragraph>
    <Typography.Paragraph>
      <h2>Fake Loading Indicators</h2>
      {config.appName} will <strong>never</strong> use fake loading indicators. Here are some
      examples of fake loading indicators.
      <ul>
        <li>Showing a loading screen when nothing is actually loading</li>
        <li>
          Using an incorrect description of what is happening. Like saying 'connecting' when
          something else is actually happening
        </li>
        <li>
          Using a progress bar where no progress is being measured. Fake progress bars are
          programmed to keep increasing at a (linear / exponential / some other calculation) rate,
          to trick the users into thinking it's almost done loading
        </li>
      </ul>
    </Typography.Paragraph>
  </>
)

export default LoadingScreen
