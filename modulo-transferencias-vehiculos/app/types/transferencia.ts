export interface Transferencia {
	id: number
	plate: string
	type: TransferType
	client: string
	transmitter: string
	service: number
	created_at?: string
}

export type TransferType = 'Venta' | 'Cesión'


