import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Output() item = new EventEmitter();
  
  qty: number = 1;
  qtyOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {
    this.qtyOptions = Array(10).fill(0).map((_x, i) => i + 1);
  }

  ngOnInit(): void {
  }

  addToCart() {
    this.item.emit({ item: this.product, quantity: this.qty })
  }

}
