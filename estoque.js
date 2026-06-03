// 1. Importando o módulo para ler dados do terminal
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 2. Nosso banco de dados do estoque (Objetos)
const estoque = {
    "PP Natural": { quantidade: 500, unidade: "kg", minimo: 100 },
    "Masterbatch Preto": { quantidade: 25, unidade: "kg", minimo: 5 },
    "Molde Gaveta Bloco A": { quantidade: 1, unidade: "unid", minimo: 1 },
    "Pino Extrator 6mm": { quantidade: 12, unidade: "unid", minimo: 5 }
};

// 3. Função para mostrar o status do almoxarifado
function mostrarEstoque() {
    console.log("\n====================================");
    console.log("    STATUS ATUAL DO ALMOXARIFADO    ");
    console.log("====================================");
    for (const item in estoque) {
        const dados = estoque[item];
        console.log(`🔹 ${item}: ${dados.quantidade} ${dados.unidade} (Mínimo: ${dados.minimo})`);
    }
    console.log("====================================\n");
    exibirMenu(); // Volta para o menu
}

// 4. Função para dar baixa em um material
function realizarBaixa() {
    rl.question("Digite o nome exato do item para dar baixa: ", (item) => {
        if (item in estoque) {
            rl.question(`Quantos (${estoque[item].unidade}) serão retirados? `, (quantidade) => {
                const qtdUsada = parseFloat(quantidade);

                if (isNaN(qtdUsada) || qtdUsada <= 0) {
                    console.log("❌ Erro: Quantidade inválida.");
                    exibirMenu();
                    return;
                }

                if (estoque[item].quantidade >= qtdUsada) {
                    estoque[item].quantidade -= qtdUsada;
                    console.log(`\n✅ SUCESSO: ${qtdUsada} ${estoque[item].unidade} de "${item}" retirados.`);
                    
                    // Alerta de estoque crítico
                    if (estoque[item].quantidade <= estoque[item].minimo) {
                        console.log(`⚠️ ATENÇÃO CRÍTICA: O estoque de "${item}" atingiu o nível mínimo (${estoque[item].quantidade} restantes)!`);
                    }
                } else {
                    console.log(`\n❌ ERRO: Estoque insuficiente. Saldo atual: ${estoque[item].quantidade} ${estoque[item].unidade}`);
                }
                exibirMenu();
            });
        } else {
            console.log("❌ Erro: Item não encontrado no almoxarifado.");
            exibirMenu();
        }
    });
}

// 5. O Menu Interativo Principal (Loop usando funções)
function exibirMenu() {
    console.log("--- MENU DO SISTEMA ---");
    console.log("1 - Visualizar Estoque");
    console.log("2 - Dar Baixa em Insumo (Injetora)");
    console.log("0 - Sair do Sistema");
    
    rl.question("\nEscolha uma opção: ", (opcao) => {
        switch (opcao.trim()) {
            case '1':
                mostrarEstoque();
                break;
            case '2':
                realizarBaixa();
                break;
            case '0':
                console.log("\nEncerrando o sistema do almoxarifado. Até o próximo turno! 👋");
                rl.close(); // Fecha o terminal com segurança
                break;
            default:
                console.log("❌ Opção inválida! Tente novamente.\n");
                exibirMenu();
                break;
        }
    });
}

// --- INICIALIZAÇÃO DO PROGRAMA ---
console.log("Iniciando Sistema de Controle de Injeção Plástica...");
exibirMenu();