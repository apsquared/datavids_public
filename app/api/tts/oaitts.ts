import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import md5 from 'md5'; 

import OpenAI from "openai";

import { VALID_VOICES } from '@/remotion-video/common/tts/ttsclient';
import { SpeechCreateParams } from 'openai/resources/audio/speech';

const openai = new OpenAI();


export interface TTS_RESULT{
	audiourl:string,
	durationMs:number,
}

export const textToSpeechOAI = async (
	text: string,
	voice: keyof typeof VALID_VOICES
): Promise<TTS_RESULT> => {
	

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

	type ValidOAIVoice = "alloy" | "shimmer" | "echo" | "fable" | "onyx" | "nova";

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: VALID_VOICES[voice] as ValidOAIVoice,
        input: text,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());

	await uploadTtsToS3(buffer, fileName);

	const url = createS3Url(fileName);
	return {
		audiourl:url,
		durationMs: 0,
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