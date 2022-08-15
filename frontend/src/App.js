import { BrowserRouter as Router } from "react-router-dom"
import Routes from './routes'
import { AuthProvider } from './hooks/authentication'
import { NotificationsProvider } from './hooks/notifications'
import { ProjectsProvider } from './hooks/projects'
import GlobalStyles from './GlobalStyles'

const App = () => {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <ProjectsProvider>
          <Router>
            <Routes />

            <GlobalStyles />
          </Router>
        </ProjectsProvider>
      </NotificationsProvider>
    </AuthProvider>
  )
}

export default App
