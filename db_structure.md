# Estrutura do Banco de Dados (MongoDB)

## 1. Usuários (Users)
- `name`: String
- `email`: String (unique)
- `password`: String (hashed)
-`CPF`: String (unique)
- `role`: Enum ['admin', 'operator', 'stockist', 'manager', 'customer']
- `active`: Boolean

## 2. Categorias (Categories)
- `name`: String (unique)
- `description`: String

## 3. Fornecedores (Suppliers)
- `name`: String
- `cnpj_cpf`: String (unique)
- `email`: String
- `phone`: String
- `address`: String

## 4. Clientes (Customers)
- `name`: String
- `email`: String
- `phone`: String
- `document`: String

## 5. Produtos (Products)
- `code`: String (unique)
- `name`: String
- `category`: ObjectId (ref: Category)
- `costPrice`: Number
- `salePrice`: Number
- `stockQuantity`: Number
- `minStock`: Number
- `active`: Boolean

## 6. Movimentações de Estoque (StockMovements)
- `type`: Enum ['in', 'out', 'adjustment']
- `product`: ObjectId (ref: Product)
- `quantity`: Number
- `date`: Date
- `supplier`: ObjectId (ref: Supplier, optional for 'in')
- `customer`: ObjectId (ref: Customer, optional for 'out')
- `unitPrice`: Number
- `paymentMethod`: String (for 'out')
- `user`: ObjectId (ref: User)
- `notes`: String
