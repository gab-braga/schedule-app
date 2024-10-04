import './style.css';

export default () => {
  return (
    <div className="login">
      <form className="form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" />
        </div>
        <button type="submit">Entrar</button>
        <button type="button">Google</button>
      </form>
    </div>
  );
};
