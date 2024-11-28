import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/LoginComponent';
import MushroomSearch from './components/MushroomSearchComponent';
import MushroomInsert from './components/MushroomInsertComponent';
import {Provider} from 'react-redux';
import store from './redux/storeInitializer';
import MushroomPredict from "./components/MushroomPredictComponent";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/search" element={<MushroomSearch/>}/>
                    <Route path="/insert" element={<MushroomInsert/>}/>
                    <Route path="/predict" element={<MushroomPredict/>}/>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;