import { useNotifications } from '../../hooks/notifications'
import Project from '../../components/Project'
import { useProjects } from '../../hooks/projects'

import { Container, ProjectsContainer, ProjectButton } from './styles'

const Dashboard = () => {
  const { addNotification } = useNotifications()
  const { projects, addProject } = useProjects()

  const handleAddProject = async () => {
    try{
      await addProject()
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'ocorreu um erro ao criar o projeto.',
        description: err
      })
    }
  }

  return (
    <Container>
      <h1>Sua lista de projetos</h1>

      <ProjectsContainer>
        {projects && projects.map(project => (
          <Project 
            key={project.id} 
            projectId={project.id} 
          />
        ))}

        <ProjectButton type="button" onClick={handleAddProject}>criar novo projeto</ProjectButton>
      </ProjectsContainer>

    </Container>
  )
}

export default Dashboard