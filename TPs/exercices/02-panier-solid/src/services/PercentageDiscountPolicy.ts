import { DiscountPolicy } from "./DiscountPolicy";

export class PercentageDiscountPolicy implements DiscountPolicy {
  constructor(private readonly percentage: number) {}

  apply(subtotal: number): number {
    const ratio = Math.max(0, Math.min(100, this.percentage)) / 100;
    return subtotal * (1 - ratio);
  }
}
