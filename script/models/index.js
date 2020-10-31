function viewModel() {
    let vm = this;

    vm.idiomas = ko.observableArray([
        { idioma: 'English', codigo: 'en' }, 
        { idioma: 'Deutsch', codigo: 'de' },
        { idioma: 'Português', codigo: 'pt' },
        { idioma: '日本語', codigo: 'jp' } 
    ]);

    vm.labels = [
        { codigo: 'pt', palavras: 
            [
                { label: 'JogadaRapida', palavra: 'Jogada Rápida' },
                { label: 'Cadastro', palavra: 'Cadastrar' },
                { label: 'Login', palavra: 'Entrar' },
                { label: 'Idioma', palavra: 'Idioma' },
                { label: 'Regras', palavra: 'Regras' },
                { label: 'Jogar', palavra: 'Jogar' },
                { label: 'Aviso', palavra: 'Aviso' },
                { label: 'Favoritar', palavra: 'Favorite Salas' },
                { label: 'MarcarPontos', palavra: 'Marque Pontos' },
                { label: 'Chat', palavra: 'Bata papo c/ amigos' },
                { label: 'Nickname', palavra: 'Nickname' },
                { label: 'Senha', palavra: 'Senha' },
                { label: 'Email', palavra: 'E-mail' },
            ]
        },
        { codigo: 'de', palavras: 
            [
                { label: 'JogadaRapida', palavra: 'Schnelles Spiel' },
                { label: 'Cadastro', palavra: 'Registrieren' },
                { label: 'Login', palavra: 'Anmelden' },
                { label: 'Idioma', palavra: 'Sprache' },
                { label: 'Regras', palavra: 'Regeln' },
                { label: 'Jogar', palavra: 'Spielen' },
                { label: 'Chat', palavra: 'Mit Freunden unterhalten' },
                { label: 'Favoritar', palavra: 'Lieblingszimmer' },
                { label: 'MarcarPontos', palavra: 'Punkten' },
                { label: 'Nickname', palavra: 'Spitzname' },
                { label: 'Senha', palavra: 'Passwort' },
                { label: 'Email', palavra: 'E-mail' },
                { label: 'Aviso', palavra: 'Warnung', aviso: 'Dieses Spiel wurde noch nicht zu 100% in die ausgewählte Sprache übersetzt. Bitte wählen Sie eine andere Sprache.' }
            ]
        },
        { codigo: 'en', palavras: 
            [
                { label: 'JogadaRapida', palavra: 'Quick Play' },
                { label: 'Cadastro', palavra: 'Signup' },
                { label: 'Login', palavra: 'Signin' },
                { label: 'Idioma', palavra: 'Language' },
                { label: 'Regras', palavra: 'Rules' },
                { label: 'Jogar', palavra: 'Play' },
                { label: 'Chat', palavra: 'Chat w/ friends' },
                { label: 'Favoritar', palavra: 'Favorite Rooms' },
                { label: 'MarcarPontos', palavra: 'Score Points' },
                { label: 'Nickname', palavra: 'Nickname' },
                { label: 'Senha', palavra: 'Password' },
                { label: 'Email', palavra: 'E-mail' },
                { label: 'Aviso', palavra: 'Warning', aviso: 'This game has not yet been 100% translated into the selected language. Please choose another language.' }
            ]
        },
        { codigo: 'jp', palavras: 
            [
                { label: 'JogadaRapida', palavra: 'クイックプレイ' },
                { label: 'Cadastro', palavra: 'サインアップ' },
                { label: 'Login', palavra: 'サインイン' },
                { label: 'Idioma', palavra: '言語' },
                { label: 'Regras', palavra: 'ルール' },
                { label: 'Jogar', palavra: 'プレー' },
                { label: 'Chat', palavra: '友達とチャット' },
                { label: 'Favoritar', palavra: 'お気に入りの部屋' },
                { label: 'MarcarPontos', palavra: '得点' },
                { label: 'Nickname', palavra: 'ニックネーム' },
                { label: 'Senha', palavra: 'パスワード' },
                { label: 'Email', palavra: 'メール' },
                { label: 'Aviso', palavra: '警告', aviso: 'このゲームはまだ選択した言語に100％翻訳されていません。 別の言語を選択してください。' }
            ]
        }
    ];

    vm.idiomaSelecionado = ko.observable();

    vm.labelChat = ko.observable("");
    vm.labelJogar = ko.observable("");
    vm.labelAviso = ko.observable("");
    vm.labelIdioma = ko.observable("");
    vm.labelRegras = ko.observable("");
    vm.labelFavoritar = ko.observable("");
    vm.labelMarcarPontos = ko.observable("");
    vm.labelJogadaRapida = ko.observable("");
    vm.labelCadastro = ko.observable("");
    vm.labelLogin = ko.observable("");
    vm.labelDescricaoAviso = ko.observable("");
    vm.labelSenha = ko.observable("");
    vm.labelEmail = ko.observable("");
    vm.labelNickname = ko.observable("");

    vm.idiomaSelecionado.subscribe(v => {
        if (v) {
            const palavras = vm.labels.find(el => el.codigo == v).palavras;

            if (!palavras) {
                toastr.error("Erro interno.");
            }

            vm.labelChat(palavras.find(p => p.label == 'Chat').palavra);
            vm.labelJogar(palavras.find(p => p.label == 'Jogar').palavra);
            vm.labelAviso(palavras.find(p => p.label == 'Aviso').palavra);
            vm.labelIdioma(palavras.find(p => p.label == 'Idioma').palavra);
            vm.labelRegras(palavras.find(p => p.label == 'Regras').palavra);
            vm.labelFavoritar(palavras.find(p => p.label == 'Favoritar').palavra);
            vm.labelMarcarPontos(palavras.find(p => p.label == 'MarcarPontos').palavra);
            vm.labelJogadaRapida(palavras.find(p => p.label == 'JogadaRapida').palavra);
            vm.labelCadastro(palavras.find(p => p.label == 'Cadastro').palavra);
            vm.labelLogin(palavras.find(p => p.label == 'Login').palavra);
            vm.labelSenha(palavras.find(p => p.label == 'Senha').palavra);
            vm.labelEmail(palavras.find(p => p.label == 'Email').palavra);
            vm.labelNickname(palavras.find(p => p.label == 'Nickname').palavra);

            if (v !== 'pt')
                vm.labelDescricaoAviso(palavras.find(p => p.label == 'Aviso').aviso);
        }
    });

    vm.idiomaSelecionado('pt');

    let api = 'https://ulbra-hanged.herokuapp.com/api';

    vm.nickname = ko.observable();
    vm.password = ko.observable();
    vm.email = ko.observable();
    
    vm.newNickname = ko.observable();
    vm.newEmail = ko.observable();
    vm.newPassword = ko.observable();

    vm.cadastrar = function () {
        console.log('cadastrar')
        if (!vm.newEmail() || !vm.newNickname() || !vm.newPassword()) {
            toastr.warning("Preencha todos os campos.");

            return;
        }

        let usuario = {
            name: vm.newNickname(),
            email: vm.newEmail(),
            password: vm.newPassword()
        };

        $.post(`${api}/users`, usuario).done(function(s) {
            usuario.password = null;
            usuario.id = s.id;

            localStorage.setItem('hangman_user', JSON.stringify(usuario));

            toastr.success("Usuário criado com sucesso.");

            window.location = 'iniciar_game.html';
        }).fail(function(e) {
            if (e && e.responseText && e.respondeText.includes("Duplicate entry")) {
                toastr.error("Já existe um usuário com estas credenciais.");
            } else {
                toastr.error("Erro interno. Contate um administrador.");
            }
        });
    }

    vm.login = function () {
        console.log('chegou aqui')
        
        if (!vm.nickname() || !vm.password()) {
            console.log('entrou aqui')
            toastr.warning("Preencha e-mail e senha.");
            return;
        }

        let usuario = {
            nickname: vm.nickname(),
            password: vm.password()
        };
       

        $.post(`${api}/login`, usuario).done(function(s) {
            usuario.id = s.id;
            localStorage.setItem('hangman_user', JSON.stringify(usuario));
            if (s.admin) {
                window.location.href = 'painelAdmin.html';
            } else {
                window.location.href = 'iniciar_game.html';
            }
        }).fail(function(e) {
            toastr.error("Credenciais erradas.");
        });
    }
}

ko.applyBindings(new viewModel());