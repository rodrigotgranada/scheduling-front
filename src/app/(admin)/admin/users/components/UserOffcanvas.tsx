import React, { useState, useEffect } from "react";
import UserDetailsView from "./view/UserDetailsView";
import { User } from "../../hooks/useUsers";
import UserDetailsEditForm from "./edit/UserDetailsEditForm";
import UserPhoneUpdateForm from "./edit/UserPhoneUpdateForm";
import UserEmailUpdateForm from "./edit/UserEmailUpdateForm";
import UserSecurityForm from "./edit/UserSecurityForm";
import UserProfilePictureForm from "./edit/UserProfilePictureForm"; // Importando o formulário de foto

interface UserOffcanvasProps {
  user: User | null;
  onClose: () => void;
  onSave: (userId: string, formData: FormData) => void;
}

const UserOffcanvas: React.FC<UserOffcanvasProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("view");

  useEffect(() => {
    if (user) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [user]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setActiveTab("personalInfo"); // Muda para a aba de edição de informações pessoais por padrão
  };

  const handleSave = (formData: FormData) => {
    if (user) {
      onSave(user.id, formData);
      setIsEditing(false);
      setActiveTab("view"); // Volta para a visualização após salvar
    }
  };

  const handleSavePicture = (file: File | null) => {
    const formData = new FormData();
    if (file) {
      formData.append("foto", file);
    } else {
      formData.append("foto", ""); // Para remover a foto
    }
    handleSave(formData);
  };

  if (!user) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 999 }}
        onClick={onClose}
      ></div>

      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        style={{ zIndex: 1000 }}
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do offcanvas
      >
        <div className="flex justify-between items-center p-4">
          <h5 className="text-lg font-semibold">
            {isEditing ? "Editar Usuário" : "Detalhes do Usuário"}
          </h5>
          <button onClick={onClose} className="text-black">
            &times;
          </button>
        </div>
        <div className="mt-4 p-4">
          {!isEditing ? (
            <UserDetailsView user={user} onEdit={handleToggleEdit} />
          ) : (
            <div>
              {/* Formulário para editar foto */}
              <UserProfilePictureForm
                firstName={user.firstName}
                lastName={user.lastName}
                initialFoto={user.foto}
                onSave={handleSavePicture}
              />
              {/* Menu de abas de edição */}
              <div className="mb-4 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px justify-center">
                  <li className="mr-2">
                    <button
                      className={`${
                        activeTab === "personalInfo"
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-500 border-transparent"
                      } inline-block p-4 rounded-t-lg border-b-2`}
                      onClick={() => setActiveTab("personalInfo")}
                    >
                      Informações Pessoais
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      className={`${
                        activeTab === "phone"
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-500 border-transparent"
                      } inline-block p-4 rounded-t-lg border-b-2`}
                      onClick={() => setActiveTab("phone")}
                    >
                      Telefone
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      className={`${
                        activeTab === "email"
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-500 border-transparent"
                      } inline-block p-4 rounded-t-lg border-b-2`}
                      onClick={() => setActiveTab("email")}
                    >
                      Email
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      className={`${
                        activeTab === "security"
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-500 border-transparent"
                      } inline-block p-4 rounded-t-lg border-b-2`}
                      onClick={() => setActiveTab("security")}
                    >
                      Segurança
                    </button>
                  </li>
                </ul>
              </div>

              {/* Conteúdo das abas de edição */}
              {activeTab === "personalInfo" && (
                <UserDetailsEditForm user={user} onSave={handleSave} />
              )}
              {activeTab === "phone" && (
                <UserPhoneUpdateForm user={user} onSave={handleSave} />
              )}
              {activeTab === "email" && (
                <UserEmailUpdateForm user={user} onSave={handleSave} />
              )}
              {activeTab === "security" && (
                <UserSecurityForm user={user} onSave={handleSave} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserOffcanvas;
