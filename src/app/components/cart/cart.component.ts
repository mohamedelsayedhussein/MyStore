import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.getCartProducts();

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

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    };
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  detectChange() {
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  onSubmit() {
    this.success = true;
  }
}
