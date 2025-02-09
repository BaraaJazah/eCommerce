import { createRoot } from 'react-dom/client'
import AppRouter from './routes/AppRouter.tsx'
import "./Api/Axios_global"

// redux
import { persistor, store } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

// css

createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
)
