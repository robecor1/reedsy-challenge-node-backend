export type PostImportBody = {
  bookId: string,
  type: ImportBodyType,
  url: string
}

export type ImportBodyType = "word" | "pdf" | "wattpad" | "evernote"
