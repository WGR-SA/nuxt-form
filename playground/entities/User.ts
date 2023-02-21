import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { IsEmail, IsAlpha, MinLength } from 'class-validator'
import { NuxtFormField } from "../../src/runtime/utils/models/decorator"

export type UserRoleType = "admin" | "customer" | "analyst"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  @IsEmail()
  @NuxtFormField({ label: 'Email' })
  email: string

  @Column({ type: 'varchar' })
  //@IsAlpha()
  @NuxtFormField({ label: 'First Name', })
  firstName: string

  @Column({ type: 'varchar' })
  //@IsAlpha()
  @MinLength(3)
  lastName: string

  @Column({ 
    type: 'enum',
    enum: ['admin', 'customer', 'analyst'],
    default: 'customer',
  })
  role: UserRoleType[]
}
