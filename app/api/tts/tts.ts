import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import md5 from 'md5'; 
import {
	SpeechConfig,
	SpeechSynthesisResult,
	SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk';

import { VALID_VOICES } from '@/remotion-video/common/tts/ttsclient';



export interface TTS_RESULT{
	audiourl:string,
	durationMs:number,
}

export const textToSpeech = async (
	text: string,
	voice: keyof typeof VALID_VOICES
): Promise<TTS_RESULT> => {
	const speechConfig = SpeechConfig.fromSubscription(
		process.env.AZURE_TTS_KEY || '',
		process.env.AZURE_TTS_REGION || ''
	);

	if (!VALID_VOICES[voice]) { 
		throw new Error('Voice not found '+voice);
	}

	const fileName = `${md5(text)}_${voice}.mp3`;

	const fileExists = await checkIfAudioHasAlreadyBeenSynthesized(fileName);

	if (fileExists) {
		const url = createS3Url(fileName);
		//console.log("returning already created file");
		return {
			audiourl:url,
			durationMs:0,
		}
	}

	const synthesizer = new SpeechSynthesizer(speechConfig);

	//https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-synthesis-markup-voice
	const ssml = `
                <speak version="1.0" xml:lang="en-US">
                    <voice name="${VALID_VOICES[voice]}">
                        <break time="100ms" /> 
						<prosody rate="5%">${text}</prosody>
                    </voice>
                </speak>`;

	const result = await new Promise<SpeechSynthesisResult>(
		(resolve, reject) => {
			synthesizer.speakSsmlAsync(
				ssml,
				(res) => {
					resolve(res);
				},
				(error) => {
					reject(error);
					synthesizer.close();
				}
			);
		}
	);
	const {audioData} = result;
	const {audioDuration} = result;

	//console.log("Audio duration "+audioDuration);

	synthesizer.close();

	await uploadTtsToS3(audioData, fileName);

	const url = createS3Url(fileName);
	return {
		audiourl:url,
		durationMs: audioDuration,
	}
};

const checkIfAudioHasAlreadyBeenSynthesized = async (fileName: string) => {
	const bucketName = process.env.AWS_S3_BUCKET_NAME;
	const awsRegion = process.env.AWS_S3_REGION;
	const s3 = new S3Client({
		region: awsRegion,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
		},
	});

	try {
		return await s3.send(
			new GetObjectCommand({Bucket: bucketName, Key: fileName})
		);
	} catch {
		return false;
	}
};

const uploadTtsToS3 = async (audioData: ArrayBuffer, fileName: string) => {
	const bucketName = process.env.AWS_S3_BUCKET_NAME;
	const awsRegion = process.env.AWS_S3_REGION;
	const s3 = new S3Client({
		region: awsRegion,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
		},
	});

	return s3.send(
		new PutObjectCommand({
			Bucket: bucketName,
			Key: fileName,
			Body: new Uint8Array(audioData),
		})
	);
};

const createS3Url = (filename: string) => {
	const bucketName = process.env.AWS_S3_BUCKET_NAME;

	return `https://${bucketName}.s3.amazonaws.com/${filename}`;
};