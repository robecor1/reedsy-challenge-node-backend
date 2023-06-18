export type PostExportBody = {
  bookId: string,
  type: ExportBodyType
}

export type ExportBodyType = "epub" | "pdf"
