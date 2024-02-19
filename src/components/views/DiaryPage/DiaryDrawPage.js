import React, { useRef, useState } from 'react';
import { fabric } from 'fabric';

const DiaryDrawPage = ({ onSaveDrawing }) => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [textValue, setTextValue] = useState('');
    const [drawingMode, setDrawingMode] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [penColor, setPenColor] = useState('#000000');
    const [penWidth, setPenWidth] = useState(1)
    const [eraseWidth, setEraseWidth] = useState(1)

    //그림 저장 상태
    const [hasDrawing, setHasDrawing] = useState(false);

    // Canvas 초기화
    const initializeCanvas = () => {
        if (!canvasRef.current) return; // 캔버스가 없으면 종료

        if (!canvas) { // 캔버스가 없으면 새로 생성
            const newCanvas = new fabric.Canvas(canvasRef.current, {
                isDrawingMode: false,
                selection: true,
            });
            setCanvas(newCanvas);
            bindCanvasEvents(newCanvas); // 이벤트 바인딩 추가
            setHasDrawing(true);
        } else { // 이미 캔버스가 있으면 초기화
            canvas.clear();
        }
    };

    // 텍스트 삽입
    const addText = () => {
        if (!canvas || !textValue) return;

        const text = new fabric.Textbox(textValue, {
            left: 100,
            top: 100,
            fontSize: 20,
            fontFamily: 'Arial',
            fill: selectedColor, // 선택된 색상 적용
        });
        canvas.add(text);
    };

    // 이미지 삽입
    const addImage = (file) => {
        if (!canvas || !file) return;
    
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
                const image = new fabric.Image(imgObj, {
                    left: 100,
                    top: 100,
                    scaleX: 0.5,
                    scaleY: 0.5,
                });
                canvas.add(image);
            };
        };
        reader.readAsDataURL(file);
    };

    // 도형 삽입
    const addShape = (shapeType) => {
        if (!canvas) return;

        let shape;
        switch (shapeType) {
            case 'circle':
                shape = new fabric.Circle({ radius: 50, fill: selectedColor, left: 100, top: 100 });
                break;
            case 'rectangle':
                shape = new fabric.Rect({ width: 100, height: 50, fill: selectedColor, left: 100, top: 100 });
                break;
            // 다른 도형 추가 가능
            default:
                return;
        }

        canvas.add(shape);
    };

    // Canvas 모두 지우기
    const clearCanvas = () => {
        if (!canvas) return;
        canvas.clear();
    };

    // 펜 그리기 모드 토글
    const toggleDrawingMode = () => {
        if (!canvas) return;
        canvas.isDrawingMode = !drawingMode;
        setDrawingMode(!drawingMode);
    };

    // 마우스 다운 이벤트 핸들러
    const handleMouseDown = (event) => {
        if (!canvas || !drawingMode) return;
        
        const pointer = canvas.getPointer(event.e);
        const { x, y } = pointer;
        
        // 펜 모드인 경우
        if (drawingMode) {
            const path = new fabric.Path(`M ${x} ${y}`, {
                stroke: penColor, // 펜 색상 적용
                strokeWidth: 2,
                fill: 'transparent',
            });
            canvas.add(path);
            canvas.renderAll();

            path.path.push(`L ${x} ${y}`);
            path.setCoords();
        }
    };

    // 색상 변경
    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    // 펜 색상 변경
    const handlePenColorChange = (e) => {
        setPenColor(e.target.value);
        if (canvas && canvas.isDrawingMode) {
            canvas.freeDrawingBrush.color = e.target.value;
        }
    };
        // 펜의 굵기 변경
const handlePenWidthChange = (width) => {
    setPenWidth(width);
    canvas.freeDrawingBrush.width = width;
};
//지우개 굵기 변경
const handleEraseWidthChange = (width) => {
    setEraseWidth(width);
    canvas.freeDrawingBrush.width = width;
};
    // 지우개 기능
const toggleEraser = () => {
    if (!canvas) return;

    if (!isErasing) {
        canvas.freeDrawingBrush.color = '#ffffff'; // 펜 색상을 배경 색상으로 변경하여 지우개 역할 수행
        canvas.isDrawingMode = true; // 그리기 모드 활성화
    } else {
        canvas.freeDrawingBrush.color = selectedColor; // 원래 색상으로 변경하여 그리기 모드로 변경
        canvas.isDrawingMode = drawingMode; // 그리기 모드 설정
    }

    setIsErasing(!isErasing); // 지우개 상태 업데이트
};

    // Canvas 이벤트 바인딩
    const bindCanvasEvents = (canvas) => {
        canvas.on('mouse:down', handleMouseDown);
        // 다른 이벤트 바인딩 추가 가능
    };
    // 그린 그림 데이터를 저장하고 부모 컴포넌트에 전달
    const saveDrawingData = () => {
        if (!canvas) return;
        if (hasDrawing) {
            const drawingData = canvas.toDataURL({ format: 'png' }); // Base64 형식의 이미지 데이터
            onSaveDrawing(drawingData); // 부모 컴포넌트에 전달
        } else {
            onSaveDrawing(null); // 부모 컴포넌트에 NULL 값 전달
        }
    };
    return (
        <div>
            <canvas ref={canvasRef}  width={800} height={600}></canvas>
            <div>
                <button type="button" onClick={initializeCanvas}>Initialize Canvas</button>
                <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} placeholder="Enter text" />
                <button type="button" onClick={addText}>Add Text</button>
                <input type="file" accept="image/*" onChange={(e) => addImage(e.target.files[0])} />
                
                <button type="button" onClick={() => addShape('circle')}>Add Circle</button>
                <button type="button" onClick={() => addShape('rectangle')}>Add Rectangle</button>
                <button type="button" onClick={clearCanvas}>Clear Canvas</button>
                <button type="button" onClick={toggleDrawingMode}>{drawingMode ? 'Disable Drawing Mode' : 'Enable Drawing Mode'}</button>
                <input type="color" value={selectedColor} onChange={handleColorChange} />
                <input type="color" value={penColor} onChange={handlePenColorChange} />

                <br/>
                <input type="range" min="1" max="10" value={penWidth} onChange={(e) => handlePenWidthChange(parseInt(e.target.value))} />
                <input type="range" min="1" max="10" value={eraseWidth} onChange={(e) => handleEraseWidthChange(parseInt(e.target.value))} />
                <button type="button" onClick={toggleEraser}>{isErasing ? 'Disable Eraser' : 'Enable Eraser'}</button>
                <button type="button" onClick={saveDrawingData}>Save Drawing</button>
            </div>
        </div>
    );
};
export default DiaryDrawPage;
