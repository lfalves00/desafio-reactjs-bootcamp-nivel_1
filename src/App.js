import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: `https://github.com/Rocketseat/repository${Date.now()}`,
      techs: ["Node", "ReactJS", "React Native"]
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const repo = response.data;
    const indexRepo = repositories.findIndex(repo=> repo.id === id);
    repositories.splice(indexRepo, 1);
    setRepositories([...repositories]);
  }

 return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(repo=><li key={repo.id}>{repo.title} 
          <button onClick={() => handleRemoveRepository(`${repo.id}`)} key={repo.id}>
           Remover 
          </button><input type="hidden" value={repo.id}/>
        </li>)}      
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
