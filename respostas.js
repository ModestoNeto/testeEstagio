// E.1 Calcular o valor total do financiamento
const calcularValorTotalFinanciamento = (valorParcela, quantidadeParcelas, taxaJurosMensal) => {
  const i = taxaJurosMensal / 100;
  const A = valorParcela * (((1 + i) ** quantidadeParcelas - 1) / i);
  return A.toFixed(2);
};

// Exemplo E.1
const valorParcela = 360;
const quantidadeParcelas = 72;
const taxaJurosMensal = 2;

const valorTotal = calcularValorTotalFinanciamento(valorParcela, quantidadeParcelas, taxaJurosMensal);
console.log("E.1 - Calcular o valor total do financiamento");
console.log(`Valor da Parcela: R$ ${valorParcela}`);
console.log(`Quantidade de Parcelas: ${quantidadeParcelas}`);
console.log(`Taxa de Juros Mensal: ${taxaJurosMensal}%`);
console.log(`Valor total do financiamento: R$ ${valorTotal}\n`);

// E.2 Verificar a disponibilidade de um produto no estoque
const verificarDisponibilidadeProduto = (sku, listaProdutos) => {
  const produto = listaProdutos.find(item => item.sku === sku);
  return produto ? produto.quantidade > 0 : false;
};

// Exemplo E.2
const produtos = [
  { sku: 1001, nome: 'Camiseta', quantidade: 5 },
  { sku: 1002, nome: 'Calça', quantidade: 10 },
  { sku: 1003, nome: 'Vestido', quantidade: 3 }
];

console.log("E.2 - Verificar a disponibilidade de um produto no estoque");
console.log(`Produto SKU 1001 disponível: ${verificarDisponibilidadeProduto(1001, produtos) ? 'Sim' : 'Não'}`); // true
console.log(`Produto SKU 1004 disponível: ${verificarDisponibilidadeProduto(1004, produtos) ? 'Sim' : 'Não'}`); // false
console.log(`Produto SKU 1006 disponível: ${verificarDisponibilidadeProduto(1006, produtos) ? 'Sim' : 'Não'}`); // false
console.log(`Produto SKU 1003 disponível: ${verificarDisponibilidadeProduto(1003, produtos) ? 'Sim' : 'Não'}\n`); // true

// E.3 Calcular o frete para uma entrega
const calcularFrete = (peso, distancia, tabelaPrecos) => {
  let valorFrete = 0;
  for (let [chave, valor] of Object.entries(tabelaPrecos)) {
    const [intervaloPeso, intervaloDistancia] = chave.split(',');
    const [pesoMin, pesoMax] = intervaloPeso.split('-').map(Number);
    const [distMin, distMax] = intervaloDistancia.split('-').map(Number);
    if (peso >= pesoMin && peso <= pesoMax && distancia >= distMin && distancia <= distMax) {
      valorFrete = valor;
      break;
    }
  }
  return valorFrete;
};

// Tabela de preços
const tabelaPrecos = {
  '0-1,0-5': 10.0,    // Até 1 kg e até 5 km: R$ 10.00
  '0-1,6-10': 15.0,   // Até 1 kg e de 6-10 km: R$ 15.00
  '1.5-5,0-5': 20.0,  // 1,5 kg a 5 kg e até 5 km: R$ 20.00
  '1.5-5,6-10': 25.0, // 1,5 kg a 5 kg e 6-10 km: R$ 25.00
  '5-10,0-5': 30.0,   // 5-10 kg e até 5 km: R$ 30.00
  '5-10,6-10': 35.0   // 5-10 kg e 6-10 km: R$ 35.00
};

// Exemplo E.3
console.log("E.3 - Calcular o frete para uma entrega");
console.log(`Frete para 0.5 kg e 4 km: R$ ${calcularFrete(0.5, 4, tabelaPrecos)}`);  // 10.0
console.log(`Frete para 3 kg e 8 km: R$ ${calcularFrete(3, 8, tabelaPrecos)}`);    // 25.0
console.log(`Frete para 7 kg e 3 km: R$ ${calcularFrete(7, 3, tabelaPrecos)}`);    // 30.0
console.log(`Frete para 12 kg e 5 km: R$ ${calcularFrete(12, 5, tabelaPrecos)}\n`);   // 0 (fora do intervalo definido)

