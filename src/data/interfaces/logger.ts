export interface Logger {
  info: (log: any) => Promise<void>
}
