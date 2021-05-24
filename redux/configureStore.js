import {createStore , combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';

import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { InitialFeedback } from './forms';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const configureStore = () =>{

    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
      }

    const store = createStore(
        persistCombineReducers( config , {
            dishes : Dishes,
            comments : Comments,
            leaders : Leaders,
            promotions : Promotions,
            favorites,
            ...createForms({
                feedback : InitialFeedback
            })
            
        }),
        // // applyMiddleware(thunk , logger)
        applyMiddleware(thunk)
    )
    const persistor = persistStore(store)

    return { persistor, store };
}