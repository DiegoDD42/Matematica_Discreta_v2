import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { create, all } from "mathjs";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Registrando componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Instância do math.js
const math = create(all);

const FunctionGraph = () => {
  const [funcaoTexto, setFuncaoTexto] = useState(""); // Função digitada pelo usuário
  const [funcaoFinal, setFuncaoFinal] = useState(""); // Função após debounce
  const [dados, setDados] = useState({ x: [], y: [] }); // Dados para o gráfico
  const [xMin, setXMin] = useState(-5); // Valor mínimo de x
  const [xMax, setXMax] = useState(5); // Valor máximo de x
  const [points, setPoints] = useState(100); // Número de pontos no intervalo

  useEffect(() => {
    if (funcaoFinal) {
      try {
        const parsedFunction = math.compile(funcaoFinal); // Compila a função com math.js
        const step = (xMax - xMin) / (points - 1); // Define o passo entre os pontos
        const xValues = Array.from({ length: points }, (_, i) => xMin + i * step); // Gera valores de x
        const yValues = xValues.map((x) => parsedFunction.evaluate({ x })); // Avalia a função para cada x
        setDados({ x: xValues, y: yValues });
      } catch (err) {
        console.error("Erro ao interpretar a função:", err);
        setDados({ x: [], y: [] });
      }
    }
  }, [funcaoFinal, xMin, xMax, points]);

  const data = {
    labels: dados.x,
    datasets: [
      {
        label: `Gráfico de y = ${funcaoFinal || "f(x)"}`,
        data: dados.y,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear", // Define o tipo de escala para o eixo x
        title: { display: true, text: "x" },
      },
      y: {
        type: "linear", // Define o tipo de escala para o eixo y
        title: { display: true, text: "y" },
      },
    },
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Gráfico a partir de uma Função Matemática</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Digite a função matemática (ex: x^2, sin(x))"
            value={funcaoTexto}
            onChange={(e) => setFuncaoTexto(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            onClick={() => setFuncaoFinal(funcaoTexto)}
            disabled={funcaoTexto === funcaoFinal}
          >
            Plotar Gráfico
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Label>Valor mínimo de x</Form.Label>
          <Form.Control
            type="number"
            value={xMin}
            onChange={(e) => setXMin(parseFloat(e.target.value))}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Valor máximo de x</Form.Label>
          <Form.Control
            type="number"
            value={xMax}
            onChange={(e) => setXMax(parseFloat(e.target.value))}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Número de pontos</Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value, 10))}
          />
        </Col>
      </Row>

      <Row style={{ height: "500px" }}>
        <Col>
          <Line data={data} options={options} />
        </Col>
      </Row>
    </Container>
  );
};

export default FunctionGraph;

