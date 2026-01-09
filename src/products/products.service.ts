import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity'; 

@Injectable()
export class ProductsService {
  // 10 products
  private products: Product[] = [
    { id: 1, name: 'เครื่องปิ้งขนมปัง (Toaster)', description: 'เครื่องปิ้งขนมปัง 2 ช่อง ปรับความร้อนได้ 6 ระดับ', price: 299 },
    { id: 2, name: 'กาต้มน้ำไฟฟ้า (Electric Kettle)', description: 'กาต้มน้ำความจุ 1.7 ลิตร ตัดไฟอัตโนมัติ', price: 150 },
    { id: 3, name: 'พัดลมตั้งพื้น (Pedestal Fan)', description: 'พัดลมตั้งพื้นขนาด 16 นิ้ว ปรับส่ายได้ 3 ระดับ', price: 918 },
    { id: 4, name: 'เตารีดไอน้ำ (Steam Iron)', description: 'เตารีดไอน้ำ กำลังไฟ 1500W พร้อมฟังก์ชันรีดแนวตั้ง', price: 549 },
    { id: 5, name: 'เครื่องดูดฝุ่น (Vacuum Cleaner)', description: 'เครื่องดูดฝุ่นแบบไร้ถุงเก็บฝุ่น กำลังดูดสูง', price: 1590 },
    { id: 6, name: 'ไมโครเวฟ (Microwave Oven)', description: 'เตาอบไมโครเวฟความจุ 20 ลิตร ฟังก์ชันละลายน้ำแข็ง', price: 1490 },
    { id: 7, name: 'เครื่องฟอกอากาศ (Air Purifier)', description: 'เครื่องฟอกอากาศ กรองฝุ่น PM 2.5 ครอบคลุมพื้นที่ 30 ตร.ม.', price: 2590 },
    { id: 8, name: 'หม้อหุงข้าวไฟฟ้า (Rice Cooker)', description: 'หม้อหุงข้าวขนาด 1.8 ลิตร พร้อมระบบอุ่นอัตโนมัติ', price: 289 },
    { id: 9, name: 'เครื่องปรับอากาศ (Air Conditioner)', description: 'เครื่องปรับอากาศ 9,000 BTU ระบบ Inverter ประหยัดไฟ', price: 11290 },
    { id: 10, name: 'โทรทัศน์ Smart TV (Smart TV)', description: 'โทรทัศน์ 4K UHD Smart TV ขนาด 55 นิ้ว', price: 9900 },
];

create(createProductDto: CreateProductDto) { 

  const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1; 

   

  const newProduct: Product = { 

    id: newId, 

    ...createProductDto, // นำข้อมูลจาก DTO (name, price, description) มาใส่เลย 

    description: createProductDto.description ?? '', 

  }; 
    this.products.push(newProduct); 

    return newProduct; 

  } 

 

  findAll() { 

    // return `This action returns all products`; 

    return this.products; 

  } 

 

  findOne(id: number) { 

    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product; 

  } 

  /* Black Friday 30% discount
  getBlackFridayDiscounts() { //สร้างฟังก์ชัน
    const discountPercentage = 30;
    return this.products.map(product => ({
      ...product, //ดึงข้อมูลสินค้าเดิม
      discountedPrice: Math.round(product.price * (1 - discountPercentage / 100) * 100) / 100 
    }));
  }
*/
  update(id: number, updateProductDto: UpdateProductDto) { 

    const productIndex = this.products.findIndex(product => product.id === id); 

    if (productIndex !== -1) { 

      const updatedProduct = { 

        ...this.products[productIndex], 

        ...updateProductDto, 

      }; 

      this.products[productIndex] = updatedProduct; 

      return updatedProduct; 

    } 

    throw new NotFoundException('Product not found'); 

  }
  remove(id: number) { 

    const productIndex = this.products.findIndex(product => product.id === id); 

    if (productIndex !== -1) { 

      this.products.splice(productIndex, 1); 

      return { deleted: true }; 

    } 

    throw new NotFoundException('Product not found'); 
  }
}