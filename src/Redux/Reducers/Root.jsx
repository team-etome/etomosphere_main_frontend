import { combineReducers } from 'redux';
import ApiUrlReducer from './ApiUrlReducers'; 






const rootReducer = combineReducers({

  APIURL              : ApiUrlReducer,
  
}); 

export default rootReducer;
