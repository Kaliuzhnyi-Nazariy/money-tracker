export function convertToISO(dateString: string): string {
  try {
    const [month, day, year] = dateString.split('-')
    const formattedDate = new Date(`${year}-${month}-${day}`)
    return formattedDate.toISOString().split('T')[0] //
  } catch (error) {
    console.log('error: ', error)
    return new Date().toLocaleDateString('fr-CA')
  }
}
