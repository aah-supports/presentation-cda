import { CartItem } from "../models/CartItem";
import { DiscountPolicy } from "./DiscountPolicy";

export class CartService {
  private items: CartItem[] = [];

  constructor(private readonly discountPolicy: DiscountPolicy) {}

  getItems(): CartItem[] {
    return [...this.items];
  }

  addItem(item: CartItem): void {
    if (!item.product || item.quantity <= 0) {
      throw new Error("Invalid cart item");
    }

    const existing = this.items.find((i) => i.product.id === item.product.id);
    if (existing) {
      existing.quantity += item.quantity;
      return;
    }

    this.items.push(item);
  }

  removeItem(productId: number): boolean {
    const before = this.items.length;
    this.items = this.items.filter((i) => i.product.id !== productId);
    return this.items.length < before;
  }

  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    return this.discountPolicy.apply(subtotal);
  }
}
