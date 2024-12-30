import React, { useState } from "react";
import { Table, Button, Form, Row, Col, Container } from "react-bootstrap";

const DataTable = () => {
  // Configura a tabela com 5 linhas vazias por padrão
  const [dados, setDados] = useState(
    Array.from({ length: 5 }, () => ({ nome: "", idade: "" }))
  );
  const [media, setMedia] = useState("");

  // Função para atualizar os dados quando o usuário edita uma célula
  const handleChange = (index, campo, valor) => {
    const novosDados = [...dados];
    novosDados[index][campo] = valor;
    setDados(novosDados);
  };

  // Operação exemplo: Soma das idades preenchidas
  const realizarOperacao = () => {
    const somaIdades = dados.reduce((acc, curr) => {
      const idade = parseInt(curr.idade);
      return acc + (isNaN(idade) ? 0 : idade);
    }, 0);

    let med = somaIdades / dados.filter((dado) => dado.idade.trim() !== "").length
    setMedia("A média das idades é:" + med);
  };

  const removeLast = () => {
    var lista = [...dados];
    for (let i = lista.length - 1; i >= 0; i--) {
      const item = lista[i];
      if (item.nome !== "" || item.idade !== "") {
        lista[i].nome = "";
        lista[i].idade = "";
        break; // Para o loop após limpar o último item não vazio
      }
    }
    setDados(lista);
  };
  

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Tabela com Células Editáveis</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((dado, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      value={dado.nome}
                      onChange={(e) => handleChange(index, "nome", e.target.value)}
                      placeholder="Insira o nome"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={dado.idade}
                      onChange={(e) => handleChange(index, "idade", e.target.value)}
                      placeholder="Insira a idade"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={realizarOperacao}>
            Calcular Média de Idades
          </Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={removeLast}>
            Remover último
          </Button>
        </Col>
      </Row>

      <Row>
         <Col>
              <>{media}</>
         </Col>
         <Col>
              <>{JSON.stringify(dados)}</>
         </Col>
      </Row>
    </Container>
  );
};

export default DataTable;
