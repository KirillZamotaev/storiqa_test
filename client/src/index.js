import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import {Provider, connect} from  'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from  'redux-saga';
import {takeEvery}  from  'redux-saga/effects';
import {put, call}  from  'redux-saga/effects';

// Reducer
const initialState = {
  url: '',
  loading: false,
  error: false,
  user:null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'LOGIN_SUCCEDED':
      return {
        user: {
			userName: "loggedUser"
		},
        loading: false,
        error: false,
      };
    case 'LOGIN_FAILED':
      return {
        user: {
			userName: "failUser"
		},
        loading: false,
        error: true,
      };
	case 'REGISTRATION_START':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REGISTRATION_SUCCEDED':
      return {
       user: {
			userName: "registeredUser"
		},
        loading: false,
        error: false,
      };
    case 'REGISTRATION_FAILED':
      return {
        user:{
			userName: "failedRegistrationUser"
		},  
        loading: false,
        error: true,
      };
	case 'RESTORE_LINK_START':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'RESTORE_LINK_SUCCEDED':
      return {
        passIsRestoring: true,
        loading: false,
        error: false,
      };
    case 'RESTORE_LINK_FAILED':
      return {
         passIsRestoring: true,
        loading: false,
        error: true,
      };
	case 'SIGN_USER_START':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'SIGN_USER_SUCCEDED':
      return {
         user: {
			userName: "userEntered",
			entered: true
		},
		
        loading: false,
        error: false,
      };
    case 'SIGN_USER_FAILED':
      return {
        user: null,
        loading: false,
        error: true,
      };
	case 'LOGOUT_USER_START':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'LOGOUT_USER_SUCCEDED':
      return {
        user: null,
        loading: false,
        error: false,
      };
    case 'LOGOUT_USER_FAILED':
      return {
        user: null,
        loading: false,
        error: true,
      } 
	case 'SETPASS_START':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'SETPASS_SUCCEDED':
      return { 
		passRestored:true,
        loading: false,
        error: false,
      };
    case 'SETPASS_FAILED':
      return {
        passRestored:true,
        loading: false,
        error: true,
      }  
    default:
      return state;
  }
};

// Action Creators
const registerUserStart = () => {
  return { type: 'REGISTRATION_START' }
};
const registerUserSuccess = (data) => {
  return { type: 'REGISTRATION_SUCCEDED',payload: data }
};

const registerUserFailed = () => {
  return { type: 'REGISTRATION_FAILED' }
};


const restoreUserMailStart = (params) => {
  return { type: 'RESTORE_LINK_START' }
};

const restoreUserMailSuccess = (data) => {
  return { type: 'RESTORE_LINK_SUCCEDED', payload: data }
};

const restoreUserMailFail = () => {
  return { type: 'RESTORE_LINK_FAILED' }
};
 

const registrationSuccess = (data) => {
  return { type: 'REGISTRATION_SUCCEDED', url: data.message }
};

 
 
const signInUserStart = (params) => {
  return { type: 'SIGN_USER_START' }
};

const signInUserSuccess = (params) => {
  return { type: 'SIGN_USER_SUCCEDED', payload: params.data }
};

const signInUserFail = () => {
  return { type: 'SIGN_USER_FAILED' }
};


const logOutUserStart = () => {
  return { type: 'SIGN_USER_FAILED' }
};

const logOutUserSuccess = () => {
  return { type: 'SIGN_USER_FAILED' }
};
const logOutUserFail = () => {
  return { type: 'SIGN_USER_FAILED' }
};


const setPassStart = () => {
  return { type: 'SETPASS_START' }
};

const setPassSuccess = () => {
  return { type: 'SETPASS_SUCCEDED' }
};
const setPassFail = () => {
  return { type: 'SETPASS_FAILED' }
};


// Sagas
function* userSaga() { 
  yield takeEvery('RESETPASS', restoreUserMail);
  yield takeEvery('SETPASS', setPass);
  yield takeEvery('SIGNIN', signInUser);
  yield takeEvery('REGISTRATION', registerUser);
  yield takeEvery('LOGOUT', logOutUser);
}
function* setPass(params) {
	console.log("setPass started", params)
  try {
    yield put(setPass());
    const data = yield call(() => {
      return fetch('setpass',{
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(params.payload)
	  }).then(res => res.json())
      }
    );
    yield put(setPassSuccess(data));
  } catch (error) {
    yield put(setPassFail());
  }
}



function* registerUser(params) {
	console.log("registerUser started", params)
  try {
    yield put(registerUserStart());
    const data = yield call(() => {
      return fetch('/registeruser',{
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	  }).then(res => res.json())
      }
    );
    yield put(registerUserSuccess(data));
  } catch (error) {
    yield put(registerUserFailed());
  }
}

function* restoreUserMail(params) {
  try {
    yield put(restoreUserMailStart());
    const data = yield call(() => {
      return fetch('restoreusermail',{
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(params.payload)
	  }).then(res => res.json())
      }
    );
    yield put(restoreUserMailSuccess(data));
  } catch (error) {
    yield put(restoreUserMailFail());
  }
}

function* signInUser(params) {
  try {
    yield put(signInUserStart());
    const data = yield call(() => {
      return fetch('signinuser',{
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(params.payload)
	  }).then(res => res.json())
      }
    );
    yield put(signInUserSuccess(data));
  } catch (error) {
    yield put(signInUserFail());
  }
}


function* logOutUser() {
  try {
    yield put(logOutUserStart());
    const data = yield call(() => {
      return fetch('logoutuser')
              .then(res => res.json())
      }
    );
    yield put(logOutUserSuccess(data));
  } catch (error) {
    yield put(logOutUserFail());
  }
}

// Component
 

// Store
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(userSaga);

const mapStateToProps = (state) => {
   console.log("state", state)
   return state;
}

 

const ConnectedApp = connect(
  mapStateToProps  
)(App);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
 