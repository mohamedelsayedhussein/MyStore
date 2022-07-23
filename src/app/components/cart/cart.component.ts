import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  confirmation: boolean = false;
  dur: number = 10;
  form!: FormGroup;

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems$ = this.cartService.getCartItemsList();
  }

  ngOnInit(): void {
    this.getCartItems();
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(6)]),
      creditNumber: new FormControl('', [Validators.required, Validators.pattern("^([0-9]{4}[\s-]?){3}([0-9]{4})$")]),
    })
  }

  get fullName() {
    return this.form.get('fullName');
  }

  get address() {
    return this.form.get('address');
  }

  get creditNumber() {
    return this.form.get('creditNumber');
  }

  calcCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem("cart")!);
    const total = cartItems.reduce((acc: number, cur: CartItem) => acc + (cur.product.price * cur.quantity), 0);
    return total;
  }

  getCartItems() {
    this.cartService.getCartItems();
  }

  updateCart() {
    this.cartService.updateCart();
  }

  deleteProduct(id: number) {
    this.cartService.deleteProduct(id);
  }

  onSubmit() {
    this.confirmation = true;
    setTimeout(() => {
      this.router.navigateByUrl('/products');
    }, this.dur * 1000)
  }
}
