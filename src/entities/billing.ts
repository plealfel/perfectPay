import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Billing {
  @PrimaryColumn()
  id?: string;

  @Column("datetime")
  createdAt?: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  value?: number;

  @Column()
  customer?: string;

  @Column()
  type?: string;

  @Column()
  status?: string;

  @Column("text", { nullable: true })
  bankslipLink?: string | null;

  @Column("varchar", { length: 255, nullable: true }) 
  bankslipCode?: string | null;

  @Column("varchar", { length: 255, nullable: true }) 
  pixKey?: string | null;
}
