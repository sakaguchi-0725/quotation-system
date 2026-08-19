export const DealStatus = {
  NotCreated: 'not_created',
  Presenting: 'presenting',
  Won: 'won',
  Lost: 'lost',
} as const
export type DealStatus = (typeof DealStatus)[keyof typeof DealStatus]

export const DealStatusLabel: Record<DealStatus, string> = {
  [DealStatus.NotCreated]: '未作成',
  [DealStatus.Presenting]: '提示中',
  [DealStatus.Won]: '受注',
  [DealStatus.Lost]: '失注',
}

export type FilterKey = 'all' | DealStatus

export type Deal = {
  id: number
  name: string
  customer: string
  owner: string
  status: DealStatus
  updatedAt: string
}
