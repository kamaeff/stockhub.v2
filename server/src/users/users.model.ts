import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  chat_id: string;

  @Column
  username: string;

  @Column
  data_reg: string;

  @Column
  local: string;

  @Column
  orders_conut: number;

  @Column
  bonus_count: number;

  @Column
  gender_option: string;

  @Column
  style: string;

  @Column
  email: string;

  @Column
  fio: string;
}
