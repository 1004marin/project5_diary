import React, { useRef, useState } from 'react';
import { fabric } from 'fabric';

const DiaryDrawPage = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [textValue, setTextValue] = useState('');
    const [drawMode, setDrawMode] = useState(false);

    // Canvas 초기화
    const initializeCanvas = () => {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: drawMode, // 그림 그리기 모드 설정
        });
        setCanvas(newCanvas);
    };

    // 텍스트 삽입
    const addText = () => {
        if (!canvas || !textValue) return;

        const text = new fabric.Textbox(textValue, {
            left: 100,
            top: 100,
            fontSize: 20,
            fontFamily: 'Arial',
            fill: 'black',
        });
        canvas.add(text);
    };

    // 이미지 삽입
    const addImage = (url) => {
        if (!canvas) return;

        fabric.Image.fromURL(url, (img) => {
            img.set({ left: 100, top: 100 });
            canvas.add(img);
        });
    };

    // 도형 삽입
    const addShape = (shapeType) => {
        if (!canvas) return;

        let shape;
        switch (shapeType) {
            case 'circle':
                shape = new fabric.Circle({ radius: 50, fill: 'red', left: 100, top: 100 });
                break;
            case 'rectangle':
                shape = new fabric.Rect({ width: 100, height: 50, fill: 'blue', left: 100, top: 100 });
                break;
            // 다른 도형 추가 가능
            default:
                return;
        }

        canvas.add(shape);
    };

    // 그림 파일로 저장
    const saveAsImage = () => {
        if (!canvas) return;

        const dataURL = canvas.toDataURL({ format: 'png' });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.png';
        link.click();
    };

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600}></canvas>
            <div>
                <button onClick={initializeCanvas}>Initialize Canvas</button>
                <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Enter text" />
                <button onClick={addText}>Add Text</button>
                <button onClick={() => addImage('/path/to/image.jpg')}>Add Image</button>
                <button onClick={() => addShape('circle')}>Add Circle</button>
                <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
                <button onClick={saveAsImage}>Save as Image</button>
                <button onClick={() => setDrawMode(!drawMode)}>{drawMode ? 'Exit Draw Mode' : 'Enter Draw Mode'}</button>
            </div>
        </div>
    );
};


export default DiaryDrawPage;
