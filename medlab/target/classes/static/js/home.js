document.addEventListener('DOMContentLoaded', function() {

    function carregarDadosFigma() {
        fetch('/pacientes')
            .then(res => res.json())
            .then(pacientes => {
                let triagem = 0;
                let atendimento = 0;
                let finalizados = 0;

                const tbody = document.getElementById('tabelaDashboard');
                tbody.innerHTML = '';

                pacientes.forEach(p => {
                    if (p.status === "Aguardando Triagem") triagem++;
                    if (p.status === "Em Atendimento") atendimento++;
                    if (p.status === "Finalizado") finalizados++;

                    // Mapeia a classe exata da pílula de status do Figma
                    let badgeClass = 'badge-triagem';
                    if (p.status === 'Em Atendimento') badgeClass = 'badge-atendimento';
                    if (p.status === 'Finalizado') badgeClass = 'badge-finalizado';

                    tbody.innerHTML += `
                        <tr>
                            <td style="font-weight: 600;">${p.nome}</td>
                            <td style="color: #a4b0be;">${p.cpf}</td>
                            <td style="color: #a4b0be;">${p.convenio ? p.convenio : 'Particular'}</td>
                            <td><span class="status-badge ${badgeClass}">${p.status}</span></td>
                        </tr>
                    `;
                });

                document.getElementById('qtdTriagem').innerText = triagem;
                document.getElementById('qtdAtendimento').innerText = atendimento;
                document.getElementById('qtdFinalizados').innerText = finalizados;

                if (pacientes.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">Nenhum paciente no fluxo operacional.</td></tr>`;
                }
            })
            .catch(err => console.error("Erro ao sincronizar com o Java:", err));
    }

    carregarDadosFigma();
});