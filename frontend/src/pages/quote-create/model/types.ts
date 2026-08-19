export type EstimateMethod = 'bottom-up' | 'fp'
export type FpType = 'EI' | 'EO' | 'EQ' | 'ILF' | 'EIF'
export type Complexity = '低' | '中' | '高'

export type BottomUpFeature = {
  id: number
  name: string
  effort: string
}

export type FpFeature = {
  id: number
  name: string
  type: FpType
  complexity: Complexity
}
