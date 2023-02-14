import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { NuxtFormField } from "../../src/runtime/utils/models/decorators/FormDecorator" 

export type UserRoleType = "admin" | "customer" | "analyst"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  @NuxtFormField({ label: 'Email', rules: ['email'], })
  email: string

  @Column({ type: 'varchar' })
  @NuxtFormField({ label: 'First Name', })
  firstName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column({ 
    type: 'enum',
    enum: ['admin', 'customer', 'analyst'],
    default: 'customer',
  })
  role: UserRoleType[]
}