// E.4 Atualizar o estoque após uma venda
const itensVendidos = [
  { sku: 1001, quantidade: 2 },
  { sku: 1002, quantidade: 1 },
  { sku: 1003, quantidade: 5 }
];

const estoque = [
  { sku: 1001, nome: 'Camiseta', quantidade: 5 },
  { sku: 1002, nome: 'Calça', quantidade: 2 },
  { sku: 1003, nome: 'Vestido', quantidade: 3 }
];

const atualizarEstoque = (itensVendidos, estoque) => {
  let estoqueAtualizado = [...estoque];
  itensVendidos.forEach(itemVendido => {
    let itemEstoque = estoqueAtualizado.find(item => item.sku === itemVendido.sku);
    if (itemEstoque) {
      if (itemEstoque.quantidade >= itemVendido.quantidade) {
        itemEstoque.quantidade -= itemVendido.quantidade;
      } else {
        console.log(`Estoque insuficiente para o SKU ${itemVendido.sku}. Quantidade disponível: ${itemEstoque.quantidade}. Definindo quantidade para 0.`);
        itemEstoque.quantidade = 0;
      }
    } else {
      console.log(`Produto com SKU ${itemVendido.sku} não encontrado no estoque.`);
    }
  });

  console.log("\nEstoque Atualizado:");
  estoqueAtualizado.forEach(item => {
    console.log(`SKU: ${item.sku}, Nome: ${item.nome}, Quantidade: ${item.quantidade}`);
  });

  return estoqueAtualizado;
};

// Exemplo E.4
console.log("E.4 - Atualizar o estoque após uma venda");
const estoqueAtualizado = atualizarEstoque(itensVendidos, estoque);

// E.5 Gerar relatório de vendas
const gerarRelatorioDeVendas = (vendas, dataInicio, dataFim) => {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  const relatorio = {};

  vendas.forEach(venda => {
    const dataVenda = new Date(venda.data);
    if (dataVenda >= inicio && dataVenda <= fim) {
      if (!relatorio[venda.sku]) {
        relatorio[venda.sku] = { quantidadeTotal: 0, valorTotal: 0 };
      }
      relatorio[venda.sku].quantidadeTotal += venda.quantidade;
      relatorio[venda.sku].valorTotal += venda.valorTotal;
    }
  });

  let valorTotalPeriodo = 0;
  for (const sku in relatorio) {
    valorTotalPeriodo += relatorio[sku].valorTotal;
  }
  console.log("\nRelatório de Vendas:");
  for (const sku in relatorio) {
    console.log(`SKU: ${sku}, Quantidade Total Vendida: ${relatorio[sku].quantidadeTotal}, Valor Total Vendido: R$ ${relatorio[sku].valorTotal.toFixed(2)}`);
  }
  console.log(`\nValor Total Vendido no Período: R$ ${valorTotalPeriodo.toFixed(2)}`);
  return { relatorio, valorTotalPeriodo };
};

// Exemplo E.5
const vendas = [
  { sku: 1001, quantidade: 2, valorTotal: 50.00, data: '2021-01-01' },
  { sku: 1002, quantidade: 1, valorTotal: 20.00, data: '2021-01-01' },
  { sku: 1003, quantidade: 5, valorTotal: 100.00, data: '2021-01-02' },
  { sku: 1001, quantidade: 1, valorTotal: 25.00, data: '2021-01-02' }
];

const dataInicio = '2021-01-01';
const dataFim = '2021-01-02';

console.log("\nE.5 - Gerar relatório de vendas");
const resultadoRelatorio = gerarRelatorioDeVendas(vendas, dataInicio, dataFim);
