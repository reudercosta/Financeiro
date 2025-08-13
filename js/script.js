document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const orcamentoForm = document.getElementById('orcamentoForm');
    const addTratamentoBtn = document.getElementById('addTratamento');
    const tratamentosContainer = document.getElementById('tratamentosContainer');
    const subtotalGeralSpan = document.getElementById('subtotalGeral');
    const valorDescontoSpan = document.getElementById('valorDesconto');
    const valorTotalSpan = document.getElementById('valorTotal');
    const valorParcelaSpan = document.getElementById('valorParcela');
    const descontoInput = document.getElementById('desconto');
    const parcelasSelect = document.getElementById('parcelas');
    const dataOrcamentoInput = document.getElementById('dataOrcamento');

    let tratamentoCounter = 0;

    // Base de dados de tratamentos e preços
    const tratamentos = {
        'Cirurgia Para Implante - IRF': {
            'Implante Nacional': 700,
            'Implante Importado': 900,
            'Enxerto Importado BoneCeramic/Cerabone': 900,
            'Enxerto Importado BoneCeramic/Cerabone + Membrana': 1500,
            'Gia Cirúrgico (Até 3 elementos)': 200,
            'Gia Cirúrgico Hemiarco': 250,
            'Gia Cirúrgico Total': 350,
            'Prótese Total Com Palato Incolor e Dentes Nacionais': 750,
            'Prótese Total Com Palato Incolor e Dentes Importados': 950
        },
        'Cirurgia Oral': {
            'Extração Simples': 150,
            'Extração de Siso': 350,
            'Extração de Siso Incluso': 500,
            'Apicectomia': 600,
            'Cirurgia Periodontal': 400,
            'Frenectomia': 300,
            'Biópsia': 250,
            'Remoção de Cisto': 800
        },
        'Prótese - IRF': {
            'Coroa S/ Implante Nacional': 1180,
            'Coria Próvisoria S/ Implante Importado': 190,
            'Coroa S/ Implante Nacional': 1390,
            'Coria Próvisoria S/ Implante Importado': 240,
            'Enxerto Importado BoneCeramic/Cerabone': 900,
            'Overdenture Com Implante Nacional': 3430,
            'Overdenture Com Implante Nacional': 4430,
            'Protocolo Inferior Nacional Em Resina (Sobre 4 implantes)': 5900,
            'Taxa de Captura Protocolo Inferior Nacional': 800,
            'Protocolo Inferior Importado Em Resina (Sobre 4 implantes)': 6900,
            'Taxa de Captura Protocolo Inferior Importado': 850,
            'Protocolo Superior Nacional Em Resina (Sobre 6 implantes)': 6900,
            'Taxa de Captura Protocolo Superior Nacional': 1000,
            'Protocolo Superior Importado Em Resina (Sobre 6 implantes)': 8900,
            'Taxa de Captura Protocolo Superior Nacional': 1280,
            'Protocolo Superior Nacional Em Cerâmica (Sobre 6 implantes)': 10900,
            'Protocolo Superior Nacional Em Cerâmica (Sobre 6 implantes)': 12900,
            'Pôntico Cerâmico' : 850,
            'Carga Imediáta Laboratorial': 950

        },
        'Implantes Dentários': {
            'Implante Nacional (Neodent)': 1500,
            'Implante Nacional (SIN)': 1400,
            'Implante Nacional (Conexão)': 1600,
            'Implante Importado (Straumann)': 3000,
            'Implante Importado (Nobel Biocare)': 3200,
            'Implante Importado (Zimmer)': 2800,
            'Enxerto Ósseo Autógeno': 1200,
            'Enxerto Ósseo Sintético': 800,
            'Membrana Reabsorvível': 600,
            'Coroa sobre Implante (Nacional)': 800,
            'Coroa sobre Implante (Importada)': 1200,
            'Prótese Total sobre Implantes': 8000,
            'Prótese Protocolo': 12000
    },
    'Procedimentos Preventivos': {
        'Limpeza Dental': 250,
        'Aplicação de Flúor': 150,
        'Selantes Dentais': 200
    },
    'Dentística': {
        'Restauração em Amálgama': 120,
        'Restauração em Resina (1 face)': 150,
        'Restauração em Resina (2 faces)': 200,
        'Restauração em Resina (3 faces)': 250,
        'Tratamento de Cárie': 180,
        'Clareamento Dental Caseiro': 600,
        'Clareamento Dental a Laser': 1000,
        'Faceta Direta em Resina': 400,
        'Recobrimento de Cárie Profunda': 200
    },
    'Prótese': {
        'Coroa em Metalocerâmica': 800,
        'Coroa em Zircônia': 1200,
        'Prótese Parcial Removível (PPR)': 1500,
        'Prótese Total (Dentadura)': 2000,
        'Prótese Flexível': 1800,
        'Overdenture sobre Implante': 3500,
        'Faceta em Cerâmica': 1000,
        'Inlay/Onlay em Cerâmica': 900
    },
    'Periodontia': {
        'Raspagem e Alisamento Radicular (1 sessão)': 200,
        'Gengivoplastia': 400,
        'Enxerto Gengival': 1500,
        'Regeneração Óssea Guiada': 2000,
        'Alongamento de Coroa Clínica': 500,
        'Plástica de Freio Labial': 300,
        'Tratamento de Gengivite': 250,
        'Tratamento de Periodontite': 800
    },
    'Ortodontia': {
        'Aparelho Fixo Metálico': 2500,
        'Aparelho Fixo Estético': 3500,
        'Aparelho Autoligado': 4000,
        'Alinhador Invisível (por etapa)': 5000,
        'Contenção Fixa': 300,
        'Contenção Móvel': 400,
        'Ortopedia Funcional dos Maxilares': 2000,
        'Manutenção de Aparelho': 150
    },
    'Endodontia': {
        'Tratamento de Canal (Unirradicular)': 500,
        'Tratamento de Canal (Birradicular)': 700,
        'Tratamento de Canal (Multirradicular)': 900,
        'Retratamento de Canal': 1000,
        'Pulpotomia': 300,
        'Pulpectomia': 350
    },
    'Odontopediatria': {
        'Aplicação de Flúor': 50,
        'Selante de Fissura': 80,
        'Restauração em Dente Decíduo': 120,
        'Pulpotomia em Dente de Leite': 200,
        'Coroa em Dente de Leite': 250,
        'Tratamento de Traumatismo': 300
    }

  };

    // Inicialização
    init();

    function init() {
        // Define a data atual no campo de data do orçamento
        const hoje = new Date().toISOString().split('T')[0];
        dataOrcamentoInput.value = hoje;

        // Adiciona um tratamento inicial
        addTratamentoItem();

        // Event listeners
        addTratamentoBtn.addEventListener('click', addTratamentoItem);
        descontoInput.addEventListener('input', updateTotals);
        parcelasSelect.addEventListener('change', updateTotals);
        orcamentoForm.addEventListener('submit', handleFormSubmit);

        // Formatação de campos
        setupFieldFormatting();
    }

    function setupFieldFormatting() {
        // Formatação do CPF
        const cpfInput = document.getElementById('cpf');
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\\D/g, '');
            value = value.replace(/(\\d{3})(\\d)/, '$1.$2');
            value = value.replace(/(\\d{3})(\\d)/, '$1.$2');
            value = value.replace(/(\\d{3})(\\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });

        // Formatação do telefone
        const telefoneInput = document.getElementById('telefone');
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\\D/g, '');
            value = value.replace(/(\\d{2})(\\d)/, '($1) $2');
            value = value.replace(/(\\d{4,5})(\\d{4})$/, '$1-$2');
            e.target.value = value;
        });
    }

    function addTratamentoItem() {
        tratamentoCounter++;
        const div = document.createElement('div');
        div.classList.add('tratamento-item');
        div.innerHTML = `
            <div class="tratamento-header">
                <span class="tratamento-title">Tratamento ${tratamentoCounter}</span>
                <button type="button" class="remove-tratamento" data-counter="${tratamentoCounter}">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label for="tipoTratamento_${tratamentoCounter}">Categoria:</label>
                    <select id="tipoTratamento_${tratamentoCounter}" class="tipo-tratamento" data-counter="${tratamentoCounter}" required>
                        <option value="">Selecione a categoria</option>
                        <option value="Cirurgia Oral">Cirurgia Oral</option>
                        <option value="Implantes Dentários">Implantes Dentários</option>
                        <option value="Cirurgia Para Implante - IRF">Cirurgia Para Implante - IRF</option>
                        <option value="Prótese - IRF">Prótese - IRF</option>
                        <option value="Procedimentos Preventivos">Procedimentos Preventivos</option>
                        <option value="Dentística">Dentística</option>
                        <option value="Prótese">Prótese</option>
                        <option value="Periodontia">Periodontia</option>
                        <option value="Ortodontia">Ortodontia</option>
                        <option value="Odontopediatria">Odontopediatria</option>
                       

                    </select>
                </div>

                <div class="form-group">
                    <label for="procedimento_${tratamentoCounter}">Procedimento:</label>
                    <select id="procedimento_${tratamentoCounter}" class="procedimento" data-counter="${tratamentoCounter}" required disabled>
                        <option value="">Selecione o procedimento</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="dente_${tratamentoCounter}">Dente/Região:</label>
                    <input type="text" id="dente_${tratamentoCounter}" class="dente" placeholder="Ex: 11, 21-23, Região posterior">
                </div>

                <div class="form-group">
                    <label for="quantidade_${tratamentoCounter}">Quantidade:</label>
                    <input type="number" id="quantidade_${tratamentoCounter}" class="quantidade" value="1" min="1" max="32" required>
                </div>

                <div class="form-group">
                    <label for="valorUnitario_${tratamentoCounter}">Valor Unitário (R$):</label>
                    <input type="number" id="valorUnitario_${tratamentoCounter}" class="valor-unitario" value="0" step="0.01" min="0">
                </div>

                <div class="form-group">
                    <label for="subtotal_${tratamentoCounter}">Subtotal (R$):</label>
                    <input type="number" id="subtotal_${tratamentoCounter}" class="subtotal" value="0" step="0.01" readonly>
                </div>
            </div>

            <div class="form-group" style="margin-top: 15px;">
                <label for="observacoes_${tratamentoCounter}">Observações:</label>
                <input type="text" id="observacoes_${tratamentoCounter}" class="observacoes" placeholder="Observações adicionais sobre o tratamento">
            </div>
        `;
        
        tratamentosContainer.appendChild(div);

        // Event listeners para o novo item
        const tipoSelect = div.querySelector('.tipo-tratamento');
        const procedimentoSelect = div.querySelector('.procedimento');
        const quantidadeInput = div.querySelector('.quantidade');
        const valorUnitarioInput = div.querySelector('.valor-unitario');
        const removeBtn = div.querySelector('.remove-tratamento');

        tipoSelect.addEventListener('change', handleTipoTratamentoChange);
        procedimentoSelect.addEventListener('change', handleProcedimentoChange);
        quantidadeInput.addEventListener('input', handleQuantidadeChange);
        valorUnitarioInput.addEventListener('input', handleValorUnitarioChange);
        removeBtn.addEventListener('click', removeTratamentoItem);

        updateTotals();
    }

    function handleTipoTratamentoChange(event) {
        const counter = event.target.dataset.counter;
        const tipo = event.target.value;
        const procedimentoSelect = document.getElementById(`procedimento_${counter}`);
        
        // Limpa as opções anteriores
        procedimentoSelect.innerHTML = '<option value="">Selecione o procedimento</option>';
        procedimentoSelect.disabled = false;

        if (tipo && tratamentos[tipo]) {
            // Adiciona as opções do tipo selecionado
            for (const proc in tratamentos[tipo]) {
                const option = document.createElement('option');
                option.value = proc;
                option.textContent = proc;
                procedimentoSelect.appendChild(option);
            }
        } else {
            procedimentoSelect.disabled = true;
        }

        // Reset dos valores
        document.getElementById(`valorUnitario_${counter}`).value = '0';
        updateSubtotal(counter);
    }

    function handleProcedimentoChange(event) {
        const counter = event.target.dataset.counter;
        const tipo = document.getElementById(`tipoTratamento_${counter}`).value;
        const procedimento = event.target.value;
        const valorUnitarioInput = document.getElementById(`valorUnitario_${counter}`);

        if (tipo && procedimento && tratamentos[tipo] && tratamentos[tipo][procedimento]) {
            valorUnitarioInput.value = tratamentos[tipo][procedimento].toFixed(2);
        } else {
            valorUnitarioInput.value = '0.00';
        }
        
        updateSubtotal(counter);
    }

    function handleQuantidadeChange(event) {
        const counter = event.target.id.split('_')[1];
        updateSubtotal(counter);
    }

    function handleValorUnitarioChange(event) {
        const counter = event.target.id.split('_')[1];
        updateSubtotal(counter);
    }

    function updateSubtotal(counter) {
        const quantidade = parseFloat(document.getElementById(`quantidade_${counter}`).value) || 0;
        const valorUnitario = parseFloat(document.getElementById(`valorUnitario_${counter}`).value) || 0;
        const subtotal = quantidade * valorUnitario;
        
        document.getElementById(`subtotal_${counter}`).value = subtotal.toFixed(2);
        updateTotals();
    }

    function removeTratamentoItem(event) {
        const item = event.target.closest('.tratamento-item');
        item.style.animation = 'slideOut 0.3s ease-out';
        
        setTimeout(() => {
            item.remove();
            updateTotals();
            
            // Se não há mais tratamentos, adiciona um novo
            if (tratamentosContainer.children.length === 0) {
                addTratamentoItem();
            }
        }, 300);
    }

    function updateTotals() {
        let subtotalGeral = 0;
        
        // Calcula o subtotal geral
        document.querySelectorAll('.subtotal').forEach(input => {
            subtotalGeral += parseFloat(input.value) || 0;
        });

        // Calcula o desconto
        const percentualDesconto = parseFloat(descontoInput.value) || 0;
        const valorDesconto = (subtotalGeral * percentualDesconto) / 100;
        
        // Calcula o total final
        const totalFinal = subtotalGeral - valorDesconto;
        
        // Calcula o valor da parcela
        const numeroParcelas = parseInt(parcelasSelect.value) || 1;
        const valorParcela = totalFinal / numeroParcelas;

        // Atualiza os elementos na tela
        subtotalGeralSpan.textContent = subtotalGeral.toFixed(2);
        valorDescontoSpan.textContent = valorDesconto.toFixed(2);
        valorTotalSpan.textContent = totalFinal.toFixed(2);
        valorParcelaSpan.textContent = valorParcela.toFixed(2);
    }

    function validateForm() {
        const requiredFields = [
            'nomePaciente', 'dataNascimento', 'telefone', 'dataOrcamento'
        ];

        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.focus();
                alert(`Por favor, preencha o campo: ${field.previousElementSibling.textContent}`);
                return false;
            }
        }

        // Valida se há pelo menos um tratamento
        const tratamentosItems = document.querySelectorAll('.tratamento-item');
        if (tratamentosItems.length === 0) {
            alert('Adicione pelo menos um tratamento ao orçamento.');
            return false;
        }

        // Valida cada tratamento
        for (const item of tratamentosItems) {
            const tipoSelect = item.querySelector('.tipo-tratamento');
            const procedimentoSelect = item.querySelector('.procedimento');
            
            if (!tipoSelect.value) {
                tipoSelect.focus();
                alert('Selecione a categoria do tratamento.');
                return false;
            }
            
            if (!procedimentoSelect.value) {
                procedimentoSelect.focus();
                alert('Selecione o procedimento do tratamento.');
                return false;
            }
        }

        return true;
    }

    function collectFormData() {
        const data = {
            paciente: {
                nome: document.getElementById('nomePaciente').value,
                cpf: document.getElementById('cpf').value,
                dataNascimento: document.getElementById('dataNascimento').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                endereco: document.getElementById('endereco').value
            },
            clinica: {
                nome: document.getElementById('nomeClinica').value,
                dentista: document.getElementById('nomeDentista').value,
                cro: document.getElementById('cro').value
            },
            orcamento: {
                data: document.getElementById('dataOrcamento').value,
                validade: document.getElementById('validadeOrcamento').value,
                formaPagamento: document.getElementById('formaPagamento').value,
                parcelas: document.getElementById('parcelas').value,
                desconto: document.getElementById('desconto').value
            },
            tratamentos: [],
            totais: {
                subtotal: parseFloat(subtotalGeralSpan.textContent),
                desconto: parseFloat(valorDescontoSpan.textContent),
                total: parseFloat(valorTotalSpan.textContent),
                valorParcela: parseFloat(valorParcelaSpan.textContent)
            }
        };

        // Coleta dados dos tratamentos
        document.querySelectorAll('.tratamento-item').forEach((item, index) => {
            const counter = item.querySelector('.tipo-tratamento').dataset.counter;
            const tratamento = {
                numero: index + 1,
                categoria: document.getElementById(`tipoTratamento_${counter}`).value,
                procedimento: document.getElementById(`procedimento_${counter}`).value,
                dente: document.getElementById(`dente_${counter}`).value,
                quantidade: document.getElementById(`quantidade_${counter}`).value,
                valorUnitario: document.getElementById(`valorUnitario_${counter}`).value,
                subtotal: document.getElementById(`subtotal_${counter}`).value,
                observacoes: document.getElementById(`observacoes_${counter}`).value
            };
            data.tratamentos.push(tratamento);
        });

        return data;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const formData = collectFormData();
        
        // Adiciona classe de loading
        orcamentoForm.classList.add('loading');
        
        // Simula um pequeno delay para mostrar o loading
        setTimeout(() => {
            generatePDF(formData);
            orcamentoForm.classList.remove('loading');
        }, 500);
    }

    function generatePDF(data) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPosition = margin;
        
        // Função auxiliar para adicionar texto com quebra de linha
        function addText(text, x, y, options = {}) {
            const fontSize = options.fontSize || 10;
            const fontStyle = options.fontStyle || 'normal';
            const maxWidth = options.maxWidth || pageWidth - 2 * margin;
            
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', fontStyle);
            
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, x, y);
            
            return y + (lines.length * fontSize * 0.5);
        }
        
        // Função para verificar se precisa de nova página
        function checkNewPage(requiredSpace) {
            if (yPosition + requiredSpace > pageHeight - margin) {
                doc.addPage();
                yPosition = margin;
                return true;
            }
            return false;
        }
        
        // Cabeçalho
        doc.setFillColor(44, 62, 80);
        doc.rect(0, 0, pageWidth, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('ORÇAMENTO ODONTOLÓGICO', pageWidth / 2, 25, { align: 'center' });
        
        yPosition = 50;
        doc.setTextColor(0, 0, 0);
        
        // Dados da Clínica
        if (data.clinica.nome || data.clinica.dentista) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('DADOS DA CLÍNICA', margin, yPosition);
            yPosition += 10;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            
            if (data.clinica.nome) {
                yPosition = addText(`Clínica: ${data.clinica.nome}`, margin, yPosition);
                yPosition += 5;
            }
            
            if (data.clinica.dentista) {
                yPosition = addText(`Profissional: ${data.clinica.dentista}`, margin, yPosition);
                yPosition += 5;
            }
            
            if (data.clinica.cro) {
                yPosition = addText(`CRO: ${data.clinica.cro}`, margin, yPosition);
                yPosition += 5;
            }
            
            yPosition += 10;
        }
        
        // Dados do Paciente
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('DADOS DO PACIENTE', margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        yPosition = addText(`Nome: ${data.paciente.nome}`, margin, yPosition);
        yPosition += 5;
        
        if (data.paciente.cpf) {
            yPosition = addText(`CPF: ${data.paciente.cpf}`, margin, yPosition);
            yPosition += 5;
        }
        
        if (data.paciente.dataNascimento) {
            const dataNasc = new Date(data.paciente.dataNascimento).toLocaleDateString('pt-BR');
            yPosition = addText(`Data de Nascimento: ${dataNasc}`, margin, yPosition);
            yPosition += 5;
        }
        
        yPosition = addText(`Telefone: ${data.paciente.telefone}`, margin, yPosition);
        yPosition += 5;
        
        if (data.paciente.email) {
            yPosition = addText(`Email: ${data.paciente.email}`, margin, yPosition);
            yPosition += 5;
        }
        
        if (data.paciente.endereco) {
            yPosition = addText(`Endereço: ${data.paciente.endereco}`, margin, yPosition);
            yPosition += 5;
        }
        
        yPosition += 10;
        
        // Dados do Orçamento
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('DADOS DO ORÇAMENTO', margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        const dataOrcamento = new Date(data.orcamento.data).toLocaleDateString('pt-BR');
        yPosition = addText(`Data do Orçamento: ${dataOrcamento}`, margin, yPosition);
        yPosition += 5;
        
        const validadeData = new Date(data.orcamento.data);
        validadeData.setDate(validadeData.getDate() + parseInt(data.orcamento.validade));
        yPosition = addText(`Válido até: ${validadeData.toLocaleDateString('pt-BR')}`, margin, yPosition);
        yPosition += 5;
        
        yPosition += 10;
        
        // Tratamentos
        checkNewPage(50);
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('TRATAMENTOS PROPOSTOS', margin, yPosition);
        yPosition += 15;
        
        // Cabeçalho da tabela
        const tableHeaders = ['Item', 'Procedimento', 'Dente/Região', 'Qtd', 'Valor Unit.', 'Subtotal'];
        const colWidths = [15, 60, 30, 15, 25, 25];
        let xPos = margin;
        
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 10, 'F');
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        
        tableHeaders.forEach((header, index) => {
            doc.text(header, xPos + 2, yPosition);
            xPos += colWidths[index];
        });
        
        yPosition += 10;
        
        // Linhas da tabela
        doc.setFont('helvetica', 'normal');
        
        data.tratamentos.forEach((tratamento, index) => {
            checkNewPage(15);
            
            xPos = margin;
            const rowY = yPosition;
            
            // Zebra striping
            if (index % 2 === 0) {
                doc.setFillColor(250, 250, 250);
                doc.rect(margin, rowY - 5, pageWidth - 2 * margin, 10, 'F');
            }
            
            // Dados da linha
            const rowData = [
                tratamento.numero.toString(),
                tratamento.procedimento,
                tratamento.dente || '-',
                tratamento.quantidade,
                `R$ ${parseFloat(tratamento.valorUnitario).toFixed(2)}`,
                `R$ ${parseFloat(tratamento.subtotal).toFixed(2)}`
            ];
            
            rowData.forEach((data, colIndex) => {
                const maxColWidth = colWidths[colIndex] - 4;
                const lines = doc.splitTextToSize(data, maxColWidth);
                doc.text(lines, xPos + 2, yPosition);
                xPos += colWidths[colIndex];
            });
            
            yPosition += 10;
            
            // Observações (se houver)
            if (tratamento.observacoes) {
                doc.setFontSize(8);
                doc.setFont('helvetica', 'italic');
                yPosition = addText(`Obs: ${tratamento.observacoes}`, margin + 20, yPosition, { fontSize: 8 });
                yPosition += 5;
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
            }
        });
        
        yPosition += 10;
        
        // Totais
        checkNewPage(60);
        
        const totalsX = pageWidth - 80;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Subtotal:`, totalsX - 40, yPosition);
        doc.text(`R$ ${data.totais.subtotal.toFixed(2)}`, totalsX, yPosition, { align: 'right' });
        yPosition += 8;
        
        if (data.totais.desconto > 0) {
            doc.text(`Desconto (${data.orcamento.desconto}%):`, totalsX - 40, yPosition);
            doc.text(`- R$ ${data.totais.desconto.toFixed(2)}`, totalsX, yPosition, { align: 'right' });
            yPosition += 8;
        }
        
        // Linha separadora
        doc.setLineWidth(0.5);
        doc.line(totalsX - 40, yPosition, totalsX, yPosition);
        yPosition += 8;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`TOTAL:`, totalsX - 40, yPosition);
        doc.text(`R$ ${data.totais.total.toFixed(2)}`, totalsX, yPosition, { align: 'right' });
        yPosition += 15;
        
        // Condições de Pagamento
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('CONDIÇÕES DE PAGAMENTO', margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        const formaPagamentoTexto = {
            'a-vista': 'À Vista',
            'cartao': 'Cartão de Crédito',
            'parcelado': 'Parcelado',
            'convenio': 'Convênio'
        };
        
        yPosition = addText(`Forma de Pagamento: ${formaPagamentoTexto[data.orcamento.formaPagamento] || data.orcamento.formaPagamento}`, margin, yPosition);
        yPosition += 5;
        
        if (parseInt(data.orcamento.parcelas) > 1) {
            yPosition = addText(`Parcelamento: ${data.orcamento.parcelas}x de R$ ${data.totais.valorParcela.toFixed(2)}`, margin, yPosition);
            yPosition += 5;
        }
        
        yPosition += 15;
        
        // Observações finais
        checkNewPage(40);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('OBSERVAÇÕES IMPORTANTES', margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        
        const observacoes = [
            '• Este orçamento tem validade limitada conforme data especificada.',
            '• Os valores podem sofrer alterações caso haja mudanças no plano de tratamento.',
            '• O tratamento deve ser iniciado dentro do prazo de validade do orçamento.',
            '• Consultas de retorno e acompanhamento estão incluídas no valor do tratamento.',
            '• Em caso de dúvidas, entre em contato conosco.'
        ];
        
        observacoes.forEach(obs => {
            yPosition = addText(obs, margin, yPosition, { fontSize: 9 });
            yPosition += 5;
        });
        
        // Rodapé
        const footerY = pageHeight - 30;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text('Documento gerado automaticamente pelo sistema OdontoOrçamento', pageWidth / 2, footerY, { align: 'center' });
        doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, footerY + 8, { align: 'center' });
        
        // Salva o PDF
        const nomeArquivo = `Orcamento_${data.paciente.nome.replace(/\\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(nomeArquivo);
        
        // Feedback para o usuário
        alert(`PDF gerado com sucesso!\\nArquivo: ${nomeArquivo}`);
    }

    // Adiciona estilos para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-100%);
            }
        }
    `;
    document.head.appendChild(style);
});

