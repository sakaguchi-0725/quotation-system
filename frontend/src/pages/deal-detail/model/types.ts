export const QuoteStatus = {
  Presenting: 'presenting',
  Won: 'won',
  Lost: 'lost',
  Revised: 'revised',
} as const
export type QuoteStatus = (typeof QuoteStatus)[keyof typeof QuoteStatus]

export const QuoteStatusLabel: Record<QuoteStatus, string> = {
  [QuoteStatus.Presenting]: '提示中（回答待ち）',
  [QuoteStatus.Won]: '受注',
  [QuoteStatus.Lost]: '失注',
  [QuoteStatus.Revised]: '改訂',
}

export type QuoteVersion = {
  id: number
  version: string
  amount: number
  createdAt: string
  isLatest: boolean
}

export type Deal = {
  name: string
  customer: string
  owner: string
  registeredAt: string
  status: QuoteStatus
}
