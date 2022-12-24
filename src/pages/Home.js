import './Home.css'
import TransactionForm from './TransactionForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import TransactionList from '../components/TransactionList'


export default function Home() {

  const { user } = useAuthContext()
  const { documents, error } = useCollection("transactions", ["uid", "==", user.uid])


  return (
    <div className='homeContainer container grid'>
      <div className='content'>
        { error && <p>{error}</p> }
        { documents && <TransactionList documents={documents}/> }
      </div>
      <div className='sidebar'>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}
