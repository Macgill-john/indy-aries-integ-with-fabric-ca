const { exec } = require('child_process');

// Execute a Bash script file

function generate(){

  const child=exec('bash ../scripts/create.sh',(error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log("Certificate Generation Success !!");
  });


}

generate()


