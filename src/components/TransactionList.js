import "./TransactionList.css"
import { useFireStore } from "../hooks/useFirestore"

export default function TransactionList({ documents }) {
  const { deleteDocument } = useFireStore("transactions")
  return (
    <ul className="transactionList grid">
        { documents.map((doc) => (
            <li key={doc.id}>
                <p className="name">{doc.name}</p>
                <p className="amount">${doc.amount}</p>
                <button onClick={() => deleteDocument(doc.id)}>x</button>
            </li>
        )) }
    </ul>
  )
}
