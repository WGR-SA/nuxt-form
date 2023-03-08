import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
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
  @NuxtFormField({ label: 'AVS', mask: '###.####.####.##', placeholder: '756.0000.0000.00' })
  avs: string

  @Column({ type: 'varchar' })
  //@IsAlpha()
  @IsNotEmpty()
  @NuxtFormField({ label: 'Nom', mask: 'A' })
  lastName!: string

  @Column({ type: 'varchar' })
  //@IsAlpha()
  @MinLength(3)
  @NuxtFormField({ label: 'Prénom', mask: 'A' })
  firstName: string

  @Column({ 
    type: 'enum',
    enum: ['admin', 'customer', 'analyst'],
    default: 'customer',
  })
  role: UserRoleType[]
}
