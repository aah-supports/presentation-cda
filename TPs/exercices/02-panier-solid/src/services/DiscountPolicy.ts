export interface DiscountPolicy {
  apply(subtotal: number): number;
}
