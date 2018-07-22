const PDFParser = require("pdf2json");

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
  // find largest "S" and the its parent Texts
  let maxS;
  let maxTexts;
  pdfData.formImage.Pages.forEach(page => {
    page.Texts.forEach(text => {
      // assume our S has only one text run...
      if (text.R[0].T == 'S') {
        if (!maxS || text.R[0].TS[1] > maxS.R[0].TS[1]) {
          maxS = text;
          maxTexts = page.Texts;
        }
      }
    });
  });

  // find first and second row of MPAN, assume it's
  // within 2 vertical points above or 1 point below
  // then sort by X to find 7 closest texts, they are hopefully MPAN
  // then sort by X and Y to get the right order
  const parts = maxTexts.filter(text => {
    return text.x > maxS.x && text.y >= maxS.y - 2 && text.y <= maxS.y + 1;
  })
  .sort((a, b) => a.x - b.x).slice(0, 7)
  .sort((a, b) => {
    // assume texts in the same row are within 0.05 of each other
    if (Math.abs(a.y - b.y) < 0.05) return a.x - b.x;
    return a.y - b.y;
  });

  const text = parts.map(part => part.R[0].T).join(' ');

  console.log(text);
});

pdfParser.loadPDF(process.argv[2]);