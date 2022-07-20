import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column()
    name: string;

    @Column()
    qty: number;
}

export default Product;