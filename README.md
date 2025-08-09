# Sistema de Orçamento Odontológico

## Descrição

O **OdontoOrçamento** é um sistema web completo desenvolvido para gerar orçamentos de tratamentos odontológicos, com foco especial em cirurgia oral e implantes dentários. O sistema oferece opções tanto para implantes nacionais quanto importados, permitindo a geração de orçamentos profissionais em formato PDF.

## Características Principais

### 🦷 Especialização em Odontologia
- Foco em cirurgia oral e implantes dentários
- Base de dados com preços de implantes nacionais e importados
- Categorização por marcas (Neodent, SIN, Conexão, Straumann, Nobel Biocare, Zimmer)
- Procedimentos específicos como enxertos ósseos, membranas e próteses

### 💻 Interface Moderna e Responsiva
- Design profissional com gradientes e animações
- Layout responsivo para desktop e mobile
- Formulários organizados em seções lógicas
- Validação em tempo real dos campos

### 📊 Funcionalidades Avançadas
- Cálculo automático de subtotais e totais
- Sistema de descontos percentuais
- Opções de parcelamento
- Formatação automática de CPF e telefone
- Validação de campos obrigatórios

### 📄 Geração de PDF Profissional
- PDFs com layout profissional
- Cabeçalho personalizado
- Tabelas organizadas com tratamentos
- Informações completas do paciente e clínica
- Condições de pagamento detalhadas
- Observações importantes

## Estrutura do Projeto

```
odontologia-orcamento/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos CSS
├── js/
│   └── script.js       # Lógica JavaScript
└── README.md           # Documentação
```

## Como Usar

### 1. Abertura do Sistema
- Abra o arquivo `index.html` em qualquer navegador moderno
- O sistema funciona offline, não requer servidor

### 2. Preenchimento dos Dados

#### Dados do Paciente
- **Nome Completo**: Campo obrigatório
- **CPF**: Formatação automática (opcional)
- **Data de Nascimento**: Campo obrigatório
- **Telefone**: Campo obrigatório com formatação automática
- **Email**: Campo opcional
- **Endereço**: Campo opcional

#### Dados da Clínica
- **Nome da Clínica**: Identificação do estabelecimento
- **Cirurgião-Dentista**: Nome do profissional responsável
- **CRO**: Registro profissional
- **Data do Orçamento**: Preenchida automaticamente com a data atual

### 3. Adição de Tratamentos

#### Categorias Disponíveis
1. **Cirurgia Oral**
   - Extração Simples (R$ 150,00)
   - Extração de Siso (R$ 350,00)
   - Extração de Siso Incluso (R$ 500,00)
   - Apicectomia (R$ 600,00)
   - Cirurgia Periodontal (R$ 400,00)
   - Frenectomia (R$ 300,00)
   - Biópsia (R$ 250,00)
   - Remoção de Cisto (R$ 800,00)

2. **Implantes Dentários**
   - **Nacionais:**
     - Implante Nacional (Neodent) - R$ 1.500,00
     - Implante Nacional (SIN) - R$ 1.400,00
     - Implante Nacional (Conexão) - R$ 1.600,00
   - **Importados:**
     - Implante Importado (Straumann) - R$ 3.000,00
     - Implante Importado (Nobel Biocare) - R$ 3.200,00
     - Implante Importado (Zimmer) - R$ 2.800,00
   - **Complementares:**
     - Enxerto Ósseo Autógeno - R$ 1.200,00
     - Enxerto Ósseo Sintético - R$ 800,00
     - Membrana Reabsorvível - R$ 600,00
     - Coroa sobre Implante (Nacional) - R$ 800,00
     - Coroa sobre Implante (Importada) - R$ 1.200,00
     - Prótese Total sobre Implantes - R$ 8.000,00
     - Prótese Protocolo - R$ 12.000,00

#### Para Cada Tratamento
- **Categoria**: Selecione entre Cirurgia Oral ou Implantes Dentários
- **Procedimento**: Escolha o procedimento específico (carrega automaticamente o valor)
- **Dente/Região**: Especifique a localização (ex: 11, 21-23, Região posterior)
- **Quantidade**: Número de procedimentos
- **Valor Unitário**: Preenchido automaticamente, mas pode ser editado
- **Observações**: Campo opcional para informações adicionais

### 4. Condições de Pagamento

- **Desconto**: Percentual de desconto aplicado ao total
- **Forma de Pagamento**: À Vista, Cartão de Crédito, Parcelado ou Convênio
- **Número de Parcelas**: De 1x até 12x
- **Validade do Orçamento**: Padrão de 30 dias

### 5. Geração do PDF

1. Preencha todos os campos obrigatórios
2. Adicione pelo menos um tratamento
3. Clique em "Gerar Orçamento em PDF"
4. O arquivo será baixado automaticamente

## Recursos Técnicos

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Lógica de negócio
- **jsPDF**: Biblioteca para geração de PDFs
- **Font Awesome**: Ícones profissionais

### Compatibilidade
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Funcionalidades JavaScript
- Validação de formulários
- Formatação automática de campos
- Cálculos em tempo real
- Geração dinâmica de elementos
- Manipulação de eventos
- Geração de PDFs

## Personalização

### Alteração de Preços
Para alterar os preços dos tratamentos, edite o objeto `tratamentos` no arquivo `js/script.js`:

```javascript
const tratamentos = {
    'Cirurgia Oral': {
        'Extração Simples': 150,
        // ... outros procedimentos
    },
    'Implantes Dentários': {
        'Implante Nacional (Neodent)': 1500,
        // ... outros procedimentos
    }
};
```

### Personalização Visual
- Cores: Edite as variáveis CSS no arquivo `css/style.css`
- Logo: Substitua o ícone Font Awesome no HTML
- Layout: Modifique as classes CSS conforme necessário

## Suporte e Manutenção

### Backup dos Dados
- O sistema não armazena dados permanentemente
- Cada orçamento é gerado independentemente
- Recomenda-se salvar os PDFs gerados

### Atualizações de Preços
- Atualize regularmente os valores no arquivo JavaScript
- Considere a inflação e mudanças no mercado
- Mantenha compatibilidade com tabelas de convênios

## Licença

Este sistema foi desenvolvido especificamente para uso em clínicas odontológicas. Todos os direitos reservados.

---

**Desenvolvido com foco na excelência em atendimento odontológico** 🦷✨

