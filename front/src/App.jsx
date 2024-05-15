import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "./components/Button";
import ResponseTable from "./components/ResponsableTable";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

function App() {
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [response, setResponse] = useState(null);
  const [responseOnCode, setResponseOnCode] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const onCodeChange = (event) => {
    setCode(event.target.value);
  };

  const onCodeFormSubmit = async (event) => {
    event.preventDefault();
    if (!code.trim()) {
      toast.error("Por favor, introduce código");
      return;
    }
    const responseOnCode = await fetch("http://localhost:3003/analyze", {
      method: "POST",
      body: code,
      headers: {
        "Content-Type": "text/plain",
      },
    });
    if (!responseOnCode.ok) {
      const errorMessage =
        responseOnCode.status === 404
          ? "No se encontraron tokens válidos en el código analizado"
          : await responseOnCode.text();
      toast.error(errorMessage);
      return;
    }
    const data = await responseOnCode.json();
    setResponseOnCode(data);
    toast.success("Tu código ha sido analizado con éxito");
  };

  return (
    <div>
      <div class="bg-6">
        <div class="glitch" data-text="Analizador Léxico">Analizador Léxico</div>
      </div>
      <div className="container">
        <div className="container-B">
          <form className="form-B" onSubmit={onCodeFormSubmit}>
            <textarea
              placeholder="Introduzca el codigo ah analizar"
              className="text-area-B"
              onChange={onCodeChange}
              value={code}
            />
            <Button text="Generar Análisis" />
          </form>
          <ResponseTable response={responseOnCode} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
