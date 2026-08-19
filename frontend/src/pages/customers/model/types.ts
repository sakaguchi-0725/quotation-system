export const CustomerStatus = {
  Active: 'active',
  Closed: 'closed',
} as const
export type CustomerStatus = (typeof CustomerStatus)[keyof typeof CustomerStatus]

export const CustomerStatusLabel: Record<CustomerStatus, string> = {
  [CustomerStatus.Active]: '取引中',
  [CustomerStatus.Closed]: '終了',
}

export type Customer = {
  id: number
  name: string
  contact: string
  registeredAt: string
  status: CustomerStatus
}
