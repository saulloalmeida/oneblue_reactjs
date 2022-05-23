import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Alert } from "./Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../services/api";
interface IFormInputs {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Preenchimento do email é obrigatório"),
  password: yup.string().required("Preenchimento da senha é obrigatório"),
}).required();

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  
  async function onSubmit(data: IFormInputs) {
    await api.post('/login',{
      name:data.email,
      password:data.password
    }).then((res)=>console.log("ok",res))
  } 
  const emailError = errors.email?.message
  const passwordError = errors.password?.message
  
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src="https://oneblue.io/wp-content/uploads/2022/03/oneblue-500-01-01.png"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
          Entre com suas credenciais
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {(errors.email || errors.password) && <Alert emailError={emailError} passwordError={passwordError}/>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                {...register("email")} 
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-800 focus:border-sky-800 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                {...register("password")} 
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-800 focus:border-sky-800 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-800"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Ou se cadastre abaixo
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col">
              <div>
                <Link to="/cadastro">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-800 bg-sky-200 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-800"
                >
                  Cadastre-se
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}