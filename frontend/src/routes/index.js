import { Routes as Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import PrivateRoutes from './privateRoutes'

const Routes = () => {
  return (
    <Switch>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Switch>
  )
}

export default Routes