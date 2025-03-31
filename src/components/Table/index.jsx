import React, { useState } from 'react';
import { FaEye, FaTrashAlt, FaUserSlash, FaRedo } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './table.style.css';
import { Dialog } from '../Dialog';
import { Toasts } from '../Toasts';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Table = ({ users, openModal, handleDelete }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const pageCount = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDialog = async (confirm) => {
    if (confirm) {
      await handleDelete(userToDelete);
      setShowToast(true);
      setUserToDelete(null);
    }
    setShowDialog(false);
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDialog(true);
  };

  const renderStatusBadge = (status) => (
    <span className={`status-${status === 'Ativo' ? 'active' : 'inactive'}`}>
      {status}
    </span>
  );

  const renderActions = (user) => (
    <div className="table-actions">
      <button
        className="icon-tabela icon-tabela-visualizar"
        onClick={() => openModal(user)}
        aria-label="Visualizar usuário"
      >
        <FaEye />
      </button>
      <button
        className="icon-tabela icon-tabela-deletar"
        onClick={() => handleDeleteClick(user.id)}
        aria-label="Excluir usuário"
      >
        <FaTrashAlt />
      </button>
    </div>
  );

  const handleRefresh = () => {
    // Lógica para recarregar os usuários ou limpar a busca
    window.location.reload(); // Ou implemente sua própria lógica de refresh
  };

  return (
    <>
      <div className="table-container">
        <div className="table-responsive-wrapper">
          {users.length === 0 ? (
            <div className="empty-state-container">
              <div className="empty-state-content">
                <div className="empty-state-icon">
                  <FaUserSlash />
                </div>
                <h3 className="empty-state-title">Nenhum usuário encontrado</h3>
                <p className="empty-state-message">
                  Não encontramos resultados correspondentes à sua pesquisa.
                  <br />
                  Tente ajustar os critérios de busca ou recarregar os dados.
                </p>
                <button 
                  className="empty-state-button"
                  onClick={handleRefresh}
                >
                  <FaRedo className="button-icon" />
                  Recarregar dados
                </button>
              </div>
            </div>
          ) : (
            <>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th className="campo-email">Email</th>
                    <th>CPF</th>
                    <th className="campo-uf">UF</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="nome-usuario">{user.nome}</td>
                      <td className="campo-email">{user.email}</td>
                      <td>{user.cpf}</td>
                      <td className="campo-uf">{user.uf}</td>
                      <td>{renderStatusBadge(user.situacao)}</td>
                      <td>{renderActions(user)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                containerClassName="pagination-container"
                activeClassName="active"
                previousLabel={<FiChevronLeft className="custom-arrow" />}
                nextLabel={<FiChevronRight className="custom-arrow" />}
                breakLabel={<span className="mx-1">...</span>}
              />
            </>
          )}
        </div>
      </div>

      <Dialog
  show={showDialog}
  onHide={() => setShowDialog(false)}
  onConfirm={() => handleDialog(true)}
  message={
    <>
      <p style={{marginTop: '0.5rem' }}>
        <strong>Exclusão definitiva do usuário</strong>
      </p>
      <p style={{fontSize: '0.9rem'}}>
        Todos os dados, histórico e registros associados serão permanentemente removidos do sistema.
      </p>
    </>
  }
/>

      <Toasts
        show={showToast}
        onClose={() => setShowToast(false)}
        message="Usuário removido com sucesso!"
        duration={3000}
      />
    </>
  );
};