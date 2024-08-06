import React, { useState, useEffect } from "react";
import './App.css';
import Header from './Header';
import Post from './Post';
import Login from './login';
import Register from './register';
import PostModal from './postModal'; // Importa el nuevo componente Modal
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [posts, setPosts] = useState([
    {
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFrcsPDCAiz8MVqAb4psCnw1Arp3uXbVhKA&s",
      username: "Clisdermar",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      imageSrc: "https://codigoonclick.com/wp-content/uploads/2017/11/editores-codigo-javascript.jpg",
      username: "Clisdermar",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      imageSrc: "https://www.vtv.gob.ve/wp-content/uploads/2023/07/rio-bravo-muro-flotante.jpg",
      username: "Clisdermar",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleRegister = (name, surname, username, password) => {
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert("Username already exists. Please choose a different username.");
      return;
    }
    const newUser = { name, surname, username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setIsRegistering(false);
    alert("Registration successful. Please log in.");
  };

  const handleLogin = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setUser(username);
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleAddPost = (imageSrc, caption) => {
    const newPost = { imageSrc, username: user, caption };
    setPosts([newPost, ...posts]); // Agregar al inicio de la lista
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Header />
          <button onClick={() => setIsModalOpen(true)}>Create New Post</button>
          {posts.map((post, index) => (
            <Post 
              key={index}
              imageSrc={post.imageSrc}
              username={post.username}
              caption={post.caption}
              currentUsername={user}
            />
          ))}
          <PostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddPost={handleAddPost}
          />
        </>
      ) : isRegistering ? (
        <Register onRegister={handleRegister} onToggle={() => setIsRegistering(!isRegistering)} />
      ) : (
        <Login onLogin={handleLogin} onToggle={() => setIsRegistering(!isRegistering)} />
      )}
    </div>
  );
}

export default App;
