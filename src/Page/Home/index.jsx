import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { loadUsers } from '../../action/load-users';
import { removeUsers } from '../../action/remove-users';
import { Table } from '../../components/Table';
import { SearchUsers } from '../../components/SearchUsers';
import { Toasts } from '../../components/Toasts';
import ModalOpen from '../../components/ModalOpen';
import { MyButton } from '../../components/MyButton';
import Menu from '../../components/Navbar';
import Footer from '../../components/Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchValue: '',
      userClicked: null,
      modal: false,
      message: '',
      showToast: false,
    };
  }

  async componentDidMount() {
    // Carrega usuários ao montar o componente
    await this.loadUsers();
  }

  handleModalClose = () => {
    // Fecha a modal e recarrega os usuários
    this.setState({ modal: false, userClicked: null });
    this.loadUsers();
  };

  loadUsers = async () => {
    // Carrega usuários e atualiza o estado
    const users = await loadUsers();
    this.setState({
      users: users,
    });
  };

  openModal = async (user = null) => {
    // Abre a modal com um usuário específico (pode ser nulo)
    this.setState({
      userClicked: user,
      modal: true,
    });
  };

  closeModal = async () => {
    // Fecha a modal e limpa o estado
    this.setState({
      userClicked: null,
      modal: false,
    });
    this.handleModalClose();
  };

  handleChange = (e) => {
    // Atualiza o estado com o valor da busca
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  handleDelete = async (userId) => {
    try {
      // Tenta remover um usuário
      const { success, message } = await removeUsers(userId);
      if (success) {
        // Se removido com sucesso, recarrega os usuários
        this.loadUsers();
        this.setState({
          message: 'Usuário removido com sucesso!',
          showToast: true,
        });
      } else {
        this.setState({
          message: `Erro ao remover usuário: ${message}`,
          showToast: true,
        });
      }
    } catch (error) {
      this.setState({
        message: `Erro ao remover usuário: ${error}`,
        showToast: true,
      });
    }
  };

  render() {
    const { users, searchValue, modal, userClicked, showToast, message } = this.state;

    // Filtra usuários com base na busca
    const filteredUsers = !!searchValue
      ? users.filter((user) => {
        const search = searchValue.toLowerCase();
        const formattedSearch = search.replace(/[^\w\s]/gi, '');
        const isMatchingName = user.nome.toLowerCase().includes(formattedSearch);
        const isMatchingCpf = user.cpf.replace(/[^\d]/g, '').includes(formattedSearch);
        return isMatchingName || isMatchingCpf;
      })
      : users;

    return (
      <div className="App">
        <Menu />
        <div className="search-container">
          <SearchUsers searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {/* Botão para adicionar usuário */}
        <div className="container">
          <div className="button-add">
            <MyButton functionClicked={() => this.openModal()} color={'danger'} nameButton={'Adicionar Usuário'} />
          </div>
        </div>

        <div className="container">
          <div className="container-table">
            <div className="table">
              {filteredUsers.length > 0 ? (
                // Renderiza a tabela se houver usuários filtrados
                <Table users={filteredUsers} openModal={this.openModal} handleDelete={this.handleDelete} />
              ) : (
                // Exibe uma mensagem se não houver usuários filtrados
                <div className="no-user">
             
             <svg 
  className="no-user-icon" 
  width="80" 
  height="80" 
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
    fill="var(--supernova)"
    style={{
      opacity: 0.2,
      animation: 'animacao-no-user 2s infinite ease-in-out'
    }}
  />
  <path
    d="M11 7H13V13H11V7ZM11 15H13V17H11V15Z"
    fill="var(--supernova)"
    style={{
      animation: 'no-user-animacao 2s infinite ease-in-out',
      transformOrigin: 'center'
    }}
  />
</svg>
                
                <h1 className='titulo-noUser'>Usuário não encontrado</h1>
                
                <p>
                  Não encontramos resultados para "<strong>{this.state.searchValue}</strong>".<br />
                  Verifique a ortografia ou tente termos diferentes.
                </p>
                
                <button 
                  className="action-button"
                  onClick={() => {
                    this.setState({ searchValue: '' });
                    // Efeito de clique premium
                    const button = document.querySelector('.action-button');
                    button.style.animation = 'none';
                    void button.offsetWidth; // Trigger reflow
                    button.style.animation = 'ripple 0.6s ease-out';
                  }}
                >
                  Limpar Busca
                 
                </button>
              </div>
              )}

            </div>

            <div className="container-modal">
              {/* Renderiza a modal se modal estiver aberta e há um usuário clicado */}
              {modal && userClicked && <ModalOpen userClicked={userClicked} closeModal={this.closeModal} />}

              {/* Renderiza a modal se modal estiver aberta e não há usuário clicado */}
              {modal && !userClicked && <ModalOpen closeModal={this.closeModal} />}

              {/* Exibe toasts para mensagens */}
              <Toasts show={showToast} onClose={() => this.setState({ showToast: false })} message={message} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
