import { useCallback, useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

import { useNotifications } from '../../hooks/notifications'
import api from '../../services/api'
import { Container, Content, IconButton } from './styles'

const TaskSchema = Yup.object().shape({
  name: Yup.string()
    .required('O nome da tarefa não pode ficar vazio')
});

const Task = ({taskId, deleteTask}) => {
  const { addNotification } = useNotifications()

  const [taskData, setTask] = useState()
  const [visible, setVisible] = useState(false)

  const getTask = useCallback(async () => {
    const result = await api.get(`/tasks/${taskId}`)
    setTask(result.data.task)
  }, [taskId])

  const handleUpdateTask = useCallback(async (values) => {
    try{
      await api.put('/tasks', {
        title: values.title,
        id: taskId
      })

      addNotification({
        type: 'success',
        title: 'tarefa atualizada com sucesso'
      })
  
      await getTask()
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'não foi possível atualizar o nome',
        description: err
      })
    } finally {
      setVisible(false)
    }
  }, [taskId, getTask, addNotification])

  const handleFinishTask = useCallback(async () => {
    await api.put(`/tasks/finish/${taskId}`)
    await getTask()
  }, [taskId, getTask])

  useEffect(() => {
    getTask()
  }, [getTask])

  return (
    <Container>
      {taskData && (
        <Content>

          <IconButton
            type="button"
            onClick={handleFinishTask}
          >
            <BsFillCheckCircleFill size={20} />
          </IconButton>

          <Formik
            initialValues={{
              name: taskData.title,
            }}
            validationSchema={TaskSchema}
            onSubmit={values => handleUpdateTask(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <Field 
                  name="title" 
                  type="title" 
                  placeholder="Nome da task" 
                  onFocus={() => setVisible(true)}
                />
                {errors.title && touched.title ? <div>{errors.title}</div> : null}

                {visible && (
                  <button type="submit">salvar atualização</button>
                )}
              </Form>
            )}
          </Formik>

          <IconButton
            type="button"
            onClick={() => deleteTask(taskId)}
            disabled={taskData.status === 'DONE'}
          >
            <BsFillTrashFill size={20} />
          </IconButton>

          {/* <p>{taskData.status}</p> */}

        </Content>
      )}
    </Container>
  )
}

export default Task