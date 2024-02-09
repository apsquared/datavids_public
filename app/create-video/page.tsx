import { getServerSession } from 'next-auth'
import {authOptions} from '@/utils/authutil'
import { redirect } from 'next/navigation'
import { getUserVideoRequests } from '@/dbutil/videoreqdb'
import CreateVideo2 from './createvideo2'


const CreateVideoPage = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {
    
    const session = await getServerSession( authOptions);

    if (!session || !session.user){
        redirect('/signin');
        return;
    }

    const userid = session.user.id;
    const results = await getUserVideoRequests(userid);
    
    let templateId:string | undefined = undefined;
    if (searchParams && searchParams['videoid']){
        templateId = searchParams['videoid'] as string;
    }
    let fromAI:boolean = false;
    if (searchParams && searchParams['fromAI']){
        if (searchParams['fromAI'] == 'true'){
            fromAI = true;
        }
    }

    return (
        <CreateVideo2 myvideos={results} templateParam={templateId} fromAI={fromAI}/>
    )
}

export default CreateVideoPage