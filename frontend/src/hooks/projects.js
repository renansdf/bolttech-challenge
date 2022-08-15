import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const ProjectsContext = createContext()

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const result = await api.get('/projects/user')
    setProjects(result.data.projects)
  }

  const addProject = async () => {
    await api.post('/projects',{
      name: 'Novo Projeto'
    })

    await getProjects()
  }

  const updateProject = async (projectId, newProjectName) => {
    await api.put('/projects', {
      id: projectId,
      name: newProjectName
    })

    await getProjects()
  }

  const deleteProject = async (projectId) => {
    await api.delete(`/projects/${projectId}`)

    await getProjects()
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      addProject, 
      updateProject, 
      deleteProject,
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}

function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects precisa ser usado dentro de seu provider');
  }

  return context;
}

export { useProjects, ProjectsProvider }
