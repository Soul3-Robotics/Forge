import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { resolveView } from './viewMode'

// Each view is its own bundle, so the quick view never downloads the 3D and scroll engine.
const App = lazy(() => import('./App.tsx'))
const QuickMode = lazy(() => import('./quick/QuickMode.tsx'))

const View = resolveView() === 'quick' ? QuickMode : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <View />
    </Suspense>
  </StrictMode>,
)
