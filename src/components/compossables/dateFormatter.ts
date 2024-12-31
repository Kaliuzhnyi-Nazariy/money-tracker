export const dateFormatted = ({ dateBefore }: { dateBefore: Date | string | null | undefined }) => {
  const date = new Date(dateBefore || new Date())

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${month}-${day}-${year}`
}
