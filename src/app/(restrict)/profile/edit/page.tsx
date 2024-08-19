"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/hooks/useUserData';
import PersonalInfoForm from './components/PersonalInfoForm';
import PhoneUpdateForm from './components/PhoneUpdateForm';
import EmailUpdateForm from './components/EmailUpdateForm';
import SecurityForm from './components/SecurityForm';
import ProfilePictureForm from './components/ProfilePictureForm';

export default function EditProfile() {
  const { userData, saveUserData } = useUserData();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personalInfo');

  const handleSave = async (formData: FormData) => {
    const result = await saveUserData(formData);
    if (result?.success) {
      router.push('/profile');  // Redirecionar para a página de perfil
    }
  };

  const handlePictureSave = async (file: File | null) => {
    const formData = new FormData();
    if (file) {
      formData.append('foto', file);
    } else {
      formData.append('foto', ''); // Para enviar um valor vazio quando a foto for removida
    }
    await handleSave(formData);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <button
          className="text-gray-500 hover:text-gray-700 mb-4"
          onClick={handleBackClick}
        >
          ← Voltar
        </button>

        {/* Foto de Perfil */}
        <div className="text-center mb-6">
         
          <ProfilePictureForm onSave={handlePictureSave} />
        </div>

        {/* Abas */}
        <div className="mb-4 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px justify-center">
            <li className="mr-2">
              <button
                className={`${
                  activeTab === 'personalInfo'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent'
                } inline-block p-4 rounded-t-lg border-b-2`}
                onClick={() => setActiveTab('personalInfo')}
              >
                Informações Pessoais
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`${
                  activeTab === 'phone'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent'
                } inline-block p-4 rounded-t-lg border-b-2`}
                onClick={() => setActiveTab('phone')}
              >
                Telefone
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`${
                  activeTab === 'email'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent'
                } inline-block p-4 rounded-t-lg border-b-2`}
                onClick={() => setActiveTab('email')}
              >
                Email
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`${
                  activeTab === 'security'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent'
                } inline-block p-4 rounded-t-lg border-b-2`}
                onClick={() => setActiveTab('security')}
              >
                Segurança
              </button>
            </li>
          </ul>
        </div>

        {/* Conteúdo das Abas */}
        <div>
          {activeTab === 'personalInfo' && <PersonalInfoForm onSave={handleSave} />}
          {activeTab === 'phone' && <PhoneUpdateForm onSave={handleSave} />}
          {activeTab === 'email' && <EmailUpdateForm onSave={handleSave} />}
          {activeTab === 'security' && <SecurityForm onSave={handleSave} />}
        </div>
      </div>
    </div>
  );
}
