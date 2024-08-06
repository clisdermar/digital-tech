import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Post from './Post'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Post imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFrcsPDCAiz8MVqAb4psCnw1Arp3uXbVhKA&s" username = "Clisdermar" caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
      <Post imageSrc="https://codigoonclick.com/wp-content/uploads/2017/11/editores-codigo-javascript.jpg" username = "Clisdermar" caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
      <Post imageSrc="https://www.vtv.gob.ve/wp-content/uploads/2023/07/rio-bravo-muro-flotante.jpg" username = "Clisdermar" caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
     
    </div>
  );
}

export default App;
