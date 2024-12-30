import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

const Grouping = () => {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [anos, setAnos] = useState([]);

  const adicionarAluno = () => {
    if (nome && ano) {
      setAnos((prevAnos) => {
        // Verifica se o ano já existe na lista
        const anoExistente = prevAnos.find((item) => item.ano === ano);
        if (anoExistente) {
          // Atualiza a lista de alunos no ano existente
          return prevAnos.map((item) =>
            item.ano === ano
              ? { ...item, alunos: [...item.alunos, nome] }
              : item
          );
        } else {
          // Adiciona um novo ano com o aluno
          return [...prevAnos, { ano, alunos: [nome] }];
        }
      });
      setNome("");
      setAno("");
    }
  };

  return (
    <Container>
      <h2>Classificar Alunos por Ano</h2>
      <Form>
        <Form.Group controlId="formNome">
          <Form.Label>Nome do Aluno</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do aluno"
          />
        </Form.Group>

        <Form.Group controlId="formAno">
          <Form.Label>Ano</Form.Label>
          <Form.Control
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            placeholder="Digite o ano (1, 2, 3...)"
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" onClick={adicionarAluno}>
          Adicionar Aluno
        </Button>
      </Form>

      <h3>Alunos Agrupados por Ano</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Alunos</th>
          </tr>
        </thead>
        <tbody>
          {anos
            .sort((a, b) => parseInt(a.ano) - parseInt(b.ano)) // Ordena o array por ano
            .map((item) => (
              <tr key={item.ano}>
                <td>{item.ano}º Ano</td>
                <td>{item.alunos.join(", ")}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Grouping;
