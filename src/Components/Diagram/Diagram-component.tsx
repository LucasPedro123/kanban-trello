import React, { useState } from "react";
import {
    DiagramComponent,
    NodeModel,
    ConnectorModel,
    SymbolPaletteComponent,
    PrintAndExport,
    Inject,
} from "@syncfusion/ej2-react-diagrams";
import { BasicShapes } from "@syncfusion/ej2-react-diagrams";
import './Diagram-style.css'

const App: React.FC = () => {
    // Lista de nós e conectores
    const [nodes, setNodes] = useState<NodeModel[]>([]);
    const [connectors, setConnectors] = useState<ConnectorModel[]>([]);
    const diagramRef = React.useRef<DiagramComponent | null>(null);

    // Objeto para o SymbolPaletteComponent
    const basicShapes: NodeModel[] = [
        { id: "rectangle", shape: { type: "Basic", shape: "Rectangle" } },
        { id: "ellipse", shape: { type: "Basic", shape: "Ellipse" } },
        { id: "diamond", shape: { type: "Basic", shape: "Diamond" } },
    ];
    // Conectores para a paleta de símbolos
    const basicConnectors: ConnectorModel[] = [
        {
            id: "straight",
            type: "Straight",
            sourcePoint: { x: 0, y: 0 },
            targetPoint: { x: 100, y: 100 },
            targetDecorator: { shape: "Arrow" },
        },
        {
            id: "orthogonal",
            type: "Orthogonal",
            sourcePoint: { x: 0, y: 0 },
            targetPoint: { x: 100, y: 100 },
            targetDecorator: { shape: "Arrow" },
        },
        {
            id: "bezier",
            type: "Bezier",
            sourcePoint: { x: 0, y: 0 },
            targetPoint: { x: 100, y: 100 },
            targetDecorator: { shape: "Arrow" },
        },
    ];

    const addNode = (shape: BasicShapes) => {
        const newNode: NodeModel = {
            id: `node-${nodes.length + 1}`,
            offsetX: 100 + nodes.length * 50,
            offsetY: 100,
            shape: { type: "Basic", shape: shape }, // Use a variável `shape` corretamente tipada
        };
        setNodes([...nodes, newNode]);
    };

    const addConnector = (sourceID: string, targetID: string) => {
        const newConnector: ConnectorModel = {
            id: `connector-${connectors.length + 1}`,
            sourceID: sourceID,
            targetID: targetID,
            type: "Orthogonal", // Tipo de conector
            targetDecorator: { shape: "Arrow", width: 10, height: 10 },
            segments: [
                { type: "Orthogonal", length: 50, direction: "Right" },
                { type: "Orthogonal", length: 200, direction: "Bottom" },
            ],
        };
        setConnectors([...connectors, newConnector]);
    };

    // Função para imprimir o diagrama
    const printDiagram = () => {
        if (diagramRef.current) {
            const printOptions = {}; // Defina as opções de impressão, se necessário
            diagramRef.current.print(printOptions); // Use um argumento, mesmo que vazio
        }
    };

    return (
        <div className="diagram-container"> {/* Aplicação da classe CSS */}
        <button className="print-button" onClick={printDiagram}> {/* Estilo para o botão */}
          Imprimir Diagrama
        </button>
  
        <div style={{ display: "flex" }}>
          <SymbolPaletteComponent
            id="symbolpalette"
            palettes={[
              {
                id: "basicShapes",
                expanded: true,
                symbols: basicShapes,
                title: "Shapes",
              },
              {
                id: "connectors",
                expanded: true,
                symbols: basicConnectors,
                title: "Connectors",
              },
            ]}
            width={150}
            height={100}
            symbolHeight={40}
            symbolWidth={40}
            className="symbol-palette" // Estilo para a paleta
          />
  
          <DiagramComponent
            id="diagram"
            ref={diagramRef}
            width={"100%"}
            height={"490px"}
            nodes={nodes}
            connectors={connectors}
            className="diagram" // Aplicação do estilo
            getNodeDefaults={(node: NodeModel) => {
              node.height = 50;
              node.width = 140;
              return node;
            }}
            getConnectorDefaults={(connector: ConnectorModel) => {
              connector.type = "Orthogonal";
              connector.targetDecorator = { shape: "Arrow", width: 10 };
              return connector;
            }}
            dragEnter={(args) => {
              const node = args.element as NodeModel;
              if (node) {
                node.width = 200;
                node.height = 200;
              }
            }}
          >
            <Inject services={[PrintAndExport]} />
          </DiagramComponent>
        </div>
      </div>
    );
};

export default App;
