import {AbsoluteFill} from 'remotion';
import {zColor} from '@remotion/zod-types';
import {RemotionUserVideoDef, VideoTypeSchema} from './types/uservideodef'
import { SimpleVideo } from './simple/simple';



//GREENSCREEN IDEA https://www.remotion.dev/docs/video-manipulation#greenscreen-example

export interface ICallbackFunction {
    (arg1: boolean): void;
}

type MyComponentProps = {
  videoDef: RemotionUserVideoDef;
  ttsCallback?:ICallbackFunction, 
}; 

export const MyComposition: React.FC<MyComponentProps> = ({videoDef,ttsCallback}) => {
	///console.log(JSON.stringify(videoDef));
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			{ videoDef.videotype == VideoTypeSchema.Enum.SIMPLE && (
				<>
				<SimpleVideo videoDef={videoDef} ttsCallback={ttsCallback}/>
				</>
			)} 


		</AbsoluteFill>
	);
};
