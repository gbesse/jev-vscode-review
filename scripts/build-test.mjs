import{build}from'esbuild';await build({entryPoints:['src/core.ts'],bundle:true,platform:'node',format:'cjs',target:'node22',outfile:'dist-test/core.cjs'});
