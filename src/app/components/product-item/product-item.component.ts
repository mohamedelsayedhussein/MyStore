import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  numbers: number[];

  constructor() {
    this.numbers = Array(10).fill(0).map((_x, i) => i + 1);
  }

  ngOnInit(): void {
  }

}
