// Chips de año para listados (Artículos y WP, Estudios, Prensa): salen de los datos, no se escriben a mano.
// Con muchos años, los más antiguos se agrupan en «Anteriores» para que la fila de chips no se desborde.
export const chipsAnio = (items, max = 5) => {
  const anios = [...new Set(items.map((i) => i.anio).filter(Boolean))].sort((a, b) => b.localeCompare(a));
  const visibles = anios.length > max + 1 ? anios.slice(0, max) : anios;
  const hayAnteriores = visibles.length < anios.length || items.some((i) => !i.anio);
  return {
    chips: [...visibles.map((a) => ({ valor: a, label: a })), ...(hayAnteriores ? [{ valor: 'anteriores', label: 'Anteriores' }] : [])],
    valorDe: (anio) => (anio && visibles.includes(anio) ? anio : 'anteriores'),
  };
};
