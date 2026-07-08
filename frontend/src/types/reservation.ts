import type { Customer } from './customer'
import type { Table } from './table'

export interface Reservation {
  id: string

  customer: Customer

  table: string

  table_detail: Table

  reservation_date: string

  reservation_time: string

  guests: number
}