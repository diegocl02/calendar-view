import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { store } from './redux/redux'
import { Calendar } from './components/calendar'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
