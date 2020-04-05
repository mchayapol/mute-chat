import React, { useEffect } from 'react';

import {
    Container,
    Button,
    Row, Col,
} from 'react-bootstrap';

import * as faceapi from 'face-api.js';

import LineChart from './LineChart';
import Webcam from "react-webcam"; // https://openbase.io/js/react-webcam

const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "user"
};

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'
const MTCNN = 'mtcnn'

let selectedFaceDetector = SSD_MOBILENETV1

// ssd_mobilenetv1 options
let minConfidence = 0.5

// tiny_face_detector options
let inputSize = 512
let scoreThreshold = 0.5

//mtcnn options
let minFaceSize = 20
let modelLoaded = false

export default function MuteChat() {
    const webcamRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const chartRef = React.useRef(null);


    var data = {
        // labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Width",
            fill: false,
            fillColor: "rgba(0,0,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            backgroundColor: "rgba(0,0,220,0.2)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [41, 92, 45, 62, 14, 12, 11, 32, 68, 98, 10, 112]
        }, {
            label: "Height",
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [41, 24, 5, 6, 7, 76, 87, 8, 6, 34, 45, 79, 88, 7, 33, 4, 7, 98]
        }]
    };

    // const capture = React.useCallback(
    //     () => {
    //         const imageSrc = webcamRef.current.getScreenshot();
    //         console.log(imageSrc);
    //     },
    //     [webcamRef]
    // );

    useEffect(() => {
        async function loadModels() {
            await faceapi.loadSsdMobilenetv1Model('/models')
            await faceapi.loadFaceLandmarkModel('/models')
            
            // await faceapi.loadMtcnnModel('/models')  // Deprecated
            // await faceapi.loadFaceLandmarkTinyModel('/models')
            // await faceapi.loadFaceRecognitionModel('/models')
            // await faceapi.loadFaceExpressionModel('/models')
            console.log('loadModels')

            const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
            const videoEl = webcamRef.current
            videoEl.srcObject = stream
        }

        loadModels()
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "blue";
        ctx.fillStyle = '#444';
        ctx.stroke();
    });

    const getFaceDetectorOptions = () => {
        return selectedFaceDetector === SSD_MOBILENETV1
            ? new faceapi.SsdMobilenetv1Options({ minConfidence })
            : (
                selectedFaceDetector === TINY_FACE_DETECTOR
                    ? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
                    : new faceapi.MtcnnOptions({ minFaceSize })
            )
    }

    const getCurrentFaceDetectionNet = function () {
        if (selectedFaceDetector === SSD_MOBILENETV1) {
            return faceapi.nets.ssdMobilenetv1
        }
        if (selectedFaceDetector === TINY_FACE_DETECTOR) {
            return faceapi.nets.tinyFaceDetector
        }
        if (selectedFaceDetector === MTCNN) {
            return faceapi.nets.mtcnn
        }
    }

    const isFaceDetectionModelLoaded = function () {
        return !!getCurrentFaceDetectionNet().params
    }


    const onPlay = (v) => {
        async function processFace() {
            // console.log("Oh yeah")
            // var videoEl = webcamRef.current.video
            var videoEl = webcamRef.current
            // const videoEl = webcamRef.current.getScreenshot()
            // videoEl = "webcam"
            // console.log('videoEl', videoEl)
            // console.log('!isFaceDetectionModelLoaded()', !isFaceDetectionModelLoaded())
            if (videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded()) {
                // if (videoEl.paused || videoEl.ended || !modelLoaded) {
                // console.log(`onPlay pre-condition failed.
                //         \tselectedFaceDetector ${selectedFaceDetector}
                //         \faceapi.nets.ssdMobilenetv1 ${faceapi.nets.ssdMobilenetv1}
                //         \tvideoEl.paused ${videoEl.paused}
                //         \tvideoEl.ended ${videoEl.ended}
                //         \t!isFaceDetectionModelLoaded() ${!isFaceDetectionModelLoaded()}`)
                return setTimeout(() => onPlay())
            }

            const options = getFaceDetectorOptions()
            // console.log('options', options)
            const result = await faceapi.detectSingleFace(videoEl, options).withFaceLandmarks()
            // console.log('result', result)

            if (result && result.landmarks) {
                const canvas = canvasRef.current

                // const [x,y] = result.landmarks.positions[1];
                // console.log('result',x,y)
                // const p = result.landmarks.positions
                // console.log('result', p)

                // const landmarkPositions = result.landmarks.positions
                const landmarks = result.landmarks
                // console.log('landmarks', landmarks)

                // or get the positions of individual contours,
                // only available for 68 point face ladnamrks (FaceLandmarks68)
                const mouth = landmarks.getMouth()
                // const jawOutline = landmarks.getJawOutline()
                // const nose = landmarks.getNose()
                // const leftEye = landmarks.getLeftEye()
                // const rightEye = landmarks.getRightEye()
                // const leftEyeBbrow = landmarks.getLeftEyeBrow()
                // const rightEyeBrow = landmarks.getRightEyeBrow()

                // console.log(mouth.length)
                // let canvas = $('#overlay').get(0);
                let ctx = canvas.getContext('2d');
                // let ctx = document.getElementById('mouthCanvas').getContext('2d');
                ctx.beginPath();
                let scale = 3.0
                let dx = mouth[0].x - 30
                let dy = mouth[0].y - 30
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = "blue";
                ctx.fillStyle = '#444';

                // ctx.moveTo((mouth[0].x - dx) * scale, (mouth[0].y - dy) * scale);
                // mouth.forEach(p => {
                //   // console.log(p.x, p.y)
                //   ctx.lineTo((p.x - dx) * scale, (p.y - dy) * scale);
                // })
                // ctx.lineTo((mouth[0].x - dx) * scale, (mouth[0].y - dy) * scale);

                // let p1 = mouth[3];
                // p1.x = (p1.x - dx) * scale
                // p1.y = (p1.y - dy) * scale
                ctx.beginPath();
                mouth.forEach((p, i) => {
                    let px = parseInt((p.x - dx) * scale)
                    let py = parseInt((p.y - dy) * scale)
                    ctx.strokeText(i, px, py);
                    // ctx.arc((p.x - dx) * scale, (p.y - dy) * scale, 5, 0, 2 * Math.PI);
                    ctx.stroke();
                })


                let height = mouth[9].y - mouth[3].y
                let width = mouth[8].x - mouth[0].x

                data.datasets[0].data.push(width);
                if (data.datasets[0].data.length > 100)
                    data.datasets[0].data.shift();

                data.datasets[1].data.push(height);
                if (data.datasets[1].data.length > 100)
                    data.datasets[1].data.shift();

                // let chart = chartRef.current.chart
                // chart.update()

            }

        }
        processFace();
        setTimeout(() => onPlay())
    }

    return (
        <Container fluid>
            <Row>
                <Col rowSpan={2}>
                    {/* <Webcam
                        id="webcam"
                        audio={false}
                        // height={720}
                        // width={1280}
                        ref={webcamRef}
                        onUserMedia={onPlay}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    /> */}
                    <video
                        ref={webcamRef}
                        onLoadedMetadata={onPlay}
                        id="inputVideo"
                        // src={navigator.mediaDevices.getUserMedia({ video: {} })}
                        autoPlay
                        muted
                        playsInline
                        width={400} />
                    <br />
                    {/* <Button variant="outline-dark" onClick={capture}>Capture photo</Button> */}

                </Col>
                <Col>
                    <canvas id="mouthCanvas" ref={canvasRef} width={400} height={200} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <LineChart
                        // ref={chartRef} 
                        width={800}
                        height={200}
                        data={data} />
                </Col>
            </Row>
        </Container>
    )
}