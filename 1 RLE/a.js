let fso = new ActiveXObject("Scripting.FileSystemObject");
let input = fso.OpenTextFile("result1.txt");
let str = input.ReadAll();
input.Close();
for (let j = 0; j < str.length; j++)
WSH.echo(str.charCodeAt(j) + ' ');
WSH.echo(String.fromCharCode(255) + ' ');