import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { CreateVideoJSON } from './jsonedit';



const CreateVideoPage = async() => {
    
    const session = await getServerSession( authOptions);
    if (!session || !session.user){
        redirect('/signin');
        return;
    }

    return (
        <CreateVideoJSON/>
    )


}

export default CreateVideoPage