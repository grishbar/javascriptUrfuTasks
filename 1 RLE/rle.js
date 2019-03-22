let simbol = '#';

function code(str) {
	let result = '';
	let n = 1;
	for (let i = 0; i < str.length; i++) {
		if (n == 127) {
			result += simbol + String.fromCharCode(n) + str.charAt(i);
			n = 1;
			continue;
		}

		if (str.charCodeAt(i) == str.charCodeAt(i + 1)) {
			n++;
			continue;
		}

		if (n > 3 || str.charAt(i) == simbol) {
			result += simbol + String.fromCharCode(n) + str.charAt(i);
			n = 1;
		} else {
			result += str.slice(i - n + 1, i + 1);
			n = 1;
		}
	}
	return result;
}

function decode(str) {
	let result = '';

	for (let i = 0; i < str.length; i++) {
		if (str.charAt(i) == simbol) {
			for (let j = 0; j < str.charCodeAt(i + 1); j++)
				result += str.charAt(i + 2);

			i += 2;
		} else
			result += str.charAt(i);
	}
	return result;
}

let fso = new ActiveXObject("Scripting.FileSystemObject");
let functionName = WSH.Arguments(0);
let input = fso.OpenTextFile(WSH.Arguments(1));
let str = input.ReadAll();
input.Close();
let codedStr = "";
let decodedStr = "";

if (functionName == 'code') {
	codedStr = code(str);
	input = fso.OpenTextFile(WSH.Arguments(2), 2, true);
	input.Writeline(codedStr);
	input.Close();
	WSH.echo(codedStr + '\n' + 'compression ratio: ' + str.length / codedStr.length);
}

if (functionName == 'decode') {
	decodedStr = decode(str);
	input = fso.OpenTextFile(WSH.Arguments(2), 2, true);
	input.Writeline(decodedStr);
	input.Close();
	WSH.echo(decodedStr + '\n');
}