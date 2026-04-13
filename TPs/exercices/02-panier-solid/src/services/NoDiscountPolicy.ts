import { DiscountPolicy } from "./DiscountPolicy";

export class NoDiscountPolicy implements DiscountPolicy {
  apply(subtotal: number): number {
    return subtotal;
  }
}
