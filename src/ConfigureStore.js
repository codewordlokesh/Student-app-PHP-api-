import {createStore} from 'redux'; 
import StudentsReducerState from './reducer/studentReducer';

export default function ConfigureStore(){
    const store = createStore(StudentsReducerState);
    return store;
}