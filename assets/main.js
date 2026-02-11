document.addEventListener('DOMContentLoaded', () => {
  const waitlistForm = document.querySelector('[data-waitlist-form]');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const note = waitlistForm.querySelector('[data-form-note]');
      const message = waitlistForm.dataset.disabledMessage || 'Demo form — submission disabled';
      if (note) note.textContent = message;
    });
  }

  const amountInput = document.querySelector('[data-amount]');
  const yearsInput = document.querySelector('[data-years]');
  const amountOutput = document.querySelector('[data-amount-output]');
  const yearsOutput = document.querySelector('[data-years-output]');
  const finalOutput = document.querySelector('[data-final]');
  const profitOutput = document.querySelector('[data-profit]');
  const growthOutput = document.querySelector('[data-growth]');

  const formatCurrency = (value) =>
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  const recalc = () => {
    if (!amountInput || !yearsInput) return;
    const amount = Number(amountInput.value);
    const years = Number(yearsInput.value);
    const annualRate = 0.16;
    const finalAmount = amount * Math.pow(1 + annualRate, years);
    const profit = finalAmount - amount;
    const growth = (profit / amount) * 100;

    if (amountOutput) amountOutput.textContent = formatCurrency(amount);
    if (yearsOutput) yearsOutput.textContent = `${years}`;
    if (finalOutput) finalOutput.textContent = formatCurrency(finalAmount);
    if (profitOutput) profitOutput.textContent = formatCurrency(profit);
    if (growthOutput) growthOutput.textContent = `${growth.toFixed(1)}%`;
  };

  if (amountInput && yearsInput) {
    amountInput.addEventListener('input', recalc);
    yearsInput.addEventListener('input', recalc);
    recalc();
  }

  const modal = document.querySelector('[data-policy-modal]');
  const openPolicy = document.querySelector('[data-open-policy]');
  const closePolicy = document.querySelector('[data-close-policy]');

  const closeModal = () => {
    if (modal) modal.classList.remove('show');
  };

  if (openPolicy && modal) {
    openPolicy.addEventListener('click', (event) => {
      event.preventDefault();
      modal.classList.add('show');
    });
  }

  if (closePolicy) closePolicy.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
  }
});
