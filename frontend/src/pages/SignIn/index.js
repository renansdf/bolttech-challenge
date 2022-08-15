import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

import { useAuth } from '../../hooks/authentication'
import { useNotifications } from '../../hooks/notifications'

import { Container, Content, FormContent, AppInformation } from './styles'

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(4, 'A senha precisa ter mais de 4 caracteres')
    .max(20, 'A senha precisa ter menos de 20 caracteres')
    .required('A senha é obrigatória')
});

const SignIn = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const handleSubmit = async (formValues) => {
    try{
      await signIn({
        email: formValues.email,
        password: formValues.password
      })

      addNotification({
        type: 'success',
        title: 'login realizado com sucesso'
      })

      navigate('/dashboard')
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'erro ao fazer login',
        message: 'email e/ou senha inválidos'
      })
    }
  }

  return (
    <Container>
      <Content>
        <h1>Sign In</h1>
        <AppInformation>
          A demonstração a seguir contem as seguintes funcionalidades:
        </AppInformation>

        <AppInformation>
          - criação, deleção e atualização de cards de projetos
        </AppInformation>

        <AppInformation>
          - cada projeto pode ter um número ilimitado de tarefas associadas a ele
        </AppInformation>

        <AppInformation>
          - as tarefas podem ser marcadas como concluídas, além de deletadas e atualizadas
        </AppInformation>
      </Content>

      <FormContent>
        <h2>Faça login para continuar</h2>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SigninSchema}
          onSubmit={values => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email" type="email" placeholder="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              <Field name="password" placeholder="senha" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}

              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>

        <Link to="/sign-up"> ou crie uma conta</Link>
      </FormContent>
    </Container>
  )
}

export default SignIn