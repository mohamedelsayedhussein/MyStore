import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products!: Product[];

  constructor(private producrService: ProductsService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.producrService.getProductList().subscribe(res => {
      this.products = res;
    });
  }
}
