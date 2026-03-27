/** Valores exibidos na seção de preços (mensal / anual). */
export const PLANS = {
  essential: { monthly: 24.9, yearly: 249.0 },
  pro: { monthly: 39.9, yearly: 399.0 },
};

export function formatBRL(n) {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
