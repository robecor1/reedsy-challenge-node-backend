export type PostImportBody = {
  bookId: string,
  type: "word" | "pdf" | "wattpad" | "evernote",
  url: string
}