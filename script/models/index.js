function viewModel() {
    this.idiomas = ko.observableArray([
        { idioma: 'English', codigo: 'en' }, 
        { idioma: 'Deutsch', codigo: 'de' },
        { idioma: 'Português', codigo: 'pt' },
        { idioma: '日本語', codigo: 'jp' } 
    ]);

    this.labels = [
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

    this.idiomaSelecionado = ko.observable();

    this.labelChat = ko.observable("");
    this.labelJogar = ko.observable("");
    this.labelAviso = ko.observable("");
    this.labelIdioma = ko.observable("");
    this.labelRegras = ko.observable("");
    this.labelFavoritar = ko.observable("");
    this.labelMarcarPontos = ko.observable("");
    this.labelJogadaRapida = ko.observable("");
    this.labelCadastro = ko.observable("");
    this.labelLogin = ko.observable("");
    this.labelDescricaoAviso = ko.observable("");
    this.labelSenha = ko.observable("");
    this.labelEmail = ko.observable("");
    this.labelNickname = ko.observable("");

    this.idiomaSelecionado.subscribe(v => {
        if (v) {
            const palavras = this.labels.find(el => el.codigo == v).palavras;

            if (!palavras) {
                alert("Erro interno.");
            }

            this.labelChat(palavras.find(p => p.label == 'Chat').palavra);
            this.labelJogar(palavras.find(p => p.label == 'Jogar').palavra);
            this.labelAviso(palavras.find(p => p.label == 'Aviso').palavra);
            this.labelIdioma(palavras.find(p => p.label == 'Idioma').palavra);
            this.labelRegras(palavras.find(p => p.label == 'Regras').palavra);
            this.labelFavoritar(palavras.find(p => p.label == 'Favoritar').palavra);
            this.labelMarcarPontos(palavras.find(p => p.label == 'MarcarPontos').palavra);
            this.labelJogadaRapida(palavras.find(p => p.label == 'JogadaRapida').palavra);
            this.labelCadastro(palavras.find(p => p.label == 'Cadastro').palavra);
            this.labelLogin(palavras.find(p => p.label == 'Login').palavra);
            this.labelSenha(palavras.find(p => p.label == 'Senha').palavra);
            this.labelEmail(palavras.find(p => p.label == 'Email').palavra);
            this.labelNickname(palavras.find(p => p.label == 'Nickname').palavra);

            if (v !== 'pt')
                this.labelDescricaoAviso(palavras.find(p => p.label == 'Aviso').aviso);
        }
    });

    this.idiomaSelecionado('pt');

    this.cadastrar = function () {

    }
}

ko.applyBindings(new viewModel());