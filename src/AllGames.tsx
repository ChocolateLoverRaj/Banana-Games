import { FC, useContext } from 'react'
import config from './config.json'
import Helmet from 'react-helmet'
import { Table, Tooltip, Button, Popconfirm } from 'antd'
import games from './games'
import GameMeta from './types/GameMeta'
import { Link } from 'react-router-dom'
import GlobalStateContext from './GlobalStateContext'
import ErrorResult from './ErrorResult'
import { DownloadState } from './useDownloadedGames'
import {
  CheckOutlined,
  LoadingOutlined,
  DownloadOutlined,
  CloseCircleFilled
} from '@ant-design/icons'
import ErrorLogger from './ErrorLogger'
import GameTags from './GameTags'
import { css } from '@emotion/css'
import { red } from '@ant-design/colors'
import centerStyles from './centerStyles'

const allTags = new Set([...games.values()].flatMap(({ tags }) => tags ?? []))

const AllGames: FC = () => {
  const [
    downloadedGames,
    downloadedGamesError,
    retry,
    downloadGame,
    downloadGameErrors,
    resetDownloadGame,
    removeGame,
    removeGameErrors,
    resetRemoveGame
  ] = useContext(GlobalStateContext).downloadedGames

  return (
    <>
      <Helmet>
        <title>{config.appName}</title>
      </Helmet>
      <div>
        <h1 className={css(centerStyles)}>All Games</h1>
        {downloadedGamesError === undefined
          ? <Table
              dataSource={[...games]}
              columns={[{
                title: 'Name',
                render: ([url, { name }]: [string, GameMeta]) => <Link to={`./${url}`}>{name}</Link>
              }, {
                title: 'Tags',
                render: ([_url, { tags }]: [string, GameMeta]) => <GameTags {...{ tags }} />,
                filters: [...allTags].map(tag => ({ text: tag, value: tag })),
                onFilter: (tag, [, { tags }]) => tags?.includes(tag as string) ?? false
              }, {
                title: 'Downloaded',
                render: ([url, { name }]: [string, GameMeta]) => {
                  const downloadError = downloadGameErrors.get(url)
                  const removeError = removeGameErrors.get(url)
                  const error = downloadError ?? removeError
                  if (error !== undefined) {
                    const download = downloadError !== undefined
                    return (
                      <>
                        <ErrorLogger {...{ error }} />
                        <Popconfirm
                          title={`Error ${download
                            ? 'downloading'
                            : 'removing'} game`}
                          okText='Retry'
                          onConfirm={download
                            ? downloadGame.bind(undefined, url)
                            : removeGame.bind(undefined, url)}
                          onCancel={download
                            ? resetDownloadGame.bind(undefined, url)
                            : resetRemoveGame.bind(undefined, url)}
                        >
                          <CloseCircleFilled className={css({ color: red[4] })} />
                        </Popconfirm>
                      </>
                    )
                  }
                  switch (downloadedGames?.get(url)) {
                    case DownloadState.DOWNLOADED:
                      return (
                        <Popconfirm
                          title='Remove game?'
                          onConfirm={removeGame.bind(undefined, url)}
                        >
                          <Button type='text'><CheckOutlined /></Button>
                        </Popconfirm>
                      )
                    case DownloadState.DOWNLOADING:
                      return <Button type='text' loading><DownloadOutlined /></Button>
                    case DownloadState.NONE:
                      return (
                        <Button type='text' onClick={downloadGame.bind(undefined, url)}>
                          <DownloadOutlined />
                        </Button>
                      )
                    case DownloadState.REMOVING:
                      return <Tooltip title='Removing'><LoadingOutlined /></Tooltip>
                    default:
                      return <Tooltip title='Checking'><LoadingOutlined /></Tooltip>
                  }
                }
              }]}
              rowKey='0'
              pagination={{ hideOnSinglePage: true, pageSize: 100 }}
            />
          : <ErrorResult
              error={downloadedGamesError}
              title='Error Getting Downloaded Games'
              retry={retry}
            />}
      </div>
    </>
  )
}

export default AllGames
