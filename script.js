async function consultarCEP() {
    const cep = document.getElementById('cepInput').value;
    const enderecoDiv = document.getElementById('endereco');
    
    if (cep.length !== 8) {
        enderecoDiv.innerHTML = "CEP inválido. Por favor, digite um CEP válido.";
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            enderecoDiv.innerHTML = "Este CEP não é valido, insira outro.";
            return;
        }

        const enderecoStr = `
            <p>CEP: ${data.cep}</p>
            <p>Logradouro: ${data.logradouro}</p>
            <p>Bairro: ${data.bairro}</p>
            <p>Cidade: ${data.localidade}</p>
            <p>Estado: ${data.uf}</p>
        `;

        enderecoDiv.innerHTML = enderecoStr;
        
        const enderecoArmazenado = {
            cep: data.cep,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
        };

        adicionarEnderecoTab(enderecoArmazenado);

    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        enderecoDiv.innerHTML = "Erro ao consultar cep, tente novamente.";
    }
}

function adicionarEnderecoTab(endereco) {
    const tabelaEndereco = document.getElementById('tabelaEndereco');
    const newRow = tabelaEndereco.insertRow();

    newRow.innerHTML = `
        <td>${endereco.cep}</td>
        <td>${endereco.logradouro}</td>
        <td>${endereco.bairro}</td>
        <td>${endereco.cidade}</td>
        <td>${endereco.estado}</td>
    `;
}

window.onload = function() {
    const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
    enderecos.forEach(endereco => {
        adicionarEnderecoTab(endereco);
    });
}
