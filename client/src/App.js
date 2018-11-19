import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Subject } from 'rxjs';
import { BrowserRouter as Router, Route, Link , Switch, Redirect} from "react-router-dom";
import { createBrowserHistory } from 'history';

const history  = createBrowserHistory();
 
class RestorePass extends Component{

	constructor(props){
		super(props)
		
		this.state={
			mail: ""
		}
		
		
	}
	componentDidMount(){
		let _this = this;
		 
		
		
	 
	}
	
	
	
	componentWillUnmount(){
		
		
	}
	
	inputHandler(e){
		let val = e.currentTarget.val;
		this.setState({mail: val})
		
	}
	
	onSubmitter(e){
		e.preventDefault();
		
		this.props.dispatch({type:"RESETPASS", payload: this.state.mail});
	}
	render(){
		
		if(this.props.passIsRestoring){ 
				return(
					<Redirect to="/inputnewpass" />
				) 
		}
		
		return(
		<div className="ob">
			<h1>Введите свою почту</h1>	
			<form onSubmit={this.onSubmitter.bind(this)} >
			<input type="text" value={this.state.mail} onChange={this.inputHandler.bind(this)} name="mail" required/> 
				<button type="submit"> Отправить </button>
			</form><br/><Link to={"/"}>На главную</Link>
			</div>
		)
		
	}

}


class InputNewPass extends Component{

	constructor(props){
		super(props)
		
		this.state={
			value: ""
		}
		
		
	}
	componentDidMount(){
		let _this = this;
		 
		
		
	 
	}
	
	
	componentWillUnmount(){
		
		
	}
	
	inputHandler(e){
		let val = e.currentTarget.val;
		this.setState({value: val})
		
	}
	
	onSubmitter(e){
		e.preventDefault();
		
		this.props.dispatch({type:"SETPASS", payload: this.state.value});
	}
	
	render(){
		
		if(this.props.passRestored){
			if(this.props.passRestored){
				return(
				<Redirect to="/" />
				)
			}
		}
		
		return(
		<div className="ob">
			<h1>Введите новый пароль</h1>
			<form onSubmit={this.onSubmitter.bind(this)} >
			<input type="text" value={this.state.value} onChange={this.inputHandler.bind(this)} name="mail" required/> 
				<button  type="submit"> Отправить </button>
			</form> 	<br/><Link to={"/"}>На главную</Link>
						
			
			
		</div>
		)
		
	}

}

class ProtectedMainPage extends Component{

	constructor(props){
		super(props)
		
		this.state={
			data: "TEXT"
		}
		
		
	}
	componentDidMount(){
		let _this = this;
		 
		
		
	 
	}
	
	
	componentWillUnmount(){
		
		
	}
	render(){
		return(
		<div className="ob">
			<h1>Защищенная страница с контентом, вы зарегистрированы!</h1>
				<Link to={"/"}>На главную</Link>
						<br/>
			
			
		</div>
		)
		
	}

}

 
class NotFound extends Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return(
				<div className="row ">
				<div className="col">
					<h1 className=" block_rxjs_subject">Страница не найдена</h1> 	<Link to={"/"}>На главную</Link>
						<br/>
				</div>
			</div>

		)
	}
}

class Restricted extends Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return(
				<div className="row ">
				<div className="col">
					<h1 className=" block_rxjs_subject">
					Доступ запрещен
					</h1> 
					<p>
					Вы должны <Link to={"signin"}>войти</Link> или <Link to={"/registration"}>зарегистрироваться</Link>
						<br/>
						<br/>
						<Link to={"/"}>На главную</Link>
					</p>
				</div>
			</div>

		)
	}
}


class Logger extends Component{
	constructor(props){
		super(props)
		
		this.state={
			userData:{
				userName: "",
				userPass: "",
			}
		}
		
		
		
		
	}
	
	componentDidMount(){
			let accessToken = null;
			
	}
	
