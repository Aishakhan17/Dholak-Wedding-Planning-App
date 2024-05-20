import Navbar from '../../components/Navbar'
import { useUpdate } from '../../utils/Context'
import OtherBoards from "../../components/OtherBoards"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const {user, isAuthenticated} = useUpdate()
    const navigate = useNavigate()

    if (isAuthenticated) {
        return (
            <div className='h-full min-h-screen mx-auto w-5/6'>
                <Navbar />
                <div className='bg-foreground rounded-md h-fit min-h-screen'>
                    <div className='mt-10'>
                        <h4 className="p-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Hello {user.data.firstName}</h4>
                        <h4 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">Here's what's happened since you last checked in</h4>
                        <div>
                            <OtherBoards />
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
    else {
        navigate("/")
    }
}

export default Home