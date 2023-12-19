const isJWT = (jwt) => {
    let jwtSplitted = jwt.split(".")
    if (jwtSplitted.length !== 3) {
      return false
    }
    if (!jwt.startsWith('Bearer')) {
      return false
    }
    return true;
  }

export const validateJWT = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const env = localStorage.getItem('env')
    if (!token[env]) {
        let e = new Error('Primero debes cargar un token para realizar la busqueda!')
        throw e
    }
    if (!isJWT(token[env])) {
        let e = new Error('El token cargado no tiene un formato valido!')
        throw e
    }
    return token[env]
}