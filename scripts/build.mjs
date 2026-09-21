import{build}from'esbuild';await build({entryPoints:['src/extension.ts'],bundle:true,platform:'node',format:'cjs',target:'node22',outfile:'dist/extension.js',external:['vscode'],loader:{'.json':'json'},legalComments:'none'});console.log('Built dist/extension.js');

