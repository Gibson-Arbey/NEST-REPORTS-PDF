export class CurrencyFormatter {
    static formatCurrency(value: number): string {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }
  }