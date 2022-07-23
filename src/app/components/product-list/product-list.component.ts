import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products!: Product[];

  constructor(private producrService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.producrService.getProductList().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  addToCart(item: CartItem) {
    this.cartService.addToCart(item);
  }
}
