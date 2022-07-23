import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class productDetailsComponent implements OnInit {
  product!: Product;
  id!: number | string | null;

  qty: number = 1;
  qtyOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private productService: ProductsService, private cartService: CartService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
  }

  ngOnInit(): void {
    this.getProductById()
  }

  getProductById() {
    this.productService.getProductList().subscribe((res: Product[]) => {
      this.product = res.find(item => item.id == this.id)!;
    })
  }

  addToCart() {
    this.cartService.addToCart({ product: this.product, quantity: this.qty });
  }

}
