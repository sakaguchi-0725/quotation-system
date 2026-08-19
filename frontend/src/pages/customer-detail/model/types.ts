export const CustomerStatus = {
  Active: 'active',
  Closed: 'closed',
} as const
export type CustomerStatus = (typeof CustomerStatus)[keyof typeof CustomerStatus]

export const CustomerStatusLabel: Record<CustomerStatus, string> = {
  [CustomerStatus.Active]: '取引中',
  [CustomerStatus.Closed]: '終了',
}

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

export type Customer = {
  name: string
  contact: string
  registeredAt: string
  status: CustomerStatus
}

export type Deal = {
  id: number
  name: string
  owner: string
  status: DealStatus
  updatedAt: string
}
