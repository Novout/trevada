export default {
  home: {
    lang: {
      en: 'English',
      pt_BR: 'Português do Brasil'
    },
    login: 'Login',
    logged: 'Profile',
    interactive: {
      title: 'Virtual Tabletop',
      description:
        'Create and enjoy fantastic worlds with your friends for free!'
    }
  },
  auth: {
    login: {
      name: 'Sign In',
      email: {
        label: 'Email',
        placeholder: 'Enter your email...'
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password...'
      }
    },
    register: {
      name: 'Register',
      user: {
        label: 'User',
        placeholder: 'Example: Guest10234'
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your valid email...'
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password'
      }
    },
    button: 'Enter',
    toast: {
      emailLogin: 'Email is invalid!',
      passwordLogin: 'Password is required!',
      userRegister: 'User is required and must be less than 20 characters!',
      emailRegister: 'Email is invalid!',
      passwordRegister: 'Password is required!',
      successLogin: 'Welcome {user}!',
      errorLogin: 'Make sure your credentials are correct!',
      successRegister: 'Successfully registered!',
      errorRegister: 'Could not register user!'
    }
  },
  campaign: {
    preview: {
      delete: 'Do you want delete this scene?',
      deleteWrongScene:
        'It is not possible to delete a scene that is currently active.'
    },
    chat: {
      rules: {
        commandGMMessage: "Please don't kill me ;-;"
      },
      control: {
        token: 'Controlled Tokens'
      },
      bookmark: {
        plugins: 'Plugins',
        resource: 'Resources'
      },
      message: {
        error: {
          NaN: 'Check how you tried to execute the command, including the spaces! Valid Example: /r 1d20 + 2d8 + 4 - 5'
        }
      }
    }
  },
  profile: {
    exit: 'Exit',
    user: {
      name: 'Name',
      email: 'Email',
      created: 'Created At',
      vip: {
        default: 'Premium Account',
        yes: 'Yes',
        no: 'No'
      }
    },
    campaigns: {
      default: 'Campaigns',
      null: 'You are not in any campaigns yet.'
    }
  },
  generics: {
    toast: {
      success: 'Successfully Created!',
      delete: 'Successfully Deleted!',
      put: 'Successfully Changed!',
      error: 'An Unexpected Error Occurred! :('
    }
  }
}
