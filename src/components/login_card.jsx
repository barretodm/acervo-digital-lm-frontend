import { Link } from 'react-router-dom';
import logo from '../assets/logo-lm-v3.png'

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col gap-4'>
        <div className='w-max mx-auto'>
          <img src={logo} alt="" className='h-18 w-auto'/>
        </div>
        <div className='p-4 sm:p-8 bg-white flex flex-col gap-6 h-100 md:h-110 w-70 sm:w-80 md:w-90 lg:w-100'>
            <div className='flex flex-col'>
              <span>
                  Acesso à galeria
              </span>
              <p className='text-sm'>Área exclusiva para o galerista.</p>
            </div>
            <form action="" className='flex flex-col flex-1 gap-4'>
              <div className='flex flex-col gap-3'>
                <label htmlFor="email" className='text-sm'>E-mail</label>
                <input type="email" id='email' placeholder='Digite seu email' className='p-4 bg-[#F5F3EF]'/>
              </div>
              <div className='flex flex-col gap-3'>
                <label htmlFor="password" className='text-sm'>Senha</label>
                <input type="password" id='password' placeholder='Digite sua senha' className='p-4 bg-[#F5F3EF]'/>
              </div>
              <button className='p-4 mt-auto w-auto bg-[#C41230] text-white'>Entrar</button>
            </form>

            <div>
              <Link to="/">Retornar à página principal</Link>
            </div>
        </div>
    </div>
    
  );
}

export default Login;
