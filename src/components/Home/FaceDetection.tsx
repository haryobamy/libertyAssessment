import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

import useCustomDisclosure from '@/hooks/useDisclosure';
import { drawRect } from '@/lib/utils/utilis';

import Light from '../icons/Light';
import Microphone from '../icons/Microphone';
import WebcamLogo from '../icons/WebcamLogo';
import Wifi from '../icons/Wifi';
import Modal from '../shared/Modal';
import GadgetCheck from './gadgetCheck';

function FaceDetection() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioActive, setAudioActive] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [speed, setSpeed] = useState<number>(0);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const navigate = useNavigate();

  const { isOpen, open, close } = useCustomDisclosure();

  const [screenshot, setImageSrc] = useState<string | null>(null);

  const measureConnectionSpeed = async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos'; //
    const startTime = new Date().getTime();
    const maxSpeedMbps = 0.004449145399609284;

    const options: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      //   console.log('response', response);

      if (!response.ok) throw new Error('Network response was not ok');
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000; // Time in seconds
      const contentLength = response.headers.get('content-length');

      // If content-length is not available, use a default value (e.g., 500 bytes)
      const fileSize = contentLength ? parseFloat(contentLength) : 500;

      const speedBps = fileSize / duration; // Speed in bytes per second
      const speedKbps = (speedBps * 8) / 1024; // Speed in kilobits per second
      const speedMbps = speedKbps / 1024; // Speed in megabits per second

      const speedPercentage = (speedMbps / maxSpeedMbps) * 100;

      return speedPercentage;
    } catch (error) {
      console.error('Error measuring connection speed:', error);
      return 0;
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      open();
    }
  }, [webcamRef]);

  useEffect(() => {
    // Function to initialize TensorFlow.js and load model
    const loadModel = async () => {
      try {
        // Set preferred backend
        const preferredBackend = 'webgl'; // or 'wasm' or 'cpu'
        await tf.setBackend(preferredBackend);

        // Load your model
        const loadedModel = await tf.loadGraphModel(
          'http://localhost:8080/model.json'
        );
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    // Call loadModel function
    loadModel();

    // Clean up on unmount if needed
    return () => {
      if (model) {
        model.dispose(); // Dispose TensorFlow resources on component unmount
      }
    };
  });

  useEffect(() => {
    const checkSpeed = async () => {
      const measuredSpeed = await measureConnectionSpeed();
      console.log('firstSpeed', measuredSpeed);
      setSpeed(measuredSpeed);
    };

    checkSpeed();
  });

  const detect = async (net: cocossd.ObjectDetection) => {
    // Check data is available

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      (webcamRef.current.video as HTMLVideoElement).readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      const videoWidth = (webcamRef.current.video as HTMLVideoElement)
        .videoWidth;
      const videoHeight = (webcamRef.current.video as HTMLVideoElement)
        .videoHeight;

      // Set video width
      (webcamRef.current.video as HTMLVideoElement).width = videoWidth;
      (webcamRef.current.video as HTMLVideoElement).height = videoHeight;

      if (canvasRef.current) {
        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        const obj = await net.detect(video as HTMLVideoElement);
        //   console.log(obj);

        // Draw mesh
        const ctx = canvasRef.current.getContext(
          '2d'
        ) as CanvasRenderingContext2D;
        drawRect(obj, ctx);
      }
    }
  };

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log('coococ');
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const handleUserMedia = (stream: MediaStream) => {
    const audioTrack = stream.getAudioTracks()[0];
    setAudioActive(audioTrack?.enabled ?? false);

    const videoTrack = stream.getVideoTracks()[0];
    setVideoActive(videoTrack?.enabled ?? false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current && canvasRef.current) {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context && video) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const data = imageData.data;
          let totalBrightness = 0;

          for (let i = 0; i < data.length; i += 4) {
            // Calculate the brightness of the pixel
            const cambrightness =
              0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            totalBrightness += cambrightness;
          }

          const avgBrightness = totalBrightness / (data.length / 4);
          setBrightness(avgBrightness);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    runCoco();
  });

  return (
    <div className="py-8 flex items-start flex-col gap-10 sm:flex-col">
      <div className="flex  gap-10 items-center sm:flex-col sm:w-full sm:px-5">
        <div className="border-1 rounded-2xl border-solid border-red-500 w-[340px] h-[260px] relative sm:w-[300px] sm:h-[200px]">
          <Webcam
            ref={webcamRef}
            muted={true}
            className="absolute top-0 left-0 w-full h-full z-[9] rounded-xl"
            audio={true}
            onUserMedia={handleUserMedia}
          />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-[10] pointer-events-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GadgetCheck
            label="Webcam"
            icon={WebcamLogo}
            percentage={videoActive ? 100 : 0}
          />
          <GadgetCheck label="Internet Speed" percentage={speed} icon={Wifi} />
          <GadgetCheck
            label="Gadget mic"
            percentage={audioActive ? 100 : 0}
            icon={Microphone}
          />
          <GadgetCheck percentage={brightness} label="Lighting" icon={Light} />
        </div>
      </div>

      <button
        className="bg-primary text-white text-lg font-light px-4 py-2 cursor-pointer rounded-md"
        onClick={capture}
      >
        Take picture and continue
      </button>

      <Modal isOpen={isOpen} onClose={close}>
        <div className=" rounded-2xl w-[500px] bg-white sm:w-[350px] ">
          <div
            role="header"
            className="flex justify-between items-center bg-primary px-4 pt-8 pb-2 text-white rounded-tl-2xl rounded-tr-2xl  "
          >
            <h2 className="text-lg font-semibold">Start assessment</h2>
            <button
              onClick={close}
              className="bg-[#b0a4e9] font-light text-sm text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
          <div className="bg-primaryLight container mx-auto px-10 py-8">
            <h2 className="text-xl font-[500] text-center text-primary sm:text-lg">
              Proceed to start assessment
            </h2>
            <p className="mt-2 text-center text-sm font-[400] text-[#675E8B] sm:text-xs">
              Kindly keep to the rules of the assessment and sit up, stay in
              front of your camera/webcam and start your assessment.
            </p>
          </div>

          <div
            role="footer"
            className="bg-white w-full flex items-center justify-end py-4 px-7 rounded-bl-2xl rounded-br-2xl "
          >
            <button
              onClick={() => navigate('/assessment', { state: { screenshot } })}
              className="bg-primary text-white text-lg font-light px-4 py-2 cursor-pointer rounded-lg"
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FaceDetection;
