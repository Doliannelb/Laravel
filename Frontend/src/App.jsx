import PostManager from './components/postManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Application Fullstack (React + Laravel)</h1>
          <p>Gestion complète des articles avec un CRUD</p>
        </div>
      </header>

      <main className="app-main">
        <PostManager />
      </main>

      <footer className="app-footer">
        <p>💻 Backend Laravel + ⚛️ Frontend React</p>
        <p>Développé par le Group 7 de technologie Web et Application</p>
      </footer>
    </div>
  );
}

export default App;