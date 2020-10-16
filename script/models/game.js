function viewModel() {
    let vm = this;

    let palavras = [
        { palavra: "Aurea", dica: "Lei sancionada pela Princesa Dona Isabel" },
        { palavra: "Vacina", dica: "Revolta que aconteceu no Rio de Janeiro" },
        { palavra: "Republica Velha", dica: "Oficialmente a república dos estados unidos do Brasil" },
        { palavra: "Medici", dica: "\"Brasil, ame-o ou deixe-o\"" },
        { palavra: "Mercantil", dica: "Tipo de navios brasileiros que foram afundados na segunda guerra mundial" },
        { palavra: "Tancredo Neves", dica: "Morreu antes de tomar posse" },
        { palavra: "Sarney", dica: "\"Rouba, mas faz\"" },
        { palavra: "MDB", dica: "Oposição aos partidos militares durante a ditadura" },
        { palavra: "Escambo", dica: "Atividade de troca antes de um sistema monetário" },
        { palavra: "Cana-de-açucar", dica: "Primeiro produto explorado na época colonial" },
        { palavra: "Guararapes", dica: "Batalha que originou o Exército Brasileiro" },
        { palavra: "Recife", dica: "Maior cosmopolita cidade da América durante governo de Maurício Nassau" },
        { palavra: "Rio de Janeiro", dica: "Segunda capital do Brasil" },
        { palavra: "Iluminismo", dica: "Movimento responsável pelos três poderes políticos" }
    ];

    vm.alfabeto = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç'
    ];

    vm.jogoFinalizado = ko.observable(false);

    let indicePalavraSorteada = Math.floor(Math.random() * palavras.length);

    let palavraSorteada = palavras[indicePalavraSorteada];

    let palavraSorteadaSeparada = palavraSorteada.palavra.split('');

    let palavraCensurada = palavraSorteada.palavra.replace(/[A-zç]/gi,'_').split('');

    vm.palavraCensurada = ko.observableArray(palavraCensurada);

    vm.palavraCensurada.subscribe(v => {
        if (v && !vm.palavraCensurada().includes("_")) {
            vm.jogoFinalizado(true);

            toastr.success("Parabéns! Você venceu o jogo!");
        }
    });

    vm.palavraCensurada.valueHasMutated();
    
    let dicaUtilizada = false;

    vm.abrirDica = function() {
        if (!dicaUtilizada)
            toastr.warning(palavraSorteada.dica);
        else
            toastr.error('Você já utilizou sua dica!');

        dicaUtilizada = true;
    }

    vm.selecionarLetra = function(data) {
        if (data) {
            for (let i = 0; i < palavraSorteadaSeparada.length; i++) {
                if (palavraSorteadaSeparada[i].toLowerCase() == data) {
                    var clone = vm.palavraCensurada.slice(0);
                    clone[i] = data;

                    vm.palavraCensurada(clone);
                }
            }             
        }
    }
}

ko.applyBindings(new viewModel());

canvas =  function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
};

head = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
};
    
draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
};

frame1 = function() {
    draw (0, 150, 150, 150);
};

frame2 = function() {
    draw (10, 0, 10, 600);
};

frame3 = function() {
    draw (0, 5, 70, 5);
};

frame4 = function() {
    draw (60, 5, 60, 15);
};

torso = function() {
    draw (60, 36, 60, 70);
};

rightArm = function() {
    draw (60, 46, 100, 50);
};

leftArm = function() {
    draw (60, 46, 20, 50);
};

rightLeg = function() {
    draw (60, 70, 100, 100);
};

leftLeg = function() {
    draw (60, 70, 20, 100);
};

drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 