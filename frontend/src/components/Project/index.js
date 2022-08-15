import { Field, Form, Formik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'

import { useProjects } from '../../hooks/projects'
import { useNotifications } from '../../hooks/notifications'
import api from '../../services/api'
import Task from '../Task'

import { Container, DeleteProject, AdicionarTarefa } from './styles'

const ProjectSchema = Yup.object().shape({
  name: Yup.string()
    .required('O nome do projeto não pode ficar vazio')
});

const Project = ({projectId}) => {
  const { updateProject, projects, deleteProject } = useProjects()
  const { addNotification } = useNotifications()

  const [project, setProject] = useState()
  const [tasks, setTasks] = useState()
  const [visibility, setVisibility] = useState(false)

  const getData = useCallback(async () => {
    const result = await api.get(`/projects/${projectId}`)
    setProject(result.data.project)
  }, [projectId])

  const getTasks = useCallback(async () => {
    const result = await api.get(`/tasks/project/${projectId}`)
    setTasks(result.data.tasks)
  }, [projectId])

  const handleUpdateProject = useCallback(async (values) => {
    try{
      await updateProject(projectId, values.name)
      addNotification({
        type: 'success',
        title: 'projeto atualizado com sucesso'
      })
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'não foi possível atualizar o nome',
        description: err
      })
    } finally {
      setVisibility(false)
    }
  }, [projectId, updateProject, addNotification])

  const handleDeleteProject = useCallback(async () => {
    await deleteProject(projectId)
  }, [projectId, deleteProject])

  const handleAddTask = useCallback(async () => {
    await api.post('/tasks',{
      title: 'nova tarefa',
      projectid: projectId
    })

    await getTasks()
  }, [projectId, getTasks])

  const handleDeleteTask = useCallback(async (taskId) => {
    await api.delete(`/tasks/${taskId}`)
    await getTasks()
  }, [getTasks])

  useEffect(() => {
    getTasks()
  }, [getTasks])

  useEffect(() => {
    getData()
  }, [projects, getData])

  return (
    <Container>
      {project && (
        <Formik
          initialValues={{
            name: project.name,
          }}
          validationSchema={ProjectSchema}
          onSubmit={values => handleUpdateProject(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field 
                name="name" 
                type="name" 
                placeholder="Nome do projeto" 
                onFocus={() => setVisibility(true)}
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}

              {visibility && (
                <button type="submit">salvar atualização</button>
              )}
            </Form>
          )}
        </Formik>
      )}

      <DeleteProject 
        type="button" 
        onClick={handleDeleteProject}
        disabled={tasks && tasks.length > 0}
      >
        Deletar projeto
      </DeleteProject>

      {tasks && tasks.map(task => (
        <Task key={task.id} taskId={task.id} deleteTask={handleDeleteTask} />
      ))}

      <AdicionarTarefa 
        type="button" 
        onClick={handleAddTask}
      >
        Adicionar tarefa
      </AdicionarTarefa>
    </Container>
  )
}

export default Project