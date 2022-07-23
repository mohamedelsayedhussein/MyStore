import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartItems: CartItem[] = [];
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  constructor() { }

  getCartItemsList(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  addToCart(item: CartItem): void {
    if ("cart" in localStorage) {
      this.cartItems = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartItems.find(el => el.product.id === item.product.id);
      if (exist) {
        alert("Product is already in your cart");
      } else {
        this.cartItems.push(item);
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
        alert("Added to your cart");
      }
    } else {
      this.cartItems.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
      alert("Added to your cart");
    }
  }

  getCartItems(): void {
    if ("cart" in localStorage) {
      this.cartItems = JSON.parse(localStorage.getItem("cart")!);
    };
    this.cartItems$.next(this.cartItems);
  }

  updateCart(): void {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.cartItems$.next(this.cartItems);
  }

  deleteProduct(id: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== id);
    this.updateCart();
  }
}