	changeValue(e){
		e.preventDefault();
		let value = e.target.value;
		let field = e.target.name;
		
		let state = Object.assign({}, this.state);
		state[field] = value;
		this.setState(state)
		
	}
	onSubmitter(e){
		e.preventDefault();
		let userData= this.state.userData;
		this.props.dispatch({type: "SIGNIN", payload: userData})
		console.log("userData dispatched", userData) 
	}
	
	render(){ 
	
		if(this.props.user!==null){
			return(
			<Redirect to="/" />
			)
		}
		return(
				<div className="row">
					<div className="col">
					<h1>Вход</h1>
					<div className=" block_rxjs_subject">
						 
					<p>Войдите или зарегистрируйтесь</p>
					<form onSubmit={this.onSubmitter.bind(this)}>
					<p><input type="text" value={this.state.userName} onChange={this.changeValue.bind(this)} name="userName" required/></p>
					<p><input type="text" value={this.state.userPass} onChange={this.changeValue.bind(this)} name="userPass" required/></p>
					<p>
						<button >Войти</button> или <Link to={"/registration"}>Зарегистрироваться</Link> 
					</p>
					</form>
					<br/>
					<p>Забыли пароль? </p>
					<p>
					
						<Link to={"/resetpass"}>Восстановить пароль</Link>
					</p>
					<br/>
					<Link to={"/"}>На главную</Link>
						
					</div>
					</div>
				</div>

		)
	}
}

class Registration extends Component{
	constructor(props){
		super(props)
		
		this.state={
			userData:{
				userName: "",
				userPass: "",
				userMail: "",
				userPassRepeat:"",
				acceptTerms: false,
			},
			passwordCheck: null,
			mailCheck: null,
			termsCheck: null
		}
		
		
		
		
	}
	
	componentDidMount(){
			let accessToken = null;
			
	}
	
	changeValue(e){
		let value = e.target.value;
		let field = e.target.name;
		
		
		let state = Object.assign({}, this.state);
		if(e.target.type=="checkbox" && typeof state[field]!=="undefined"){
			state[field] = !state[field].value;
		}else{
		state[field] = value;
		}
		this.setState(state)
		
	}
	
	onSubmitter(e){
		e.preventDefault();
		let userData= this.state.userData;
		this.props.dispatch({type: "REGISTRATION", payload: userData})
		console.log("userData dispatched", userData) 
	}
	
	render(){
		
		if(this.props.user!==null){
			return(
			<Redirect to="/" />
			)
		}
		return(
				<div className="row">
					<div className="col">
				
					<h1>Регистрация</h1>
					<div className=" block_rxjs_subject">
					<form onSubmit={this.onSubmitter.bind(this)}>
					
					<p>Зарегистрируйтесь</p>
					<p><input type="text" value={this.state.userName} placeholder="Ваше имя*" onChange={this.changeValue.bind(this)} name="userName" required/></p>
					<p><input type="text" value={this.state.userMail} placeholder="Ваша почта*" onChange={this.changeValue.bind(this)} name="userMail" required/></p>
					<p><input type="text" value={this.state.userPass} placeholder="Пароль*" onChange={this.changeValue.bind(this)} name="userPass" required/></p>
					<p><input type="text" value={this.state.userPassRepeat} placeholder="Повторите пароль*" onChange={this.changeValue.bind(this)} name="userPassRepeat" required/></p>
					<p><input type="checkbox" value={this.state.acceptTerms}  onChange={this.changeValue.bind(this)} name="acceptTerms" required/>* Согласен с политикой конфиденциальности</p>
					<p>
						<button type="submit" >Зарегистрироваться</button> или <Link to={"/signin"}>Войти</Link> 
					</p>
					<br/>
					<Link to={"/"}>На главную</Link>
						<br/>
					 </form>
					</div>
					
					</div>
					
				</div>

		)
	}
}

class UserCabinet extends Component{
	constructor(props){
		super(props)
		
		this.state={
			userName: "",
			userPass: "",
		} 
		
	}
	 
	
	changeValue(e){
		let value = e.target.value;
		let field = e.target.name;
		
		let state = Object.assign({}, this.state);
		state[field] = value;
		this.setState(state)
		
	}
	
