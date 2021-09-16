import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContexts';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          {/* o parametro exact indica que o path precisa ser exatamente o indicado, sem ele o Router-Dom procurará um path que COMEÇA dessa forma */}
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
