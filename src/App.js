import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import './App.css'
import api from './services/api'
/* Conceitos Importante
    Componente 
    Propriedade = Pai para filho
    Estado & Imutabilidade
*/

/* 
    useState retorna um array com 2 posições
    1.Variavel com seu valor inicial
    2.FUnção para atualizar
    */

function App() {
    const [projects, setProjects] = useState([])
    
    async function handleAddProject() {
      const response = await  api.post('/projects',{
            title: "Novo Projeto: "+Date.now(),
            owner: 'Eu mesmo'
        })
        const project = response.data
        setProjects([...projects,project])
    }
    useEffect(()=>{
        api.get('projects').then(response=>{
            setProjects(response.data)
        })
    },[])

    return (<>


        <Header title="Projects" />
        <ul>
        </ul>
            {projects.map(project => <li key={project.id}>{project.title}</li>)}


        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
    )
}

export default App