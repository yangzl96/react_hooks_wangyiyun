import React, { memo, Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import ZLAppHeader from '@/components/app-header'
import ZLAppFooter from '@/components/app-footer'
import ZLAppPlayerBar from './pages/play/app--player-bar'

import routes from './router'
import store from './store'

export default memo(function App () {
  return (
    <Provider store={store}>
      <HashRouter>
        <ZLAppHeader />
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <ZLAppFooter />
        <ZLAppPlayerBar />
      </HashRouter>
    </Provider>
  )
})
