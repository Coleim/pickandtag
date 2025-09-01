const { exec } = require("child_process");
require("dotenv").config({ path: "./.env.local" });

// Executar o comando e capturar a saída
exec(
  `netsh.exe interface ip show address "${process.env.LOCAL_CONNECTION_INTERFACE_NAME}"`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o comando: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erro no comando: ${stderr}`);
      return;
    }

    // Encontrar e imprimir o endereço IPv4
    const lines = stdout.split("\n");
    for (const line of lines) {
      if (line.includes(process.env.LOCAL_CONNECTION_IPV4_SEARCH)) {
        const matches = line.match(/\b\d{1,3}(\.\d{1,3}){3}\b/g);
        if (matches && matches.length > 0) {
          console.log(matches[0]);
          return;
        }
      }
    }

    console.log("Endereço IPv4 não encontrado.");
  }
);
