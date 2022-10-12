const Session = function(name) {    
    const login = async ({email, password}) => {

        try {
            const resposta = await API.post(name, { email, password })
            if (resposta.data.token) {
                Data.saveToken(resposta.data.token);
                window.location.replace("http://localhost:8080");
                NoticeAlert.flash({msg: resposta.data.message, type: 'success'});
            }
        }catch (e) {
            NoticeAlert.flash({ msg: e.response.data.message, type: 'error' })
        }
    }
    
    const logout = async () => {
        Data.clearAll()
        router.go('/login')
        NoticeAlert.flash({msg: 'Logout efetuado com sucesso', type: 'success'});
    }

    return {
        login,
        logout
    }
}('/sessions')