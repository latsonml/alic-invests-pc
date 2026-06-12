import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App'
import { initPostHog } from './lib/posthog'

initPostHog()

createRoot(document.getElementById('root')!).render(<App />)
