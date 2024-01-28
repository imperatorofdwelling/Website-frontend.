'use client'

import useRegisterModal from '@hooks/useRegisterModal'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FaYandex } from 'react-icons/fa'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/hooks/useLoginModal'

const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((error) => {
        toast.error('Что-то пошло не так')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Добро пожаловать в Imperator Of Dwelling"
        subtitle="Вход в аккаунт"
        center
      />
      <Input
        id="email"
        type="email"
        label="Почта"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Пароль"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Войти с помощью Yandex"
        icon={FaYandex}
        onClick={() => {}}
      />
      <Button
        outline
        label="Войти с помощью Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Войти с помощью Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center flex-row items-center gap-2">
          <div>Уже зарегестрированы?</div>
          <div
            className="text-black cursor-pointer hover:underline transition"
            onClick={loginModal.onClose}
          >
            Войти
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Войти"
      actionLabel="Продолжить"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
