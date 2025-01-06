'use client'

import { TransferFormPage} from '@components/templates'

import { useParams } from 'next/navigation'

export default function EditTransfer() {
	const { id } = useParams()

	return <TransferFormPage transferId={Number(id)} />
}
