import React, { Component } from 'react';
import renderProps from './renderProps';
import {createStore, applyMiddleware, connect, combineReduces, thunk} from 'react-redux';
import {BrowserRouter as Router ,Switch, NavLink,Route, BrowserHistory, Redirect} from 'react-router';
import createSagaMiddleware from 'redux-saga';
//import reducer from './reducers';
import mySaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

const reducer =(newState = [], action)=>{ 
	switch (action.type) {
    case 'LOGIN':
      return newState.user(action.payload);
	  break;
	case 'LOGOUT':
      return newState.user(action.payload);
	  break;
   
	case 'SET_NEW_PASS':
      return newState.user(action.payload);
	    break;
	case 'LOGIN':
      return newState.user(action.payload);
	    break; 
	 default:
	return Object.assign({}, newState)
}

const store = createStore(
  ()=>{},
  applyMiddleware(sagaMiddleware)
)



class Main extends Component{
	constructor(props){
		super(props);
		
	}
	
	componentDidMount(){
		
		
	}
	
	render(){
		
		return(
			<div className="main">
			</div>
		);
		
		
	}
}
 



export  default connect((store)=>{
	return{
		store
	} 
})(Main);