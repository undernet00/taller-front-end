function Login() {


  return (
    <div>
      <label htmlFor="user">Usuario</label>
      <br></br>
      <input type="text" id="user" name="user" />
      <br></br>
      <label htmlFor="password">Contraseña</label>
      <br></br>
      <input type="text" id="password" name="password" />
      <br></br>
      <button>Login</button>
      <br></br>
      <a>¿Nuevo en el sistema? Regístrate aquí</a>
    </div>
  );
}
    
export default Login;
