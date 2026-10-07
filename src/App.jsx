import { Routes, Route } from 'react-router-dom';

import Header from './components/header.jsx'
import Card from './components/card.jsx'
import galoAldemir from './assets/galo-aldemir.jpg'
import galoDois from './assets/galo-dois.jpg'
import galoTres from './assets/galo-tres.jpg'
import Main from './components/main.jsx'
import GridContainer from './components/grid'
import Footer from './components/footer.jsx'
import logo from './assets/logo-lm-v3.png'
import Login from './components/login_card.jsx'
import Faixa from './components/faixa_titulo.jsx';
import Detalhe from './components/obra_detalhes.jsx';

function App() {
  return (
    <>
        
        <Routes>
          
          <Route path="/" element={

            <> 
              <div className='flex flex-col h-screen'>
                  <Header img={logo}/>
                    <Faixa></Faixa>
                      <Main>
                        <GridContainer>
                            <Card img={galoAldemir} artista="Aldemir Martins" tecnica="Óleo sobre tela" ano="1972"/>
                            <Card img={galoDois} artista="Aldemir Martins" tecnica="Óleo sobre tela" ano="1984"/>
                            <Card img={galoTres} artista="Aldemir Martins" tecnica="Óleo sobre tela" ano="1953"/>
                          </GridContainer> 
                      </Main>    
                  <Footer img={logo}/>
              </div>
              
            </>
            
            
            
            
          } />

          <Route path="/login" element={
            <div className="flex min-h-screen items-center justify-center bg-[#F5F3EF] p-4">
              <Login />
            </div>
          } />

          <Route path="/obra" element={
              <div className="flex min-h-screen flex-col">
                <Header img={logo}/>
                  <Main>
                    <Detalhe/>
                  </Main>
                <Footer img={logo}/>
              </div>
          } />
          
        </Routes>
      
    </>
  )
}

export default App;

