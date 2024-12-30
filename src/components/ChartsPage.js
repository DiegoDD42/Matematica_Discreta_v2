import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Container, Row, Col, Form } from "react-bootstrap";

// Registrando componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const ChartsPage = () => {
  const [tipoGrafico, setTipoGrafico] = useState("bar"); // Tipo de gráfico selecionado

  // Dados compartilhados entre os gráficos
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Vendas em 2024",
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuração do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Gráficos de Vendas" },
    },
  };

  // Renderiza o gráfico com base no tipo selecionado
  const renderGrafico = () => {
    switch (tipoGrafico) {
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      default:
        return null;
    }
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Diferentes Tipos de Gráficos</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Select
            value={tipoGrafico}
            onChange={(e) => setTipoGrafico(e.target.value)}
            aria-label="Selecione o tipo de gráfico"
          >
            <option value="bar">Gráfico de Barras</option>
            <option value="line">Gráfico de Linhas</option>
            <option value="pie">Gráfico de Setores</option>
          </Form.Select>
        </Col>
      </Row>

      <Row style={{ height: "500px" }}>
        <Col>{renderGrafico()}</Col>
      </Row>
    </Container>
  );
};

export default ChartsPage;
