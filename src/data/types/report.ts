type ReportEntryStatus = 'sucesso' | 'erro';

export type ReportEntry = {
  action: string
  status: ReportEntryStatus
  message?: string
  data?: any
};
