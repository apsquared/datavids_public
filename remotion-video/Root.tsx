import {Composition, getInputProps} from 'remotion';
import {MyComposition} from './Composition';
import {myCompSchema} from './types/uservideodef'
import {sampleUserVideoDef1} from './samples/default'
import {RemotionUserVideoDef} from './types/uservideodef'
import './style.css';

export const RemotionRoot: React.FC = () => {
	
	let videoDef = {
		videoDef: sampleUserVideoDef1
	}

	const FPS = 30;

	const inputVideoDef = getInputProps();
	if (inputVideoDef && inputVideoDef.videoname){
		console.log("Using passed in property");
		videoDef.videoDef = inputVideoDef as RemotionUserVideoDef;
	} else {
		console.log("Using default data");
	}

	return (
		<>
			<Composition
				id="DataVids"
				component={MyComposition}
				durationInFrames={videoDef.videoDef.durationSec*FPS}
				fps={FPS}
				width={1080}
				height={1920}
				schema={myCompSchema}
				defaultProps={videoDef}
			/>
		</>
	);
};

/*
 Consider something like this to preload the audio 
 */