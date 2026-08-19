export const LayoutKey = {
  Private: 'private',
} as const
export type LayoutKey = (typeof LayoutKey)[keyof typeof LayoutKey]

declare module 'vue-router' {
  // vue-routerの型拡張は宣言マージが前提のためinterfaceを使用
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface RouteMeta {
    layout?: LayoutKey
  }
}
