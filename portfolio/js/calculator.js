export function initCalculator() {
    const scopeSelect = document.getElementById('calc-scope');
    const designSelect = document.getElementById('calc-design');
    const speedSelect = document.getElementById('calc-speed');
    const totalOutput = document.getElementById('calc-total');
    const timelineOutput = document.getElementById('calc-timeline');
    const whatsappBtn = document.getElementById('calc-whatsapp-btn');

    if (!scopeSelect || !designSelect || !speedSelect || !totalOutput) return;

    function calculate() {
        const scopeVal = parseInt(scopeSelect.value) || 3500;
        const designVal = parseFloat(designSelect.value) || 1.0;
        const speedVal = parseInt(speedSelect.value) || 0;

        const subtotal = (scopeVal * designVal) + speedVal;
        const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(subtotal);
        
        totalOutput.textContent = formattedTotal;

        // Estimate timeline based on scope
        let weeks = "2 a 3 semanas";
        if (scopeVal >= 6000 && scopeVal < 10000) {
            weeks = "3 a 4 semanas";
        } else if (scopeVal >= 10000) {
            weeks = "4 a 6 semanas";
        }
        if (timelineOutput) timelineOutput.textContent = weeks;

        // Update WhatsApp message link
        if (whatsappBtn) {
            const scopeText = scopeSelect.options[scopeSelect.selectedIndex].text;
            const designText = designSelect.options[designSelect.selectedIndex].text;
            const msg = `Olá! Gostaria de solicitar um orçamento para a Nexus Digital.%0A- Escopo: ${scopeText}%0A- Padrão Visual: ${designText}%0A- Investimento Estimado: ${formattedTotal} (${weeks})`;
            whatsappBtn.href = `https://wa.me/5511999999999?text=${msg}`;
        }
    }

    scopeSelect.addEventListener('change', calculate);
    designSelect.addEventListener('change', calculate);
    speedSelect.addEventListener('change', calculate);

    calculate();
}