	render(){
		return(
				<div className="row">
					<div className="col">
					<h1>Личный кабинет. Пользователь </h1>
					 </div>
				</div> 
		)
	}
}

class Main extends Component{
	render(){
		return( 
			<MainPage /> 
		)
	}
}

 



class MainPage extends Component{

	constructor(props){
		super(props)
		
		this.state={
			data: []
		}
		
	 
	}
 
	componentWillReceiveProps(nextProps){
		console.log("USER::",this.props.user )
	}
	 
	render(){
		console.log("USER::",this.props.user )
		return(
		
		<div className="row">
			<div className=" block_rxjs_subject">
				<div className="block_nav">
				{
				(()=>{
					if( this.props.user == null){
						return(
						<React.Fragment>
							<Link to={"/signin"}>Войти</Link> 
							<Link to={"/registration"}>Регистрация</Link> 
						</React.Fragment>
						) 
					}else{
						return(
						<React.Fragment>
							<button onClick={this.props.dispatch({type:"LOGOUT"})}>Выйти</button> 
							<Link to={"/usercabinet"}>Личный кабинет</Link> 
						</React.Fragment>
						)	 
					} 
				})()
				}
				<Link to={"/public"}>Публичная страница</Link> 
				<Link to={"/protectedpage"}>Защищенная страница с контентом</Link>
				</div>
			</div>
			<div className="col">
					<div className="ob">
						<h2>Добро пожаловать!</h2>
						<p>Приветственный текст</p>
					</div>
			</div> 
		</div>
		)
		
	}

}


class Public extends Component{

	constructor(props){
		super(props)
		
		this.state={
			data: []
		}
		
	 
	}
 
	
	 
	render(){
		return(
		
		<div className="row">
		<div class="col">
			<div className="block_rxjs_subject">
			<h1>Публичная страница</h1>
			
			</div>
			<p>
			<Link to={"/"}>На главную</Link>
			</p>
			</div>
		</div>
		)
		
	}

}

class PrivateRoute extends Component{
  
  render(){
	  var PasserComponent = this.props.component;
	  return(
			<Route  render={(props) => (
				this.props.user !== null
				  ? <PasserComponent {...props} />
				  : <Redirect to='/restricted' />
			  )} />
	  )
  }
  
}


class App extends Component {
  
   
  render() {
	  console.log("this",this.props )
    return (
    <div className="App">
        <header className="App-header"> 
          <h1>
			ZK+
		  </h1> 
        </header> 
		<div> 
			{this.props.loading 
            ? <p>Loading...</p> 
            : this.props.error
                ? <p className="error">Error, try again</p>
                : <p><img src={this.props.url}/></p>}
			</div>
		<section>
			<Router> 
				<div> 
				<Switch>
					<Route exact path="/" component={()=>{return(<MainPage {...this.props} />)}} />
					<Route path="/registration" component={()=>{return (<Registration {...this.props}/>)}} /> 
					<Route path="/signin" component={()=>{return (<Logger {...this.props}/>)}} />
					<Route path="/resetpass" component={()=>{return (<RestorePass {...this.props} />)}} />
					<Route path="/restricted" component={()=>{return (<Restricted {...this.props} />)}} />
					<Route path="/public" component={()=>{return (<Public {...this.props}/>)}} />
					<Route path="/inputnewpass" component={()=>{return (<InputNewPass {...this.props}/>)}} />
					<PrivateRoute user={this.props.user} path='/protectedpage' component={()=>{return (<ProtectedMainPage  {...this.props}/>)}} />
					<PrivateRoute user={this.props.user} path="/usercabinet" component={()=>{return (<UserCabinet {...this.props}/>)}} />
					<Route path="*" component={()=>{return (<NotFound {...this.props}/>)}} />
				</Switch>
				</div>
			</Router>
		</section>
      </div>
    );
  }
}

export default App;
