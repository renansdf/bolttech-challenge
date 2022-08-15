import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

import api from '../../services/api'
import { useNotifications } from '../../hooks/notifications'

import { Container, Content, FormContent } from './styles'

const SignUpSchema = Yup.object().shape({
  full_name:Yup.string()
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(4, 'A senha precisa ter mais de 4 caracteres')
    .max(20, 'A senha precisa ter menos de 20 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas precisam ser identicas.'),
});

const SignUp = () => {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const handleSubmit = (formValues) => {
    try{
      api.post('/users', {
        full_name: formValues.full_name,
        email: formValues.email,
        password: formValues.password
      })

      addNotification({
        type: 'success',
        title: 'usuário criado com sucesso',
      })

      navigate('/')
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'não foi possível criar o usuário',
        description: err
      })
    }
  }

  return (
    <Container>

      <Content>
        <h1>Sign Up</h1>
      </Content>

      <FormContent>
        <Formik
          initialValues={{
            full_name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={values => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="full_name" type="text" placeholder="Nome Completo" />
              {errors.full_name && touched.full_name ? <div>{errors.full_name}</div> : null}

              <Field name="email" type="email" placeholder="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              <Field name="password" placeholder="senha"  />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}

              <Field name="confirmPassword" placeholder="confirme sua senha"  />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}

              <button type="submit">Criar Usuário</button>
            </Form>
          )}
        </Formik>
      </FormContent>
    </Container>
  )
}

export default SignUp