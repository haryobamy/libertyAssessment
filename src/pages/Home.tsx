import FaceDetection from '@/components/Home/FaceDetection';

function Home() {
  return (
    <div className="bg-white h-full max-w-[1000px] mx-auto p-6 rounded-lg w-full xs:max-w-full sm:max-w-full">
      <h4 className="font-[500] text-xl text-black mb-2">System check</h4>
      <p className="font-[400] text-sm text-[#4a4a68]">
        We utilize your camera image to ensure fairness for all participants,
        and we also employ both your camera and microphone for a video questions
        where you will be prompted to record a response using your camera or
        webcam, so it's essential to verify that your camera and microphone are
        functioning correctly and that you have a stable internet connection. To
        do this, please position yourself in front of your camera, ensuring that
        your entire face is clearly visible on the screen. This includes your
        forehead, eyes, ears, nose, and lips. You can initiate a 5-second
        recording of yourself by clicking the button below.
      </p>

      <FaceDetection />
    </div>
  );
}

export default Home;
