import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

/**
 * Formata valor para moeda brasileira
 */
function formatCurrency(value) {
  if (!value) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Formata data para o padrão brasileiro
 */
function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Formata data e hora para o padrão brasileiro
 */
function formatDateTime(date) {
  if (!date) return '-'
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Gera o recibo PDF da locação
 * @param {Object} location - Dados da locação
 */
export function generateLocationReport(location) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  
  let y = margin
  
  // ========== BORDA DO RECIBO ==========
  doc.setDrawColor(102, 126, 234)
  doc.setLineWidth(1)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
  
  // Linha decorativa interna
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26)
  
  // ========== HEADER ==========
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(102, 126, 234)
  doc.text('SUBLIME FESTAS', pageWidth / 2, y + 10, { align: 'center' })
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text('Locacao de Espacos para Eventos', pageWidth / 2, y + 18, { align: 'center' })
  
  y += 28
  
  // Linha separadora
  doc.setDrawColor(102, 126, 234)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)
  
  y += 8
  
  // ========== TÍTULO DO RECIBO ==========
  doc.setFillColor(102, 126, 234)
  doc.rect(margin, y, contentWidth, 12, 'F')
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('RECIBO DE LOCACAO', pageWidth / 2, y + 8, { align: 'center' })
  
  y += 20
  
  // ========== NÚMERO E DATA ==========
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(50, 50, 50)
  doc.text(`Recibo N.: ${String(location.id).padStart(6, '0')}`, margin, y)
  doc.text(`Data de Emissao: ${formatDateTime(new Date())}`, pageWidth - margin, y, { align: 'right' })
  
  y += 12
  
  // ========== DADOS DO CLIENTE ==========
  doc.setFillColor(245, 245, 245)
  doc.rect(margin, y, contentWidth, 28, 'F')
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 100, 100)
  doc.text('CLIENTE', margin + 5, y + 8)
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 30, 30)
  doc.text(location.user?.name || 'N/A', margin + 5, y + 18)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(location.user?.email || 'N/A', margin + 5, y + 25)
  
  y += 35
  
  // ========== DETALHES DA LOCAÇÃO ==========
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 100, 100)
  doc.text('DETALHES DA LOCACAO', margin, y)
  
  y += 8
  
  // Tabela de detalhes
  const detailsData = [
    ['Data do Evento', formatDate(location.data)],
    ['Status', location.status],
    ['Data de Cadastro', formatDateTime(location.data_cadastro)]
  ]
  
  autoTable(doc, {
    startY: y,
    body: detailsData,
    margin: { left: margin, right: margin },
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 4,
      textColor: [50, 50, 50]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: contentWidth - 50 }
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    }
  })
  
  y = doc.lastAutoTable.finalY + 10
  
  // ========== DESCRIÇÃO ==========
  if (location.desc_festa) {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(100, 100, 100)
    doc.text('DESCRICAO DO EVENTO', margin, y)
    
    y += 6
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(50, 50, 50)
    const descLines = doc.splitTextToSize(location.desc_festa, contentWidth)
    doc.text(descLines, margin, y + 4)
    y += (descLines.length * 5) + 10
  }
  
  // ========== SERVIÇOS ==========
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 100, 100)
  doc.text('SERVICOS CONTRATADOS', margin, y)
  
  y += 6
  
  if (location.servico && location.servico.length > 0) {
    const servicosData = location.servico.map((s, index) => [
      `${index + 1}`,
      s.nomeServico,
      formatCurrency(s.valor)
    ])
    
    autoTable(doc, {
      startY: y,
      head: [['#', 'Descricao', 'Valor']],
      body: servicosData,
      margin: { left: margin, right: margin },
      headStyles: {
        fillColor: [102, 126, 234],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [50, 50, 50]
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: contentWidth - 55 },
        2: { cellWidth: 40, halign: 'right' }
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      }
    })
    
    y = doc.lastAutoTable.finalY + 5
  } else {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(150, 150, 150)
    doc.text('Nenhum servico adicional', margin, y + 6)
    y += 15
  }
  
  // ========== RESUMO FINANCEIRO ==========
  y += 5
  
  // Cálculos
  const valorFesta = parseFloat(location.valor_festa) || 0
  const totalServicos = location.servico?.reduce((acc, s) => acc + parseFloat(s.valor || 0), 0) || 0
  const valorTotal = valorFesta + totalServicos
  
  // Linha separadora
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(pageWidth - margin - 80, y, pageWidth - margin, y)
  
  y += 8
  
  // Subtotais à direita
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  
  doc.text('Valor da Locacao:', pageWidth - margin - 80, y)
  doc.text(formatCurrency(valorFesta), pageWidth - margin, y, { align: 'right' })
  
  y += 7
  
  doc.text('Servicos Adicionais:', pageWidth - margin - 80, y)
  doc.text(formatCurrency(totalServicos), pageWidth - margin, y, { align: 'right' })
  
  y += 5
  
  // Linha antes do total
  doc.setDrawColor(102, 126, 234)
  doc.setLineWidth(0.5)
  doc.line(pageWidth - margin - 80, y, pageWidth - margin, y)
  
  y += 8
  
  // Total
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(46, 125, 50)
  doc.text('TOTAL:', pageWidth - margin - 80, y)
  doc.text(formatCurrency(valorTotal), pageWidth - margin, y, { align: 'right' })
  
  // ========== STATUS DE PAGAMENTO ==========
  y += 15
  
  const statusColor = location.status === 'PAGO' ? [46, 125, 50] : [255, 152, 0]
  const statusText = location.status === 'PAGO' ? 'PAGO' : 'PENDENTE'
  
  doc.setFillColor(...statusColor)
  doc.roundedRect(pageWidth - margin - 50, y, 50, 15, 2, 2, 'F')
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text(statusText, pageWidth - margin - 25, y + 10, { align: 'center' })
  
  // ========== FOOTER ==========
  const footerY = pageHeight - 35
  
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY, pageWidth - margin, footerY)
  
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(130, 130, 130)
  doc.text('Este documento serve como comprovante de locacao.', pageWidth / 2, footerY + 8, { align: 'center' })
  doc.text('Sublime Festas - Transformando momentos em memorias', pageWidth / 2, footerY + 14, { align: 'center' })
  
  // Salvar
  doc.save(`recibo-locacao-${location.id}.pdf`)
}

export default { generateLocationReport }
