export enum ReportStatus {
  sucess = 'sucesso',
  error = 'erro',
  pending = 'pendente'
}

type ReportEntryStatus = 'sucesso' | 'erro' | 'pendente';

export type ReportEntry = {
  action: string
  status: ReportEntryStatus
  message?: string
  data?: any
};
