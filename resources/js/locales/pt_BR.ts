export default {
  home: {
    lang: {
      en: 'English',
      pt_BR: 'Português do Brasil'
    },
    login: 'Entrar',
    logged: 'Perfil',
    interactive: {
      title: 'Virtual Tabletop',
      description:
        'Crie e se divirta em mundos fantásticos com seus amigos de forma totalmente gratúita!'
    }
  },
  auth: {
    login: {
      name: 'Entrar',
      email: {
        label: 'Email',
        placeholder: 'Digite seu email...'
      },
      password: {
        label: 'Senha',
        placeholder: 'Digite sua senha...'
      }
    },
    register: {
      name: 'Registrar',
      user: {
        label: 'Usuário',
        placeholder: 'Digite um nome de usuário...'
      },
      email: {
        label: 'Email',
        placeholder: 'Digite um email válido...'
      },
      password: {
        label: 'Senha',
        placeholder: 'Digite uma senha...'
      }
    },
    button: 'Cadastrar',
    toast: {
      emailLogin: 'Email é inválido!',
      passwordLogin: 'Senha é necessária!',
      userRegister: 'Usuário é necessário e precisa ter menos que 20 caracteres!',
      emailRegister: 'Email é inválido!',
      passwordRegister: 'Senha é necessário!',
      successLogin: 'Seja Bem-Vindo(a) {user}',
      errorLogin: 'Verifique se as credenciais estão corretas!',
      successRegister: 'Registrado com Sucesso!',
      errorRegister: 'Não foi possível registrar o usuário'
    }
  },
  campaign: {
    preview: {
      delete: 'Você quer deletar essa cena?',
      deleteWrongScene:
        'Não é possível deletar uma cena que está ativa no momento.'
    },
    chat: {
      rules: {
        commandGMMessage: 'Por favor não me mate ;-;'
      },
      control: {
        token: 'Tokens Controlados'
      },
      bookmark: {
        plugins: 'Plugins Adicionais',
        resource: 'Recursos'
      },
      message: {
        error: {
          NaN: 'Verifique como tentou executar o comando, inclusive os espaços! Exemplo Válido: /r 1d20 + 2d8 + 4 - 5'
        }
      }
    }
  },
  profile: {
    exit: 'Sair',
    user: {
      name: 'Nome',
      email: 'Email',
      created: 'Criado Em',
      vip: {
        default: 'Conta Premium',
        yes: 'Sim',
        no: 'Não'
      }
    },
    campaigns: {
      default: 'Campanhas',
      null: 'Você ainda não está em nenhuma campanha.'
    }
  },
  generics: {
    toast: {
      success: 'Criado com Sucesso!',
      delete: 'Deletado com Sucesso!',
      put: 'Alterado com Sucesso!',
      error: 'Um Erro Inesperado Ocorreu! :('
    }
  }
}
