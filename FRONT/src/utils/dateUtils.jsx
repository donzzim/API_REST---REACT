/**
 * Formata uma data no formato YYYY-MM-DD para DD/MM/YYYY
 * @param {string} inputDate - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada no formato DD/MM/YYYY ou mensagem de erro
 */
export function formatDate(inputDate) {
  if (!inputDate) {
    return false;
  }
 
  // Divide a string (data no formato: YYYY-MM-DD ) 
  const [year, month, day] = inputDate.split("-");

  // Extrai ano, mês e dia da string (data no formato: YYYYMMDD)
  // const dataString = inputDate.toString(); 
  // const year = dataString.substring(0, 4);
  // const month = dataString.substring(4, 6);
  // const day = dataString.substring(6, 8);

  // Cria a data como local (mês é 0-indexado no Date)
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

/**
 * Verifica se uma data é válida
 * @param {string} inputDate - Data no formato YYYY-MM-DD
 * @returns {boolean} True se a data for válida, false caso contrário
 */
// export function isValidDate(inputDate) {
//   const date = new Date(inputDate);
//   return !isNaN(date.getTime());
// }
